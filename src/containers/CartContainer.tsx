import Text from 'components/atoms/Text';
import CartProduct from 'components/organisms/CartProduct';
import { AppDispatch, RootState } from 'lib/store';
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

    useEffect(() => {
        dispatch(getProductsInCart());
    }, []);

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
                // removeProductFromCart(id);
            }
        } catch (e) {
            console.log(e);
            alert('삭제에 실패하였습니다.');
        }
    };
    // 구입 버튼 클릭 시, 상품을 구입
    const handleBuyButtonClick = async (id: number) => {
        console.log('handleBuyButtonClick');
        // try {
        //     setGlobalSpinner(true);
        //     await purchase(context, { productId: id });
        //     window.alert('구입했습니다');
        //     // 상품 구입 후에는 카트에서 상품을 삭제한다
        //     removeProductFromCart(id);
        // } catch (err: unknown) {
        //     if (err instanceof Error) {
        //         window.alert(err.message);
        //     }
        // } finally {
        //     setGlobalSpinner(false);
        // }
    };

    if (isLoading) return null;

    return (
        <>
            {/* cart */}
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
                />
            ))}
            {cartProducts.length === 0 && (
                <Text>장바구니에 담긴 상품이 없습니다.</Text>
            )}
        </>
    );
};

export default CartContainer;
