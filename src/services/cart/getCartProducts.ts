import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'utils/Axios';

// const getCartProduts = createAsyncThunk('cart/getCartProduts', async () => {
//     const response = await Axios.get(`/cart`);
//     console.log(response);
//     return response.data;
// });

type CartProduct = {
    cartId: number;
    quantity: number;
    productId: number;
    productName: string;
    productPrice: number;
    productThumbnailUrl: string;
};

const getCartProduts = async () => {
    const response = await Axios.get(`/cart`);
    console.log(response);
    return response.data;
};

export default getCartProduts;
