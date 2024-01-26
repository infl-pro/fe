import { configureStore, combineReducers } from '@reduxjs/toolkit';
import globalSpinnerSlice from './features/globalSpinner/globalSpinnerSlice';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import cartSlice from './features/cart/cartSlice';

const rootReducer = combineReducers({
    globalSpinner: globalSpinnerSlice.reducer,
    cart: cartSlice.reducer,
});

export const makeStore = () => {
    const store = configureStore({
        reducer: (state, action) => {
            switch (action.type) {
                case HYDRATE:
                    return action.payload;
                default:
                    return rootReducer(state, action);
            }
        },
        devTools: process.env.NODE_ENV !== 'production',
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
    });
    return store;
};

export const wrapper = createWrapper(makeStore);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];

export default wrapper;
