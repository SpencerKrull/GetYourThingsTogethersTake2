import React, { useState } from 'react'
import styles from "./auth.module.scss"
import { BsQuestionLg } from "react-icons/bs"
import Card from "../../components/card/Card"
import { Link } from 'react-router-dom'
import { emailValidation, forgotPassword } from '../../services/authServices'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
    const [email, setEmail] = useState("")

    const forgot = async (e) => {
        e.preventDefault()
        if (!email) {
            return toast.error("All fields are required");
          }
      
          if (!emailValidation(email)) {
            return toast.error("Please enter a valid email");
          }
          const userData = {email}
          await forgotPassword(userData)
          setEmail("")
    }

    return ( <div className={`container ${styles.auth}`}>
        <Card>
            <div className={styles.form}>
                <div className="--flex-center">
                    <BsQuestionLg size={35} color="#999" />
                </div>
                <h2>Forgot Password?</h2>
                    <form onSubmit={forgot}>
                        <input type="text" placeholder="Email" required name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <button type="submit" className="--btn --btn-primary --btn-block">Get Reset Link</button>
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

export default ForgotPassword