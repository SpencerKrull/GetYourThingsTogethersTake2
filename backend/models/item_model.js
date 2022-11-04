const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title: {type: String, required: [true, "Your item must have a title"], trim: true}, // trim removes empty spaces/characters from strings
    author: {type: String, required: [true, "Please enter the author/artist/creator of the item"], trim: true},
    format: {type: String, required: [true, "What format is your item? I.e. vinyl record, hardback book, baseball card"]},
    release: {type: String},
    edition: {type: String},
    barcode: {type: Number},
    quantity: {type: Number},
    image: {type: Object}
}, {timestamps: true})

const Item = mongoose.model("Item", itemSchema)
module.exports = Item