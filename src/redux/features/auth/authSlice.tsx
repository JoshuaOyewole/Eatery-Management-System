import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
//Staff props
type Staff = {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    phone: string,
    gender: string,
    homeAddress: string,
    dob: string,
    state: string,
    lga: string,
    passport: string,
}
//initial State props
type InitialState = {
    loading: boolean,
    data: {},
    error: string,
    token?: string
}
//initialState
const initialState: InitialState = {
    loading: false,
    data: {},
    token: '', // for storing the JWT,
    error: ''
}


//Generates Pending, fulfilled and rejected action types

export const login = createAsyncThunk('staff/login', async () => {
    return axios.post(
        `http://localhost:3100/login`, {email: "admin@gmail.com",password: "admin"}
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
                    state.data = action.payload,
                    state.error = ''
            }
        })
        builder.addCase(login.rejected, (state, action) => {
            {
                state.loading = false,
                    state.data = [],
                    state.error = action.error.message || 'Unable to Login'
            }
        })
    }
})

export default authSlice.reducer;