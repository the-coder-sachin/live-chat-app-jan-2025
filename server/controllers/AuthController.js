import userModel from "../models/UserModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const maxAge = 24 * 60 * 60 * 1000;
// create token
const genToken = (email, userId)=>{
    return jwt.sign({email, userId}, process.env.JWT_TOKEN, {expiresIn : maxAge})
}


// sign up function
export const signup = async (req,res)=>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.json({
              success: false,
              message: 'credentials missing',
            });
        }

        const user = await userModel.create({
            email, password
        })

        res.cookie("jwt", genToken(email, user.id),{
            maxAge,
            secure: true,
            sameSite: 'None'
        })
        return res.json({
            success: true,
            user:{
                id:user.id,
                email:user.email,
                profileSetup:user.profileSetup
            }
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}


// login up function
export const login = async (req,res)=>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.json({
              success: false,
              message: 'credentials missing',
            });
        }

        const user = await userModel.findOne({
            email
        })

        if(!user){
            return res.json({
                success: false,
                message:`No user Found`
            })
        }

        const auth = await bcrypt.compare(password, user.password)

        if(!auth){
            return res.json({
              success: false,
              message: `Please enter correct password`,
            });
        }

        res.cookie("jwt", genToken(email, user.id),{
            maxAge,
            secure: true,
            sameSite: 'None'
        })
        return res.json({
            success: true,
            user:{
                id:user.id,
                email:user.email,
                profileSetup:user.profileSetup,
                firstname: user.firstname,
                lastname:user.lastname,
                color:user.color
            }
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

// get user info

export const getUser = async (req, res) => {
  try {
    const id = req.userId;
    const user = await userModel.findById(id);
    if(!user){
        return res.status(500).send('No user found')
    }
    return res.status(200).json( {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstname: user.firstname,
        lastname: user.lastname,
        color: user.color,
      });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
