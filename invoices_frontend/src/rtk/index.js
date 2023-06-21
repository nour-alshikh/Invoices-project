import { configureStore } from '@reduxjs/toolkit';
import user from './slices/UserSlice'
import section from './slices/SectionSlice'
import product from './slices/ProductSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'

const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const reducer = combineReducers({ user, section, product })

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({ reducer: persistedReducer })

export default store