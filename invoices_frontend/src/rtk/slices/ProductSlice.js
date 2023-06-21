import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = { sections: [], loading: false, message: "", }

export const addProduct = createAsyncThunk('section/addProduct', async (form, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi

    const { user } = getState()
    const token = user.token
    try {
        let res = await axios.post(`http://127.0.0.1:8000/api/products`, form, {
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

export const fetchProducts = createAsyncThunk('section/fetchProducts', async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi

    try {
        let res = await axios.get(`http://127.0.0.1:8000/api/products`)
            .then((data) => {
                return data
            })
        return res
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const fetchProduct = createAsyncThunk('section/fetchProduct', async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi

    try {
        let res = await axios.get(`http://127.0.0.1:8000/api/products/${id}`)
            .then((data) => {
                return data
            })
        return res
    } catch (error) {
        return rejectWithValue(error.message)
    }
})


export const updateProduct = createAsyncThunk('section/updateProduct', async (form, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi
    const { user } = getState()
    const token = user.token
    try {
        let res = await axios.post(`http://127.0.0.1:8000/api/products/${form.id}`, form, {
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

export const deleteProduct = createAsyncThunk('section/deleteProduct', async (id, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi

    const { user } = getState()
    const token = user.token
    try {
        let res = await axios.delete(`http://127.0.0.1:8000/api/products/${id}`, {
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

const productSlice = createSlice({
    name: "product",
    initialState,
    reducres: {
        clearProduct: (state) => {
            let st = state.product
            state.product = { ...st, name: "", description: "" };
        }
    },
    extraReducers: (builder) => {
        // addProduct
        builder.addCase(addProduct.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addProduct.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(addProduct.rejected, (state) => {
            state.loading = false
        })
        // fetchProducts
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload.data.products
        })
        builder.addCase(fetchProducts.rejected, (state) => {
            state.loading = false
        })
        // fetchProduct
        builder.addCase(fetchProduct.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchProduct.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(fetchProduct.rejected, (state) => {
            state.loading = false
        })
        // updateProduct
        builder.addCase(updateProduct.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateProduct.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(updateProduct.rejected, (state) => {
            state.loading = false
        })
        // deleteProduct
        builder.addCase(deleteProduct.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteProduct.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(deleteProduct.rejected, (state) => {
            state.loading = false
        })
    }
})

export default productSlice.reducer