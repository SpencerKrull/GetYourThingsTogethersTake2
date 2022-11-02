const asyncHandler = require('express-async-handler')
const User = require("../models/user_model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const tokenGenerate = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"}) // expires will end the token login in 24 hours
}

const signUp = asyncHandler( async (req, res) => {
    const {username, email, password} = req.body

    if (!username || !email || !password ) {
        res.status(400)
        throw new Error("Please enter required fields")
    }
    if (password.length < 8 ) {
        throw new Error("Password must be at least 8 characters")
    }

    //email must be unique
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        res.status(400)
        throw new Error("Username already exists!")
    }

    // user creation - 201 is for new user
    const user = await User.create({
        username, email, password
    })

    // token
    const token = tokenGenerate(user._id)

    // cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // makes it so cookie will expire in one day 
        sameSite: "none", // restricts cookie HTTP response to same site only
        secure: true
    })

    if (user) {
        const { _id, username, email, photo, about } = user
        res.status(201).json({ _id, username, email, photo, about, token })
    } else {
        res.status(400)
        throw new Error("Invalid user")
    }
});

module.exports = { signUp }