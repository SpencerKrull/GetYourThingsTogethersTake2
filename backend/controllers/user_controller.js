const asyncHandler = require('express-async-handler')
const User = require("../models/user_model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { response } = require('express')
const Token = require('../models/token_model')
const crypto = require('crypto')
const sendEmail = require("../utilities/send_email")

const tokenGenerate = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"}) // expires will end the token login in 24 hours
}

// sign up
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
    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
        res.status(400)
        throw new Error("Email already exists!")
    }

    //username must also be unique
    const existingUser = await User.findOne({ username })
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

// user login
const logIn = asyncHandler( async (req, res) => {
    const {email, password} = req.body
    // request validation
    if (!email || !password) {
        res.status(400)
        throw new Error("Please enter a valid email and password")
    }
    //search database for existing user, passwords
    const user = await User.findOne({ email })
    if (!user) {
        res.status(400)
        throw new Error("Please login or sign up")
    }

    const correctPassword = await bcrypt.compare(password, user.password)
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

    if (user && correctPassword) {
        const { _id, username, email, photo, about } = user;
        res.status(201).json({ _id, username, email, photo, about, token })
    } else {
        res.status(400)
        throw new Error("Please enter valid email or password")
    }
});

// Logout
const logOut = asyncHandler (async (req, res) => {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure: true
    });
    return res.status(200).json({ message: "Logout successful!"})
}) // the cookie here expires whe the user logs out

// find user in database
const findUser = asyncHandler( async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        const { _id, username, email, photo, about } = user
        res.status(200).json({ _id, username, email, photo, about })
    } else {
        res.status(400)
        throw new Error("Invalid user")
    }
})

// Login status
const logStatus = asyncHandler (async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json(false)
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if (verified) {
        return res.json(true)
    } 
    return res.json(false)
})

// Update user info
const userUpdate = asyncHandler (async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        const { username, email, photo, about } = user
        user.email = email;
        user.username = req.body.username || username;
        user.photo = req.body.photo || photo;
        user.about = req.body.about || about;

        const userUpdated = await user.save()
        res.status(200).json({
            username: userUpdated.username,
            email: userUpdated.email,
            photo: userUpdated.photo, 
            about: userUpdated.about
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

// Change password
const changePassword = asyncHandler (async (req, res) => {
    const user = await User.findById(req.user._id)
    const {oldPassword, password} = req.body

    if (!user) {
        res.status(404)
        throw new Error("Use doesn't exist. Please sign up.")
    }
    // validation
    if (!oldPassword || !password) {
        res.status(404)
        throw new Error("Please enter old password, then new")
    }

    const correctPassword = await bcrypt.compare(oldPassword, user.password)

    // new password
    if (user && correctPassword) {
        user.password = password
        await user.save()
        res.status(200).send("Successfully changed password!")
    } else {
        res.status(400)
        throw new Error("Old password does not match")
    }
})

// forgot password
const forgotPassword = asyncHandler (async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({email})

    if (!user) {
        res.status(404)
        throw new Error("User not found")
    }

    // delete pre-existing tokens
    let token = await Token.findOne({userId: user._id})
    if (token) {
        await token.deleteOne()
    }

    // reset token
    let passwordReset = crypto.randomBytes(32).toString("hex") + user._id //crypto.randomBytes creates secure random data for encryption purposes, 32 is the number of bytes, toString(hex) creates hex numbers for the encryption
    
    //hash reset token
    const tokenHashed = crypto.createHash("sha256").update(passwordReset).digest("hex") // SHA-256 is a hashing algorithm that outputs a value 256 bits long
    //add token to mongo
    await new Token({
        userId: user._id,
        token: tokenHashed,
        created: Date.now(),
        expires: Date.now() + 30 * (60 * 1000) // this is 30 minutes
    }).save()

    // reset url string
    const urlReset = `${process.env.RESET_URL}/passwordreset/${passwordReset}`

    // email reset
    const message = `
    <h2>Hello ${user.username}</h2>
    <p>So ya forgot your password, huh? That's alright, click the link below to reset!</p>
    <p>Do it quick, though! The link below will expire in 30 minutes.</p>
    
    <a href=${urlReset} clicktracking=off>${urlReset}</a>

    <p>Best of luck getting it together!</p>`;

    const subject = "Reset password for Get It Together"
    const send_to = user.email
    sent_from = process.env.EMAIL_USER

    try {
        await sendEmail(subject, message, send_to, sent_from)
        res.status(200).json({success: true, message: "Reset email sent to user"})
    } catch (error) {
        res.status(500)
        throw new Error("Email unsuccessful. Please try again!")
    }

    res.send("Forgot password")
})

module.exports = { signUp, logIn, logOut, findUser, logStatus, userUpdate, changePassword, forgotPassword }