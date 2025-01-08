import { genSalt, hash } from "bcrypt";
import mongoose from "mongoose";

// defining userSchema

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required:[true,"email required*"],
        unique: true
    },
    password:{
        type:String,
        required:[true, "password is required*"]
    },
    firstname:{
        type:String,
        required:false
    },
    lastname:{
        type:String,
        required:false
    },
    image:{
        type:String,
        required:false
    },
    color:{
        type:Number,
        required:false
    },
    profileSetup:{
        type:Boolean,
        required:false
    },
})

// hashing password before saving it to mongodb database

userSchema.pre('save', async function(next) {
    const salt = await genSalt(10)
    this.password = await hash(this.password, salt)
})

// create userModel 

const userModel = mongoose.model('users', userSchema);

export default userModel;