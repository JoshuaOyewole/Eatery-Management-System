import { createSlice, createAsyncThunk,PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';

const userSlice = createSlice({
    name:'user',
    initialState:{
        username: "orisfina",
        email: "joshpp2013@gmail.com",
        isLoggedIn: true
    },
    reducers:{
        update:(state,action) =>{
            state.username = action.payload.username
        },
    }
})

export const {update} = userSlice.actions;
export default  userSlice.reducer;