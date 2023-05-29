import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { mealInitialState, mealProps } from "../../../utils/types"

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
    const res = await axios.get(`https://eatman-api.onrender.com/api/meals`).then(response => response.data);
    return res;
})

//UPDATE MEAL
export const updateMeals = createAsyncThunk('meal/updateMeals', async (id) => {
    try {
        const res = await axios.patch(
            `https://eatman-api.onrender.com/api/meal/${id}`,
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

//SIGNUP
/* export const register = createAsyncThunk('staff/register', async (data: loginCredentialsProps) => {
    return axios.post(
        `https://eatman-api.onrender.com/register`, data
    ).then(response => response.data)
}) */

const mealSlice = createSlice({
    name: 'meal',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMeals.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getMeals.fulfilled, (state, action:PayloadAction<Array<mealProps>>) => {
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