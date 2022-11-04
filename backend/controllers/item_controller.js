const asyncHandler = require('express-async-handler')
const Item = require('../models/item_model')
const { fileSizeFormatter } = require('../utilities/upload_image')
const cloudinary = require("cloudinary");
const { response } = require('express');

// enter item into db
const makeItem = asyncHandler (async (req, res) => {
    const { title,  author, format, release, edition, barcode, quantity } = req.body
    if (!title || !author || !format) {
        res.status(404).json()
        throw new Error("Please fill in all required fields")
    }

    // image upload handler
    let fileData = {};
    if (req.file){
        let uploadedFile;
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, { folder: "Get It Together", resource_type: "image"})
        } catch (error) {
            res.status(500)
            throw new Error("Image can't be uploaded")
        }

        fileData = { 
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2)
        }
    }

    // create item
    const item = await Item.create({
        user: req.user.id,
        title, author, format, release, edition, barcode, quantity, image: fileData
    })

    res.status(201).json(item)
})

// Access all items in inventory
const getItems = asyncHandler (async (req, res) => {
    const items = await Item.find({user: req.user.id}).sort("-created")
    res.status(200).json(items)
})

// Access one item
const getItem = asyncHandler (async (req, res) => {
    const item = await Item.findById(req.params.id)
    if (!item) {
        res.status(404)
        throw new Error("You don't have this item! Log it to continue")
    }

    // link item to user
    if (item.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("You're not authorized :/")
    }
    res.status(200).json(item)
})

// Delete item
const deleteItem = asyncHandler (async (req, res) => {
    const item = await Item.findById(req.params.id)
    if (!item) {
        res.status(404)
        throw new Error("You don't have this item! Log it to continue")
    }

    // link item to user
    if (item.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("You're not authorized to delete this item")
    }
    await item.remove()
    res.status(200).json({message: "Item deleted"})
})

// Update items
const updateItem = asyncHandler (async (req, res) => {
    const { title, author, format, release, edition, quantity, barcode } = req.body
    const {id} = req.params

    const item = await Item.findById(id)

    if (!item) {
        res.status(404)
        throw new Error("You don't have this item! Log it to continue")
    }

    if (item.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("You're not authorized to delete this item")
    }

    // image upload handler
    let fileData = {};
    if (req.file){
        let uploadedFile;
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, { folder: "Get It Together", resource_type: "image"})
        } catch (error) {
            res.status(500)
            throw new Error("Image can't be uploaded")
        }

        fileData = { 
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2)
        }
    }

    // update item
    const updatedItem = await Item.findByIdAndUpdate({_id: id}, {title, author, format, release, edition, quantity, barcode, 
        image: Object.keys(fileData).length === 0 ? item?.image : fileData}, {new: true, runValidators: true}) // pulls fields that need updates, lets them be updated, and validates

    res.status(200).json(updatedItem)
})

module.exports = { makeItem, getItems, getItem, deleteItem, updateItem };