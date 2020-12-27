import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../slices/product-slice';
import orderReducer from '../slices/order-slice';
import promotionReducer from '../slices/promotion-slice';

const rootReducer = {
    products: productReducer,
    orders: orderReducer,
    promotionCodes: promotionReducer
}

const store = configureStore({
    reducer: rootReducer
});

export default store;