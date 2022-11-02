const asyncHandler = require('express-async-handler')
const User = require("../models/user_model")
const bcrypt = require("bcryptjs")

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
    if (user) {
        const { _id, username, email, photo, about } = user
        res.status(201).json({ _id, username, email, photo, about })
    } else {
        res.status(400)
        throw new Error("Invalid user")
    }
});

module.exports = { signUp }