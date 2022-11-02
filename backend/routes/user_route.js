const express = require('express');
const router = express.Router();
const { signUp, logIn, logOut, findUser, logStatus, userUpdate, changePassword, forgotPassword } = require("../controllers/user_controller")
const protect = require('../middleware/auth_middleware')

router.post("/signup", signUp)
router.post("/login", logIn)
router.get("/logout", logOut)
router.get("/finduser", protect, findUser)
router.get("/loggedin", logStatus)
router.patch("/userupdate", protect, userUpdate) // allows me to update user's information
router.patch("/changepassword", protect, changePassword)
router.post("/forgotpassword", forgotPassword)

module.exports = router