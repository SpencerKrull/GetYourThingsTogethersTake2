import React, { useState } from 'react'
import styles from "./auth.module.scss"
import { TiUserAddOutline } from "react-icons/ti"
import Card from "../../components/card/Card"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { emailValidation, registerUser } from '../../services/authServices'
import { SET_LOGIN, SET_USERNAME } from '../../redux/features/auth/auth_slice'
import { useDispatch } from 'react-redux'
import Loading from '../../components/loading/Loading'

const initialState = {
    username: "",
    email: "",
    password: "",
    password2: "" // used for validation/authentication of the password
}

const SignUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setformData] = useState(initialState)
    const {username, email, password, password2} = formData // destructure the formData

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

    const signup = async (e) => {
        e.preventDefault() // prevents form from reloading page
        if (!username || !email || !password ) {
            return toast.error("Please enter all fields")
        }
        if (!emailValidation(email)) {
            return toast.error("Please enter a valid email")
        }
        if (password !== password2) {
            return toast.error("Password don't match")
        }

        const userData = {
            username, email, password
        }
        setIsLoading(true)
        try {
            const data = await registerUser(userData)
            // console.log(data)
            await dispatch(SET_LOGIN(true))
            await dispatch(SET_USERNAME(data.username))
            navigate('/dash')
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error.message)
        }
    }

    return ( <div className={`container ${styles.auth}`}>
        {isLoading && <Loading />}
        <Card>
            <div className={styles.form}>
                <div className="--flex-center">
                    <TiUserAddOutline size={35} color="#999" />
                </div>
                <h2>Sign Up to Get It Together</h2>
                    <form onSubmit={signup}>
                        <input type="text" placeholder="User Name" required name="username" value={username} onChange={handleInputChange} />
                        <input type="email" placeholder="Email" required name="email" value={email} onChange={handleInputChange} />
                        <input type="password" placeholder="Password" required name="password" value={password} onChange={handleInputChange} />
                        <input type="password" placeholder="Confirm Password" required name="password2" value={password2} onChange={handleInputChange} />
                        <button type="submit" className="--btn --btn-primary --btn-block">Sign Up Now!</button>
                    </form>
                <span className={styles.register}>
                    <Link to="/">Home</Link>
                    <p> &nbsp; &nbsp; Already have an account? &nbsp; &nbsp; </p> {/* nbsp adds space to front and back of text */}
                    <Link to="/signup">Log In</Link>
                </span>
            </div>
        </Card>
    </div>
    )
}

export default SignUp