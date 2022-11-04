import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../redux/features/auth/auth_slice"

export const inventory = configureStore({
    reducer: {
        auth: authReducer
    }
})