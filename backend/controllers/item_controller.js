const asyncHandler = require('express-async-handler')
const Item = require('../models/item_model')
const { fileSizeFormatter } = require('../utilities/upload')
const cloudinary = require("cloudinary").v2;

// enter item into db
const makeItem = asyncHandler (async (req, res) => {
    const { title,  author, format, release, edition, barcode, quantity, image } = req.body
    if (!title || !author || !format) {
        res.status(404).json()
        throw new Error("Please fill in all required fields")
    }

    // image upload handler
    let itemImage = {}
    if (req.file){
        let uploadedFile;
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, { folder: "Get It Together", resource_type: "image"})
        } catch (error) {
            res.status(500)
            throw new Error("Image can't be uploaded")
        }

        itemImage = { 
            fileName: req.file.originalname,
            filePath: req.uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2)
        }
    }

    // create item
    const item = await Item.create({
        user: req.user.id,
        title, author, format, release, edition, barcode, quantity, image: itemImage
    })

    res.status(201).json(item)
})

module.exports = { makeItem };