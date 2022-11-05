const asyncHandler = require('express-async-handler')
const Entry = require('../models/entry_model')
const { fileSizeFormatter } = require('../utilities/upload_image')
const cloudinary = require("cloudinary");
const { response } = require('express');

// enter entry into db
const makeEntry = asyncHandler (async (req, res) => {
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

    // create entry
    const entry = await Entry.create({
        user: req.user.id,
        title, author, format, release, edition, barcode, quantity, image: fileData
    })

    res.status(201).json(entry)
})

// Access all entries in inventory
const getEntries = asyncHandler (async (req, res) => {
    const entries = await Entry.find({user: req.user.id}).sort("-created")
    res.status(200).json(entries)
})

// Access one entry
const getEntry = asyncHandler (async (req, res) => {
    const entry = await Entry.findById(req.params.id)
    if (!entry) {
        res.status(404)
        throw new Error("You don't have this entry! Log it to continue")
    }

    // link entry to user
    if (entry.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("You're not authorized :/")
    }
    res.status(200).json(entry)
})

// Delete entry
const deleteEntry = asyncHandler (async (req, res) => {
    const entry = await Entry.findById(req.params.id)
    if (!entry) {
        res.status(404)
        throw new Error("You don't have this entry! Log it to continue")
    }

    // link entry to user
    if (entry.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("You're not authorized to delete this entry")
    }
    await entry.remove()
    res.status(200).json({message: "entry deleted"})
})

// Update entries
const updateEntry = asyncHandler (async (req, res) => {
    const { title, author, format, release, edition, quantity, barcode } = req.body
    const {id} = req.params

    const entry = await entry.findById(id)

    if (!entry) {
        res.status(404)
        throw new Error("You don't have this entry! Log it to continue")
    }

    if (entry.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("You're not authorized to delete this entry")
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

    // update entry
    const updatedEntry = await entry.findByIdAndUpdate({_id: id}, {title, author, format, release, edition, quantity, barcode, 
        image: Object.keys(fileData).length === 0 ? entry?.image : fileData}, {new: true, runValidators: true}) // pulls fields that need updates, lets them be updated, and validates

    res.status(200).json(updatedEntry)
})

module.exports = { makeEntry, getEntries, getEntry, deleteEntry, updateEntry };