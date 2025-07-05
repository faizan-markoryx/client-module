import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './loginSlice'
import userSlice from './userSlice'
import clientSlice from './clientSlice'
import contactSlice from './contactSlice'

export const store = configureStore({
    reducer:{
        user:loginSlice,
        userTable:userSlice,
        client:clientSlice,
        contact:contactSlice,
    }
})
