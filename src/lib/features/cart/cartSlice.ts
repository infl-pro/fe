import { createSlice } from '@reduxjs/toolkit';
import getProductsInCart from 'services/products/getProductsInCart';

const initialState = {
    isLoading: true,
    cart: [],
    error: null,
};

const cartSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getProductsInCart.pending, state => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getProductsInCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cart = action.payload;
            state.error = null;
        });
        builder.addCase(getProductsInCart.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export default cartSlice;
