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
    staffs: Staff[],
    error: string
}
//initialState
const initialState: InitialState = {
    loading: false,
    staffs: [],
    error: ''
}

//Generates Pending, fulfilled and rejected action types

export const fetchStaffs = createAsyncThunk('staff/fetchStaffs', async () => {
    return axios.get(
        `http://localhost:3100/api/staff`,
    ).then(response => response.data)
})

const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchStaffs.pending, (state) => {
            { state.loading = true }
        })
        builder.addCase(fetchStaffs.fulfilled, (state, action) => {
            { 
                state.loading = false,
                state.staffs = action.payload,
                state.error = ''
            }
        })
        builder.addCase(fetchStaffs.rejected, (state, action) => {
            { 
                state.loading = false,
                state.staffs = [],
                state.error = action.error.message || 'Something went wrong'
            }
        })
    }
})

export default staffSlice.reducer;