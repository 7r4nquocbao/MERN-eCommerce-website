import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../slices/product-slice';

const rootReducer = {
    products: productReducer
}

const store = configureStore({
    reducer: rootReducer
});

export default store;