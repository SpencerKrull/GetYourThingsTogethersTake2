const express = require("express")
const router = express.Router()
const { makeItem } = require("../controllers/item_controller")
const protect = require('../middleware/auth_middleware')

router.post("/", protect, makeItem)

module.exports = router;