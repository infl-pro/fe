import { Checkbox, FormControlLabel } from '@mui/material';
import Button from 'components/atoms/Button';
import Text from 'components/atoms/Text';
import Box from 'components/layout/Box';
import Flex from 'components/layout/Flex';
import CartProduct from 'components/organisms/CartProduct';
import { useSelection } from 'hooks/useSelection';
import { deleteProduct } from 'lib/features/cart/cartSlice';
import { AppDispatch, RootState } from 'lib/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getProductsInCart from 'services/products/getProductsInCart';
import Axios from 'utils/Axios';

/**
 * 카트 컨테이너
 */
const CartContainer = () => {
    const {
        isLoading,
        cart: cartProducts,
        error,
    } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const [selected, setSelected] = useState(
        cartProducts.map(item => item.cartId),
    );

    useEffect(() => {
        dispatch(getProductsInCart());
    }, []);

    useEffect(() => {
        if (isLoading) return;
        setSelected(cartProducts.map(item => item.cartId));
    }, [isLoading]);

    // const setGlobalSpinner = useGlobalSpinnerActionsContext();

    // 삭제 버튼 클릭 시, 상품을 삭제
    const handleRemoveButtonClick = async (id: number) => {
        try {
            if (confirm('아이템을 삭제하시겠습니까?')) {
                // api 분리하기

                // id 여러개 선택하게 하기
                const response = await Axios.delete('/cart/delete', {
                    data: {
                        cartId: [id],
                    },
                });
                console.log(response);
                dispatch(deleteProduct(id));
            }
        } catch (e) {
            console.log(e);
            alert('삭제에 실패하였습니다.');
        }
    };
    // 구입 버튼 클릭 시, 주문 폼으로 이동
    const handleBuyButtonClick = async (id: number) => {
        router.push(`/ordersheet?productIds=${id}`);
    };

    const onClickOrderSelectedItems = () => {
        router.push(`/ordersheet?productIds=${selected.join(',')}`);
    };

    // hook으로 빼기
    const onSelectAll = () => {
        setSelected(cartProducts.map(item => item.cartId));
    };

    const onDeselectAll = () => {
        setSelected([]);
    };

    const onSelectOne = (id: number) => {
        setSelected(prevState => [...prevState, id]);
    };

    const onDeselectOne = (id: number) => {
        setSelected(prevState => {
            return prevState.filter(_id => _id !== id);
        });
    };

    if (isLoading) return null;

    console.log(selected.length === cartProducts.length);
    return (
        <>
            {/* cart */}
            <Box paddingLeft={'11px'}>
                <FormControlLabel
                    label="전체선택"
                    control={
                        <Checkbox
                            checked={selected.length === cartProducts.length}
                            onChange={event =>
                                event.target.checked
                                    ? onSelectAll?.()
                                    : onDeselectAll?.()
                            }
                        />
                    }
                />
            </Box>
            <Flex
                flexDirection={'column'}
                gap={'8px'}
                style={{ maxHeight: '400px' }}
                flexWrap={'wrap'}
            >
                {cartProducts.map(p => (
                    <CartProduct
                        key={p.cartId}
                        id={p.cartId}
                        imageUrl={p.productThumbnailUrl}
                        title={p.productName}
                        price={p.productPrice}
                        quantity={p.quantity}
                        onRemoveButtonClick={handleRemoveButtonClick}
                        onBuyButtonClick={handleBuyButtonClick}
                        selected={selected.includes(p.cartId)}
                        onChangeCheckBox={event =>
                            event.target.checked
                                ? onSelectOne?.(p.cartId)
                                : onDeselectOne?.(p.cartId)
                        }
                    />
                ))}
            </Flex>
            {cartProducts.length === 0 && (
                <Text>장바구니에 담긴 상품이 없습니다.</Text>
            )}
            {cartProducts.length !== 0 && (
                <Box textAllign={'center'} marginTop={4}>
                    <Button width={'290px'} onClick={onClickOrderSelectedItems}>
                        주문하기
                    </Button>
                </Box>
            )}
        </>
    );
};

export default CartContainer;
