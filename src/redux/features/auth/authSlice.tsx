import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authService from "../../../pages/Login/authService";
import { loginCredentialsProps, loginResType } from "../../../utils/types"



//Get user from localStorage 

const user_token = JSON.stringify(localStorage.getItem('token'));

//initialState
const initialState: loginResType = {
    success: false,
    message: undefined,
    details: null,
    token: user_token ? user_token : null,
    loading: false,
}


//Generates Pending, fulfilled and rejected action types
//LOGIN
export const login = createAsyncThunk('staff/login', async (data: loginCredentialsProps, thunkAPI) => {
    try {
        return await authService.login(data);
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message)
    }
})

//SIGNUP
export const register = createAsyncThunk('staff/register', async (data: loginCredentialsProps, thunkAPI) => {
    try {
        return await authService.register(data);
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message)
    }
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.details = null,
                state.loading = false,
                state.token = null,
                state.success = false,
                state.message = undefined
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true
        })
        builder.addCase(login.fulfilled, (state, action: PayloadAction<loginResType>) => {
            state.loading = false,
                state.token = action.payload.token,
                state.details = action.payload.details,
                state.success = action.payload.success,
                state.message = action.payload.message

        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false,
                state.token = null
                state.message = 'An Error Ocurred!'
        })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer;