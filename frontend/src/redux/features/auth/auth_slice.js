import { createSlice } from '@reduxjs/toolkit'

const name = JSON.parse(localStorage.getItem("username"))

const initialState = {
    isLoggedIn: false,
    name: name ? name: "", // find name in local storage, and if name found, display that name in the header
    user: {
        username: "",
        email: "",
        about: "",
        photo: ""
    },
    userId: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_LOGIN(state, action) {
            state.isLoggedIn = action.payload
        },
        SET_USERNAME(state, action) {
            localStorage.setItem("username", JSON.stringify(action.payload))
            state.username = action.payload
        },
        SAVE_USERNAME(state, action) {
            const profile = action.payload
            state.user.username = profile.username
            state.user.email = profile.email
            state.user.about = profile.about
            state.user.photo = profile.photo
        },
    }
})

export const {SET_LOGIN, SET_USERNAME, SAVE_USERNAME} = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectUsername = (state) => state.auth.username
export const selectUser = (state) => state.auth.user

export default authSlice.reducer;