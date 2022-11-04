const asyncHandler = require('express-async-handler')
const User = require('../models/user_model')
const send_email = require("../utilities/send_email")

const contact = asyncHandler (async (req, res) => {
    const { subject, message } = req.body
    const user = await User.findById(req.user._id)
    
    if(!user) {
        res.status(400)
        throw new Error("This user doesn't exist. Please sign up or log in to continue")
    }

    // validate the user
    if (!subject || !message) {
        res.status(400)
        throw new Error("Please add subject and/or comment")
    }

    const send_to = process.env.EMAIL_USER
    const sent_from = process.env.EMAIL_USER
    const reply_to = user.email
    try {
        await send_email(subject, message, send_to, sent_from, reply_to)
        res.status(200).json({success: true, message: "Contact has been received. We will return your message shortly"})
    } catch (error) {
        res.status(500)
        throw new Error("Email unsuccessful. Please try again!")
    }
})

module.exports = { contact }