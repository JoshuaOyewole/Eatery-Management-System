import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { InitialState, loginCredentialsProps, loginResType } from "../../../utils/types"



//initialState
const initialState: InitialState = {
    loading: false,
    user: {},
    token: '', // for storing the JWT,
    error: '',
    isLoggedIn: false
}


//Generates Pending, fulfilled and rejected action types
//LOGIN
export const login = createAsyncThunk('staff/login', async (data: loginCredentialsProps) => {
    try {
        const res = await axios.post(
            `https://eatman-api.onrender.com/login`, data
        );
        if (res.data.success == true) {
            localStorage.setItem("token", res.data.token);
        }
        return res.data;
    } catch (error:any) {
        console.log(error);
    }

})

//SIGNUP
export const register = createAsyncThunk('staff/register', async (data: loginCredentialsProps) => {
    return axios.post(
        `https://eatman-api.onrender.com/register`, data
    ).then(response => response.data)
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            { state.loading = true }
        })
        builder.addCase(login.fulfilled, (state, action) => {
            {
                state.loading = false,
                    state.token = action.payload.token,
                state.user = action.payload.details,
                    state.error = '',
                    state.isLoggedIn = true
            }
        })
        builder.addCase(login.rejected, (state, action) => {
            {
                state.loading = false,
                    state.user = {},
                    state.error = action.error.message || 'Unable to Login'
            }
        })
    }
})

export default authSlice.reducer;