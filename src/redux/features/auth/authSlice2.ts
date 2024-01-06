import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { loginCredentialsProps } from "../../../utils/types"
import axios from "axios";
const env = import.meta.env;


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
export interface LoginErrorResponse {
    message: string;
    code: number;
    success: boolean;
}
// Define your initial state interface
interface initialStateProps {
    user: LoginResponse | null;
    loading: "idle" | "loading";
    message: string | null;
    errorMsg: string | null;
    success: boolean | null
}

// Define the initial state
const initialState: initialStateProps = {
    user: null,
    loading: "idle",
    message: null,
    errorMsg: null,
    success: null
};
const login2 = async (userData: { email: string, password: string }) => {
    const response = await axios.post(`${env.VITE_API_URL}/login`, userData);
    return response;
}

export const login = createAsyncThunk('staff/login', async (data: loginCredentialsProps, thunkAPI) => {
    try {
        //let x = await authService.login(data);
        let res = await login2(data);

        if (res.data) {
            localStorage.setItem('token', JSON.stringify(res.data.token))
            localStorage.setItem('user', JSON.stringify(res.data.details))
            return res.data
        }

    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message)
    }
})


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.user = null,
                state.loading = "idle"
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = "loading";
        });

        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.details; // Update state with user details
            state.loading = "idle";
            state.message = action.payload.message;
            state.success = action.payload.success
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loading = "idle";
            //state.success = action.payload.success as string
            state.errorMsg = action.payload as string; // Assign the error message
        });
    },
});

export const { reset } = authSlice.actions
export default authSlice.reducer;