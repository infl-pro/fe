import type { NextPage } from 'next';
import CartTopContainer from 'containers/CartTopContainer';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const CartPage: NextPage = () => {
    return <CartTopContainer />;
};

export default CartPage;
