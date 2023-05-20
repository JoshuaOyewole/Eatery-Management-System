import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import {loginCredentialsProps} from "../../../utils/types"
//initial State props
type InitialState = {
    loading: boolean,
    user: {},
    error: string,
    token?: string
}


//initialState
const initialState: InitialState = {
    loading: false,
    user: {},
    token: '', // for storing the JWT,
    error: ''
}


//Generates Pending, fulfilled and rejected action types

export const login = createAsyncThunk('staff/login', async (data:loginCredentialsProps) => {
    return axios.post(
        `http://localhost:3100/login`, data
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
                state.token = action.payload.message
                    state.user = action.payload.details,
                    state.error = ''
            }
        })
        builder.addCase(login.rejected, (state, action) => {
            {
                state.loading = false,
                    state.user = [],
                    state.error = action.error.message || 'Unable to Login'
            }
        })
    }
})

export default authSlice.reducer;