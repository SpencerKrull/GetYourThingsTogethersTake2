import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../redux/features/auth/auth_slice"
import entryReducer from "../redux/features/entries/entry_slice"
import filterReducer from "../redux/features/entries/filter_slice"


export const inventory = configureStore({
    reducer: {
        auth: authReducer,
        entry: entryReducer,
        filter: filterReducer
    }
})