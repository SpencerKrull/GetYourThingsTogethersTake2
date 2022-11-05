import axios from 'axios'
import { toast } from "react-toastify"

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

export const emailValidation = (email) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/users/signup`, userData, {withCredentials: true}) // data successfully saves between front & backend using user credetials
        if(response.statusText === "OK") {
            toast.success("Sign Up Successful - Time To Get It Together!")
        }
        return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString() // handles errors, converts it to string, handles many possible errors as well
        toast.error(message)
    }
}

// log in
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/users/login`) // data successfully saves between front & backend using user credetials
        if(response.statusText === "OK") {
            toast.success("You're logged in!")
        }
        return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString() // handles errors, converts it to string, handles many possible errors as well
        toast.error(message)
    }
}