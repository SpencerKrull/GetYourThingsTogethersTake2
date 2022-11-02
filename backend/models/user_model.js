const mongoose = require('mongoose');

const user_schema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Enter a valid email"]
    }, // email validation, making sure there are also no duplicates when users register
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minLength: [8, "Password must be 8 characters"]
    },
    photo: {
        type: String,
        required: [true, "Add a photo"],
        default: "http://placekitten.com/200/200"
    },
    about: {
        type: String,
        maxLength: [500, "Keep it under 500 characters!"]
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", user_schema)

module.export= User;