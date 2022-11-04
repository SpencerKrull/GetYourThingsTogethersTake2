const asyncHandler = require('express-async-handler')
const Item = require('../models/item_model')

const makeItem = asyncHandler (async (req, res) => {
    const { title,  author, format, release, edition, barcode, quantity } = req.body
    if (!title || !author || !format) {
        res.status(404).json()
        throw new Error("Please fill in all required fields")
    }

    const item = await Item.create({
        user: req.user.id,
        title, author, format, release, edition, barcode, quantity
    })

    res.status(201).json(item)
})

module.exports = { makeItem };