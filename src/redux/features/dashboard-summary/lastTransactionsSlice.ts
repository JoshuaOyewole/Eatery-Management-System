import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { lastTransactions } from "./dashboardService";
import { lastTransactionProps } from "../../../utils/types";


//initialState
type topSellingInitialState = {
    isLoading: boolean;
    lastTransactions: lastTransactionProps;
    error: string | null | undefined;
}
const initialState: topSellingInitialState = {
    isLoading: false,
    error: null,
    lastTransactions: {
        transactions: [],
        currentPage: 0,
        totalPages: 0
    }
}


//LAST TRANSACTIONS
export const lastTransaction = createAsyncThunk('dashboard/lastTransactions', async (page: number) => {
    try {
        return await lastTransactions(page);
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return message;
    }
})

const lastTransactionsSlice = createSlice({
    name: 'lastTransactions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(lastTransaction.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(lastTransaction.fulfilled, (state, action) => {
            state.isLoading = false,
                state.lastTransactions = action.payload
        })
        builder.addCase(lastTransaction.rejected, (state, action) => {
            state.isLoading = false,
                state.error = action.error.message || 'Unable to Fetch Data'
        })
    }
})

export default lastTransactionsSlice.reducer;