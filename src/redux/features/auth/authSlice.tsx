import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authService from "../../../pages/Auth/authService";
import { loginCredentialsProps } from "../../../utils/types"
import { getToken } from "../../../utils/utils";



//Get user token from localStorage 
const user_token = getToken();

export interface LoginResponse {
    details: {
        _id: string;
        rank: string;
        firstname: string;
        lastname: string;
    };
    message: string;
    token: string;
    success: boolean
}

// Define your initial state interface
interface initialStateProps {
    user: {
        _id: string;
        rank: string;
        firstname: string;
        lastname: string;
    };
    loading: boolean;
    message: string | null;
    errorMsg: string | null;
    success: boolean | null;
    token: string | null
}

// Define the initial state
const initialState: initialStateProps = {
    user: { _id: "", rank: "", firstname: "", lastname: "" },
    loading: false,
    message: null,
    errorMsg: null,
    success: null,
    token: null
};

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
            state.user = { _id: "", rank: "", firstname: "", lastname: "" },
                state.loading = false,
                state.success = false,
                state.message = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false,
                state.user = action.payload.details,
                state.success = action.payload.success,
                state.message = action.payload.message,
                state.token = action.payload.token

        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false,
                state.user = { _id: "", rank: "", firstname: "", lastname: "" },
                state.message = action.payload as string
        })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer;