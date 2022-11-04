const mongoose = require('mongoose')

const tokenSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectId, required: true, ref: "user"},
    token: { type: String, required: true},
    created: { type: Date, required: true},
    expires: { type: Date, required: true}
})

const Token = mongoose.model("Token", tokenSchema)
module.exports = Token