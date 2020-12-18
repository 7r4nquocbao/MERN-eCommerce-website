import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../slices/product-slice';
import orderReducer from '../slices/order-slice';

const rootReducer = {
    products: productReducer,
    orders: orderReducer
}

const store = configureStore({
    reducer: rootReducer
});

export default store;