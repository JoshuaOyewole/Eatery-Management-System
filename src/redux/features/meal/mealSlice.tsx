import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
const env = import.meta.env;
import { mealInitialState, mealProps } from "../../../utils/types"
import mealService from "./mealService";
import { PURGE } from "redux-persist";


//initialState
const initialState: mealInitialState = {
    loading: false,
    meals: [],
    error: '',
    success: false
}


//Generates Pending, fulfilled and rejected action types
//ALL MEALS
export const getMeals = createAsyncThunk('meal/fetchMeals', async () => {
    try {
        return await mealService.getMeals();

    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        console.log(`An Error Occured! ${message}`);

        return message;
    }
})

//UPDATE MEAL
export const updateMeals = createAsyncThunk('meal/updateMeals', async (id) => {
    try {
        const res = await axios.patch(
            `${env.VITE_API_URL}/meal/${id}`,
            { data: { title: String, price: Number, description: String } },
            {
                headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
            }
        );
        return res?.data;
    } catch (error: any) {
        console.log(error);
    }
})


const mealSlice = createSlice({
    name: 'meal',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMeals.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getMeals.fulfilled, (state, action: PayloadAction<Array<mealProps>>) => {

            state.loading = false,
                state.meals = action.payload,
                state.error = '',
                state.success = true
        })
        builder.addCase(getMeals.rejected, (state, action) => {
            state.loading = false,
                state.meals = [],
                state.error = action.error.message || 'Unable to Fetch Data'
        })
    }
})

/* export const selectAllMeals = (state) => state.meals
export const getMealsStatus = (state) => state.meals.status
export const getMealsError = (state) => state.meals.error

export const {} = mealSlice.actions */

export default mealSlice.reducer;