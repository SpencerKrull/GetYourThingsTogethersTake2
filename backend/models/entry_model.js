const mongoose = require('mongoose')

const entrySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title: {type: String, required: [true, "Your entry must have a title"], trim: true}, // trim removes empty spaces/characters from strings
    author: {type: String, required: [true, "Please enter the author/artist/creator of the entry"], trim: true},
    format: {type: String, required: [true, "What format is your entry? I.e. vinyl record, hardback book, baseball card"]},
    release: {type: String},
    edition: {type: String},
    barcode: {type: Number},
    quantity: {type: Number},
    image: {type: Object, default: {}}
}, {timestamps: true})

const Entry = mongoose.model("Entry", entrySchema)
module.exports = Entry