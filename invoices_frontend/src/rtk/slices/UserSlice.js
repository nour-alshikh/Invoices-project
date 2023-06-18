import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = { user: {}, token: "", loading: false, errors: false }

export const login = createAsyncThunk('user/login', async (form, thunkApi) => {
    const { rejectWithValue } = thunkApi
    try {
        let res = await axios.post(`http://127.0.0.1:8000/api/login`, form)
            .then((data) => {
                return data
            })
        return res
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const logout = createAsyncThunk('user/logout', async (_, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi
    const { user } = getState()
    const token = user.token
    try {
        let res = await axios.post(`http://127.0.0.1:8000/api/logout`, null, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then((data) => {
                return data
            })
        return res
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducres: {
    },
    extraReducers: (builder) => {
        // login
        builder.addCase(login.pending, (state) => {
            state.loading = true
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.data.user
            state.token = action.payload.data.token
        })
        builder.addCase(login.rejected, (state) => {
            state.loading = false
        })

        // logout
        builder.addCase(logout.pending, (state) => {
            state.loading = true
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.loading = false
            state.token = ""
            state.user = {}
        })
        builder.addCase(logout.rejected, (state) => {
            state.loading = false
        })
    }
})

export default userSlice.reducer