import React, { useState } from 'react'
import styles from "./auth.module.scss"
import { GrPowerReset } from "react-icons/gr"
import Card from "../../components/card/Card"
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { resetPassword } from '../../services/authServices'

const initialState = {
    password: "",
    password2: "",
}

const ResetPassword = () => {
    const [formData, setformData] = useState(initialState);
    const { password, password2 } = formData;

    const {tokenReset} = useParams();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value });
      };

    const reset = async (e) => {
        e.preventDefault()

        if (password.length < 8) {
            return toast.error("Passwords must be up to 6 characters");
          }
          if (password !== password2) {
            return toast.error("Passwords do not match");
          }

    const userData = {
        password,
        password2
        }

    try {
        const data = await resetPassword(userData, tokenReset)
        toast.success(data.message)
    } catch (error) {
        console.log(error.message)
    }
    }

    return ( <div className={`container ${styles.auth}`}>
        <Card>
            <div className={styles.form}>
                <div className="--flex-center">
                    <GrPowerReset size={35} color="#999" />
                </div>
                <h2>Reset Password</h2>
                    <form onSubmit={reset}>
                        <input 
                            type="password" 
                            placeholder="New Password" 
                            required 
                            name="password"
                            value={password} 
                            onChange={handleInputChange} />
                        <input 
                            type="password" 
                            placeholder="Confirm Password" 
                            required 
                            name="password2"
                            value={password2} 
                            onChange={handleInputChange} />
                        <button type="submit" className="--btn --btn-primary --btn-block">Reset Password</button>
                        <div className={styles.links}>
                            <Link to="/">Home</Link>
                            <Link to="/login">Log In</Link>
                        </div>
                    </form>
            </div>
        </Card>
    </div>
    )
}

export default ResetPassword