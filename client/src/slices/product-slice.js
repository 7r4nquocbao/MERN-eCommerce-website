import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../api';

export const fetchProductData = createAsyncThunk('products/fetchData', async (params, thunkAPI) => {
    const { data } = await api.fetchProducts();
    return data;
})

export const createProduct = createAsyncThunk('products/create', async (product, thunkAPI) => {
    const { data } = await api.createProduct(product);
    return data;
})

export const deleteProduct = createAsyncThunk('products/delete', async (id, thunkAPI) => {
    console.log(id);
    await api.deleteProduct(id);
    return;
})

const productSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        
    },
    extraReducers: {
        [fetchProductData.pending]: (state) => {
            console.log('data fetch pending..');
        },
        [fetchProductData.fulfilled]: (state, action) => {
            console.log(action.payload);
            return action.payload;
        },
        [fetchProductData.rejected]: (state) => {
            console.log('data fetch rejected.');
        },
        [createProduct.pending]: (state) => {
            console.log('create product pending..');
        },
        [createProduct.fulfilled]: (state, action) => {
            console.log('product created.');
            return [...state, action.payload];
        },
        [createProduct.rejected]: (state) => {
            console.log('create product rejected.');
        },
        [deleteProduct.pending]: (state) => {
            console.log('delete product pending..');
        },
        [deleteProduct.fulfilled]: (state, action) => {
            console.log("id target",action.meta.arg);
            console.log('product deleted');
            return state.filter(item => item._id !== action.meta.arg);
        },
        [deleteProduct.rejected]: (state) => {
            console.log('delete product rejected.');
        }
    }
});

const { actions, reducer } = productSlice;
export default reducer;