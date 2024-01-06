import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { totalOrders } from "./dashboardService";
//const env = import.meta.env;


//initialState
type totalOrdersInitialState = {
    isLoading: boolean;
    totalOrders: {
        days: string[],
        values: number[]
    };
    error: string | null | undefined;
}
const initialState: totalOrdersInitialState = {
    isLoading: false,
    error: null,
    totalOrders: { days: [], values: [] }
}


//TOTAL ORDERS
export const getTotalOrders = createAsyncThunk('dashboard/totalOrders', async () => {
    try {
        return await totalOrders();
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return message;
    }
})

const totalOrder = createSlice({
    name: 'totalOrders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTotalOrders.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getTotalOrders.fulfilled, (state, action) => {
            state.isLoading = false,
                state.totalOrders = action.payload
        })
        builder.addCase(getTotalOrders.rejected, (state, action) => {
            state.isLoading = false,
                state.error = action.error.message || 'Unable to Fetch Data'
        })
    }
})

export default totalOrder.reducer;