import React, { useState } from 'react'
import styles from "./auth.module.scss"
import { BiLogIn } from "react-icons/bi"
import Card from "../../components/card/Card"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { emailValidation, loginUser } from '../../services/authServices'
import { SET_LOGIN, SET_USERNAME } from '../../redux/features/auth/auth_slice'
import Loading from '../../components/loading/Loading'

const initialState = {
    email: "",
    password: "",
}

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault()
   
    if (!email || !password) {
      return toast.error("All fields are required");
    }

    if (!emailValidation(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };
    setIsLoading(true)
    try {
      const data = await loginUser(userData)
      console.log(data)
      dispatch(SET_LOGIN(true));
      dispatch(SET_USERNAME(data.user));
      navigate("/dash");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

    return ( <div className={`container ${styles.auth}`}>
      {isLoading && <Loading />}
        <Card>
            <div className={styles.form}>
                <div className="--flex-center">
                    <BiLogIn size={35} color="#999" />
                </div>
                <h2>Log In to Get It Together</h2>
                    <form onSubmit={login}>
                        <input 
                          type="text" 
                          placeholder="Email" 
                          required 
                          name="email" 
                          value={email} 
                          onChange={handleInputChange} />
                        <input 
                          type="password" 
                          placeholder="Password" 
                          required 
                          name="password" 
                          value={password} 
                          onChange={handleInputChange} />
                        <button 
                          type="submit" 
                          className="--btn --btn-primary --btn-block">Log In</button>
                    </form>
                <Link to="/forgotpassword">Forgot Password?</Link>
                <span className={styles.register}>
                    <Link to="/">Home</Link>
                    <p> &nbsp; &nbsp; Register Your Things: &nbsp; &nbsp; </p> {/* nbsp adds space to front and back of text */}
                    <Link to="/signup">Sign Up</Link>
                </span>
            </div>
        </Card>
    </div>
    )
}

export default LogIn