const asyncHandler = require("express-async-handler")
const User = require("../models/user_model")
const jwt = require('jsonwebtoken')

const protection = asyncHandler (async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            res.status(401)
            throw new Error("Unauthorized action. Please log in or sign up")
        }
        // token verification
        const verifiedUser = jwt.verify(token, process.env.JWT_SECRET)
        // getting user id from token
        const user = await User.findById(verifiedUser.id).select("-password") // returns all info except the password
        
        if (!user) {
            res.status(401)
            throw new Error("No user with those credentials")
        }
        req.user = user
        next()
    } catch (error) {
        res.status(401)
        throw new Error("Unauthorized action. Please log in or sign up")
    }
});

module.exports = protection