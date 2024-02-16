import Axios from '../../utils/Axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export type ProductInCart = {
    cartId: number;
    quantity: number;
    productId: number;
    productName: string;
    productPrice: number;
    productThumbnailUrl: string;
};

/**
 * 장바구니 조회 API(장바구니)
 * @param params 파라미터
 * @returns 상품들
 */
export const getProductsInCart = createAsyncThunk(
    'products/getProductsInCart',
    async () => {
        const response = await Axios.get('/cart');
        return response.data.data;
    },
);

export default getProductsInCart;
