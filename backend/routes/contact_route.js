const express = require("express")
const router = express.Router()
const protect = require('../middleware/auth_middleware')
const { contact } = require("../controllers/contact_controller")

router.post("/", protect, contact)

module.exports = router;