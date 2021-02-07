const User = require("../../model/User")
const bcrypt = require("bcrypt")
const saltRounds = 10


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
       const login = await User.findOne({email:email})
       if(!login) return res.status(404).json({message:"Email Not found"})
        // compare password
       const result = await bcrypt.compareSync(password,login.password)
       if(!result) return res.json({message: "password Not match"})

       return res.json({login})
           }
    catch (error) {
        res.json({message:error.message})
    }
}

module.exports = { RegisterUser,LoginUser}