import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../redux/features/auth/auth_slice"
import entryReducer from "../redux/features/entries/entry_slice"


export const inventory = configureStore({
    reducer: {
        auth: authReducer,
        entry: entryReducer
    }
})