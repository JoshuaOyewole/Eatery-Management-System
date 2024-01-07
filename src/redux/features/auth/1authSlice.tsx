import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authService from "../../../pages/Auth/authService";
import { loginCredentialsProps } from "../../../utils/types"
import { getToken } from "../../../utils/utils";
import axios from "axios";
const env = import.meta.env;


//Get user token from localStorage 
const user_token = getToken();
export type Detail = {
    firstname: string,
    lastname: string,
    rank: string,
    _id?: string,
}

export type loginResType = {
    details: Detail | null,
    message: string,
    status: string | number,
    success: boolean,
    token: string | null|undefined,
}


//initialState
const initialState = {
    success: false,
    message: "",
    details: null,
    token: user_token ? user_token : null,
    loading: false,
}


//Generates Pending, fulfilled and rejected action types
//LOGIN

const login2 = async (userData: { email: string, password: string }) => {
    const response = await axios.post<loginResType>(`${env.VITE_API_URL}/login`, userData);
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

        console.log('An error occured HEre....');
        console.log(error);

        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        console.log(message);

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
                state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true
        })
       /*  builder.addCase(login.fulfilled, (state, action:PayloadAction<loginResType>) => {
            // state.loading = false,
            console.log(action.payload);

             state.token = action.payload?.token,
            state.details = action.payload?.details,
            state.success = action.payload?.success, 
            // state.message = action.payload?.message

        }) */
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false,
                console.log('Rejected');

            state.token = null,
                state.message = "An Error occured!"
            //state.message = action?.payload
        })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer;