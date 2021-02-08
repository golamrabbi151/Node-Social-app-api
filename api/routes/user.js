const express = require("express")
const Authenticate = require("../middleware/UserAccess")
const UserController = require("../controller/UserController");
const router = express.Router() // router from express


router.post("/user/register", UserController.RegisterUser)
router.post("/user/login", UserController.LoginUser)
router.post("/user/profile",Authenticate.isUser,UserController.Profile)






module.exports = router

