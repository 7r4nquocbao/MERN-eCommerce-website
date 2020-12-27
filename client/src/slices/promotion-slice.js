import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../api';

export const fetchCodeData = createAsyncThunk('codes/fetchData', async (params, thunkAPI) => {
    const { data } = await api.fetchCodes();
    return data;
})

export const createPromotionCode = createAsyncThunk('codes/create', async (code, thunkAPI) => {
    const { data } = await api.createPromotionCode(code);
    return data;
})

const promotionSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        
    },
    extraReducers: {
        [fetchCodeData.pending]: (state) => {
            console.log('code fetch pending..');
        },
        [fetchCodeData.fulfilled]: (state, action) => {
            console.log(action.payload);
            return action.payload;
        },
        [fetchCodeData.rejected]: (state) => {
            console.log('code fetch rejected.');
        },
        [createPromotionCode.pending]: (state) => {
            console.log('create code pending..');
        },
        [createPromotionCode.fulfilled]: (state, action) => {
            console.log('code created.');
            const index = state.findIndex(item => item._id == action.payload._id);
            if(index !== -1){
                const newState = state;
                newState[index] = action.payload;
                return newState;
            } else {
                return [...state, action.payload];
            }
        },
        [createPromotionCode.rejected]: (state) => {
            console.log('create code rejected.');
        }
    }
});

const { actions, reducer } = promotionSlice;
export default reducer;