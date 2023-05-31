import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { addOrderInitialState, purchaseResState, mealOrder } from "../../../utils/types";


//initialState
const initialState: addOrderInitialState = {
    loading: false,
    order: { id: undefined, message: undefined },
    error: undefined,
    success: false
}


//ADD AN ORDER
export const addOrder = createAsyncThunk('meal/addOrder', async (data: mealOrder, thunkAPI) => {
    try {
        const res = await axios.post(`https://eatman-api.onrender.com/api/order`, data, {
            headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
        })
        return res.data
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message)
    }
})

const orderSlice = createSlice({
    name: 'addOrder',
    initialState,
    reducers: {
        resetOrder: state => {
            state.loading = false,
                state.order = { id: undefined, message: undefined },
                state.error = undefined,
                state.success = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addOrder.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addOrder.fulfilled, (state, action: PayloadAction<purchaseResState>) => {
            state.loading = false,
                state.order = action.payload,
                state.error = undefined,
                state.success = true
        })
        builder.addCase(addOrder.rejected, (state, action) => {
            state.loading = false,
                state.order = { id: undefined, message: undefined },
                state.error = action.error.message || 'Unable to Fetch Data'
        })
    }
})

export const {resetOrder} = orderSlice.actions;

export default orderSlice.reducer;