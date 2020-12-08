import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../api';

export const fetchChatData = createAsyncThunk('chat/fetchData', async (roomId, thunkAPI) => {
    const { data } = await api.fetchChat(roomId);
    return data;
});

const chatSlice = createSlice({
    name: 'messages',
    initialState: [],
    reducers: {
        
    },
    extraReducers: {
        [fetchChatData.pending]: (state) => {
            console.log('data fetch pending..');
        },
        [fetchChatData.fulfilled]: (state, action) => {
            console.log(action.payload);
            return action.payload;
        },
        [fetchChatData.rejected]: (state) => {
            console.log('data fetch rejected.');
        }
    }
});

const { actions, reducer } = chatSlice;
export default reducer;