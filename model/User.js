const {Schema, model} = require("mongoose")

const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required: true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
    },
    token:{
        type:String,
        default:null
    },

    // phone:{
    //     type:Number,
    //     required:true,
    //     unique:true,
    //     trim:true
    // },
    about:{
        type:String,
        trim:true,
        default:null
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin","supperAdmin"]
    }

})

const User =model("User",UserSchema)
module.exports = User