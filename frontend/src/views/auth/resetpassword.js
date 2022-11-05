import React from 'react'
import styles from "./auth.module.scss"
import { GrPowerReset } from "react-icons/gr"
import Card from "../../components/card/Card"
import { Link } from 'react-router-dom'

const ResetPassword = () => {
    return ( <div className={`container ${styles.auth}`}>
        <Card>
            <div className={styles.form}>
                <div className="--flex-center">
                    <GrPowerReset size={35} color="#999" />
                </div>
                <h2>Reset Password</h2>
                    <form>
                        <input type="password" placeHolder="New Password" required name="password" />
                        <input type="password" placeHolder="Confirm Password" required name="password" />
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