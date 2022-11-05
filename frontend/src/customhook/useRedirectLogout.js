import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { SET_LOGIN } from '../redux/features/auth/auth_slice'
import { getLoginStatus } from '../services/authServices'


const useRedirectLogout = (path) => {
    const navigate = useNavigate
    const dispatch = useDispatch()

    useEffect(() => {
        const redirectUserLogout = async () => {
            const isLoggedIn = await getLoginStatus()
            dispatch(SET_LOGIN(isLoggedIn))

            if(!isLoggedIn) {
                toast.info("Session timed out. Please log back in to continue getting it together")
                navigate(path)
                return
            }
        }
        redirectUserLogout()
    }, [navigate, path, dispatch])
}

export default useRedirectLogout