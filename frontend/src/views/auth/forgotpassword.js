import React from 'react'
import styles from "./auth.module.scss"
import { BsQuestionLg } from "react-icons/bs"
import Card from "../../components/card/Card"
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
    return ( <div className={`container ${styles.auth}`}>
        <Card>
            <div className={styles.form}>
                <div className="--flex-center">
                    <BsQuestionLg size={35} color="#999" />
                </div>
                <h2>Forgot Password?</h2>
                    <form>
                        <input type="text" placeHolder="Email" required name="email" />
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