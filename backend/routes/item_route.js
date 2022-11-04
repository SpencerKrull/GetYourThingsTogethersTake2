const express = require("express")
const router = express.Router()
const { makeItem, getItems, getItem, deleteItem, updateItem } = require("../controllers/item_controller")
const protect = require('../middleware/auth_middleware')
const { upload } = require("../utilities/upload_image")

router.post("/", protect, upload.any("image"), makeItem)
router.patch("/:id", protect, upload.any("image"), updateItem) // uploads single file, specifies that it's an image
router.get("/", protect, getItems)
router.get("/:id", protect, getItem)
router.delete("/:id", protect, deleteItem)


module.exports = router;