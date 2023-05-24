import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { mealInitialState } from "../../../utils/types"

//initialState
const initialState: mealInitialState = {
    loading: false,
    meal: [],
    error: '',
    success: false
}


//Generates Pending, fulfilled and rejected action types
//ALL MEALS
export const getMeals = createAsyncThunk('meal/fetchMeals', async () => {
    try {
        const res = await axios.get(`https://eatman-api.onrender.com/api/meald`);
        return res.data;
    } catch (error: any) {
        return error.message
    }
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
            { state.loading = true }
        })
        builder.addCase(getMeals.fulfilled, (state, action) => {
            {
                state.loading = false,
                    state.meal = action.payload,
                    state.error = '',
                    state.success = true
            }
        })
        builder.addCase(getMeals.rejected, (state, action) => {
            {
                state.loading = false,
                    state.meal = [],
                    state.error = action.error.message || 'Unable to Fetch Data'
            }
        })
    }
})

export default mealSlice.reducer;