const express = require("express")
const router = express.Router()
const { makeEntry, getEntries, getEntry, deleteEntry, updateEntry } = require("../controllers/entry_controller")
const protect = require('../middleware/auth_middleware')
const { upload } = require("../utilities/upload_image")

router.post("/", protect, upload.any("image"), makeEntry)
router.patch("/:id", protect, upload.any("image"), updateEntry) // uploads single file, specifies that it's an image
router.get("/", protect, getEntries)
router.get("/:id", protect, getEntry)
router.delete("/:id", protect, deleteEntry)


module.exports = router;