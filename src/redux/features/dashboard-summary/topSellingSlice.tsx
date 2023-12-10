import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { topSelling } from "./dashboardService";
//const env = import.meta.env;
import { dashboardSummaryProps, topSellingProps } from "../../../utils/types";


//initialState
type topSellingInitialState = {
    isLoading: boolean;
    topSelling: topSellingProps;
    error: string | null | undefined;
}
const initialState: topSellingInitialState = {
    isLoading: false,
    error: null,
    topSelling: []
}


//TOP SELLING ITEMS
export const top_selling = createAsyncThunk('dashboard/topSelling', async () => {
    try {
        return await topSelling();
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return message;
    }
})

const topSellingSlice = createSlice({
    name: 'topSellingItems',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(top_selling.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(top_selling.fulfilled, (state, action) => {
            state.isLoading = false,
                state.topSelling = action.payload
        })
        builder.addCase(top_selling.rejected, (state, action) => {
            state.isLoading = false,
                state.error = action.error.message || 'Unable to Fetch Data'
        })
    }
})

export default topSellingSlice.reducer;