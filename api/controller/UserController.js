const User = require("../../model/User")


const Create = async (req,res,next) => {
try{
    const {
        name,
        email,
        // phone,
        about,
        role
    }=req.body

    const checkEmail = await User.findOne({email:email})
    if(checkEmail) return res.status(409).json({status:false,message:"Email alredy Exist"})

    const saveUser = new User({
        name:name,
        email:email,
        about:about,
        role:role
    })
    await saveUser.save();
    return res.status(201).json({status:true, message:"User Create Successful"})
}
catch(error){
    if(error) console.log(error)
    next(error)
}
}

module.exports={Create}