import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { dashboardSummary } from "./dashboardService";
//const env = import.meta.env;
import { dashboardSummaryProps } from "../../../utils/types";


//initialState
type dashboardSummaryInitialState = {
    isLoading: boolean;
    dashboardSummary: dashboardSummaryProps;
    error: string | null | undefined;
}
const initialState: dashboardSummaryInitialState = {
    isLoading: false,
    error: null,
    dashboardSummary: {
        totalForDay: {
            totalAmount: 0,
            totalCount: 0
        },
        totalForMonth: {
            totalAmount: 0,
            totalCount: 0
        }
    }
}


//TOP SELLING ITEMS
export const summary = createAsyncThunk('dashboard/dashboardSummary', async (userId: string) => {
    try {
        console.log(userId);

        return await dashboardSummary(userId);
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return message;
    }
})

const dashboardSummarySlice = createSlice({
    name: 'dashboardSummary',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(summary.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(summary.fulfilled, (state, action) => {
            state.isLoading = false,
                state.dashboardSummary = action.payload
        })
        builder.addCase(summary.rejected, (state, action) => {
            state.isLoading = false,
                state.error = action.error.message || 'Unable to Fetch Data'
        })
    }
})

export default dashboardSummarySlice.reducer;