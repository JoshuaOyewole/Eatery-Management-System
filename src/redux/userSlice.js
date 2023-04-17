import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:{
        username: "orisfina",
        email: "joshpp2013@gmail.com"
    },
    reducers:{
        update:(state,action) =>{
            state.username = action.payload.username
        },
    }
})

export const {update} = userSlice.actions;
export default  userSlice.reducer;