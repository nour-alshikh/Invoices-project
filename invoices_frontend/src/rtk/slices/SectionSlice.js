import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = { sections: [], loading: false, message: "", }

export const addSection = createAsyncThunk('section/addSection', async (form, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi

    const { user } = getState()
    const token = user.token
    try {
        let res = await axios.post(`http://127.0.0.1:8000/api/sections`, form, {
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

export const fetchSections = createAsyncThunk('section/fetchSections', async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi

    try {
        let res = await axios.get(`http://127.0.0.1:8000/api/sections`)
            .then((data) => {
                return data
            })
        return res
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const fetchSection = createAsyncThunk('section/fetchSection', async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi

    try {
        let res = await axios.get(`http://127.0.0.1:8000/api/sections/${id}`)
            .then((data) => {
                return data
            })
        return res
    } catch (error) {
        return rejectWithValue(error.message)
    }
})


export const updateSection = createAsyncThunk('section/updateSection', async (form, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi

    const { user } = getState()
    const token = user.token
    try {
        let res = await axios.put(`http://127.0.0.1:8000/api/sections/${form.id}`, form, {
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

export const deleteSection = createAsyncThunk('section/deleteSection', async (id, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi

    const { user } = getState()
    const token = user.token
    try {
        let res = await axios.delete(`http://127.0.0.1:8000/api/sections/${id}`, {
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

const sectionSlice = createSlice({
    name: "section",
    initialState,
    reducres: {
        clearSection: (state) => {
            let st = state.section
            state.section = { ...st, name: "", description: "" };
        }
    },
    extraReducers: (builder) => {
        // addSection
        builder.addCase(addSection.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addSection.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(addSection.rejected, (state) => {
            state.loading = false
        })
        // fetchSections
        builder.addCase(fetchSections.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchSections.fulfilled, (state, action) => {
            state.loading = false
            state.sections = action.payload.data.sections
        })
        builder.addCase(fetchSections.rejected, (state) => {
            state.loading = false
        })
        // fetchSection
        builder.addCase(fetchSection.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchSection.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(fetchSection.rejected, (state) => {
            state.loading = false
        })
        // updateSection
        builder.addCase(updateSection.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateSection.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(updateSection.rejected, (state) => {
            state.loading = false
        })
        // deleteSection
        builder.addCase(deleteSection.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteSection.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(deleteSection.rejected, (state) => {
            state.loading = false
        })
    }
})

export default sectionSlice.reducer