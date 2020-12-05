import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../api';

export const fetchOrderData = createAsyncThunk('orders/fetchData', async (params, thunkAPI) => {
    const { data } = await api.fetchOrders();
    return data;
})

export const createOrder = createAsyncThunk('orders/create', async (order, thunkAPI) => {
    const { data } = await api.createOrder(order);
    return data;
})

export const cancelOrder = createAsyncThunk('orders/cancel', async (id, thunkAPI) => {
    console.log(id);
    await api.cancelOrder(id);
    return;
})

export const changeStatusOrder = createAsyncThunk('orders/status', async (statusObj, thunkAPI) => {
    console.log(statusObj);
    await api.changeStatusOrder(statusObj);
    return;
})

const orderSlice = createSlice({
    name: 'orders',
    initialState: [],
    reducers: {
        
    },
    extraReducers: {
        [fetchOrderData.pending]: (state) => {
            console.log('data fetch pending..');
        },
        [fetchOrderData.fulfilled]: (state, action) => {
            return action.payload;
        },
        [fetchOrderData.rejected]: (state) => {
            console.log('data fetch rejected.');
        },
        [createOrder.pending]: (state) => {
            console.log('create product pending..');
        },
        [createOrder.fulfilled]: (state, action) => {
            console.log('product created.');
            return [...state, action.payload];
        },
        [createOrder.rejected]: (state) => {
            console.log('create product rejected.');
        },
        [cancelOrder.pending]: (state) => {
            console.log('delete product pending..');
        },
        [cancelOrder.fulfilled]: (state, action) => {
            console.log("id target",action.meta.arg);
            console.log('order canceled');
            let target = state.find(item => item._id === action.meta.arg);
            const index = state.findIndex(item => item._id === action.meta.arg);
            target.isCancel = true;
            return [...state, state[index] = target];
        },
        [cancelOrder.rejected]: (state) => {
            console.log('cancel order rejected.');
        },
        [changeStatusOrder.pending]: (state) => {
            console.log('delete product pending..');
        },
        [changeStatusOrder.fulfilled]: (state, action) => {
            console.log(action);
            return state;
        },
        [changeStatusOrder.rejected]: (state) => {
            console.log('cancel order rejected.');
        }
    }
});

const { actions, reducer } = orderSlice;
export default reducer;