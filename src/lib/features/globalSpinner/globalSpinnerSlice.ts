import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isGlobalSpinnerOn: false,
};

const globalSpinnerSlice = createSlice({
    name: 'globalSpinner',
    initialState,
    reducers: {
        setGlobalSpinnerAction(state, action) {
            state.isGlobalSpinnerOn = action.payload;
        },
    },
});

export const { setGlobalSpinnerAction } = globalSpinnerSlice.actions;
export default globalSpinnerSlice;
