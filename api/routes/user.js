const express = require("express")
const router = express.Router() // router from express
const UserController = require("../controller/UserController");

router.post("/user/register",UserController.RegisterUser)
router.post("/user/login",UserController.LoginUser)




module.exports = router

