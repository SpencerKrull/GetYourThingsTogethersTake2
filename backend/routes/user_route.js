const express = require('express');
const router = express.Router();
const { signUp } = require("../controllers/user_controller")

router.post("/signup", signUp)

module.exports = router