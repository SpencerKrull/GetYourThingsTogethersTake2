import React from 'react'
import styles from "./auth.module.scss"
import { BiLogIn } from "react-icons/bi"
import Card from "../../components/card/Card"
import { Link } from 'react-router-dom'

const LogIn = () => {
    return ( <div className={`container ${styles.auth}`}>
        <Card>
            <div className={styles.form}>
                <div className="--flex-center">
                    <BiLogIn size={35} color="#999" />
                </div>
                <h2>Log In to Get It Together</h2>
                    <form>
                        <input type="text" placeHolder="Email" required name="email" />
                        <input type="password" placeHolder="Password" required name="password" />
                        <button type="submit" className="--btn --btn-primary --btn-block">Log In</button>
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