import { createSlice } from '@reduxjs/toolkit';
import signin from 'services/auth/signin';

const initialState = {
    isLoading: true,
    isLogined: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(signin.pending, state => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(signin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.isLogined = true;
        });
        builder.addCase(signin.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export default authSlice;
