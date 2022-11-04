const express = require("express")
const router = express.Router()
const { makeItem } = require("../controllers/item_controller")
const protect = require('../middleware/auth_middleware')
const { upload } = require("../utilities/upload")

router.post("/", protect, upload.any("image"), makeItem); // uploads single file, specifies that it's an image

module.exports = router;