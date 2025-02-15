import {configureStore} from '@reduxjs/toolkit'
import { userReducer } from './userReducer'
import { mainSlice } from "./mainSlice";

export const store = configureStore({
    reducer:{
        user:userReducer,
        mainSlice: mainSlice.reducer
    }
})