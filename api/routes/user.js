const express = require("express")
const router = express.Router() // router from express
const UserController = require("../controller/UserController");

router.post("/user/create",UserController.Create)




module.exports = router

