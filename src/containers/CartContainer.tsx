import CartProduct from 'components/organisms/CartProduct';
import { useEffect } from 'react';
import getCartProduts from 'services/cart/getCartProducts';

/**
 * 카트 컨테이너
 */
const CartContainer = () => {
    useEffect(() => {
        getCartProduts().then(response => {
            console.log(response);
        });
    }, []);

    // const setGlobalSpinner = useGlobalSpinnerActionsContext();
    // const { cart, removeProductFromCart } = useShoppingCartContext();
    // 삭제 버튼 클릭 시, 상품을 삭제
    const handleRemoveButtonClick = (id: number) => {
        console.log('handleRemoveButtonClick');
        // removeProductFromCart(id);
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

    return (
        <>
            {/* cart */}
            {[].map(p => (
                <CartProduct
                    key={p.id}
                    id={p.id}
                    imageUrl={p.imageUrl}
                    title={p.title}
                    price={p.price}
                    onRemoveButtonClick={handleRemoveButtonClick}
                    onBuyButtonClick={handleBuyButtonClick}
                />
            ))}
        </>
    );
};

export default CartContainer;
