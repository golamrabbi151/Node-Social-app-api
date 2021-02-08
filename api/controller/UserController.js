const User = require("../../model/User")
const bcrypt = require("bcrypt")
const saltRounds = 10
const jwt = require("jsonwebtoken")


const RegisterUser = async (req, res, next) => {
    try {
        const {
            name,
            email,
            password,
            about
            // role
        } = req.body

        const checkEmail = await User.findOne({ email: email })
        if (checkEmail) return res.status(409).json({ status: false, message: "User alredy Exist" })
        // encrypt password
        const upass = bcrypt.hashSync(password, saltRounds)

        const saveUser = new User({
            name: name,
            email: email,
            password: upass,
            about: about
            // role:role
        })
        await saveUser.save();
        return res.status(201).json({ status: true, message: "User Create Successful" })
    }
    catch (error) {
        res.json({ message: error.message })
    }
}

const LoginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body
        // encrypt pass

        //    Login User
        const login = await User.findOne({ email: email })
        if (!login) return res.status(404).json({ message: "Email Not found" })
        // compare password
        const result = await bcrypt.compareSync(password, login.password)
        if (!result) return res.json({ message: "password Not match" })
        let secret = "145"
        let token = jwt.sign({ id: login._id }, secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        let mytoken = await User.findOneAndUpdate({ email: email }, { $set: { token: token } })
        res.status(200).send({ auth: true, token: token });
        //    return res.json({login})
    }
    catch (error) {
        res.json({ message: error.message })
    }
}
//show profile 
const Profile = async (req, res, next) => {
    //  res.status(200).send({auth:true,message:`looking for token ${req}`})
    var token = req.headers.authorization.split(" ")[1];
    console.log(token);
    if (!token) return res.status(401).send({ auth: false, message: "no token provided" })
    //verify token
    jwt.verify(token, "145", (err, decode) => {
        if (err) return res.status(500).send({ auth: false, message: "token Authentication failed" })
        return res.status(200).send({ auth: true, message: decode.id })
    })
}

module.exports = { RegisterUser, LoginUser, Profile }