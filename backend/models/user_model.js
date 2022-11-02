const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")

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

// Password encryption
user_schema.pre("save", async function() {
    if (!this.isModified("password")) {
        return next()
    } // go to next function if password has not been modified
        // salt hashes the password by adding extraneous characters
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(this.password, salt);
        this.password = hashed
})

module.exports = User = mongoose.model('user', user_schema)