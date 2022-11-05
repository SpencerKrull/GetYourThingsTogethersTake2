import React from 'react'
import styles from "./auth.module.scss"
import { TiUserAddOutline } from "react-icons/ti"
import Card from "../../components/card/Card"
import { Link } from 'react-router-dom'

const SignUp = () => {
    return ( <div className={`container ${styles.auth}`}>
        <Card>
            <div className={styles.form}>
                <div className="--flex-center">
                    <TiUserAddOutline size={35} color="#999" />
                </div>
                <h2>Sign Up to Get It Together</h2>
                    <form>
                        <input type="text" placeHolder="User Name" required name="username" />
                        <input type="email" placeHolder="Email" required name="email" />
                        <input type="password" placeHolder="Password" required name="password" />
                        <input type="password" placeHolder="Confirm Password" required name="password" />
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