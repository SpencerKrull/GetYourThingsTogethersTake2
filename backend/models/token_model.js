const mongoose = require('mongoose')

const token_schema = mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectId, required: true, ref: "user"},
    token: { type: String, required: true},
    created: { type: Date, required: true},
    expires: { type: Date, required: true}
})

const Token = mongoose.model("Token", token_schema)
module.exports = Token