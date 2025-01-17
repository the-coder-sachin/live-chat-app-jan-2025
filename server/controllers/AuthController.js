import userModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {unlinkSync} from 'fs'
import fs from 'fs'
import path from 'path'

const maxAge = 24 * 60 * 60 * 1000;
// create token
const genToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_TOKEN, {
    expiresIn: maxAge,
  });
};

// sign up function
export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "credentials missing",
      });
    }

    const user = await userModel.create({
      email,
      password,
    });

    res.cookie("jwt", genToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    return res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// login up function
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "credentials missing",
      });
    }

    const user = await userModel.findOne({
      email,
    });

    if (!user) {
      return res.json({
        success: false,
        message: `No user Found`,
      });
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      return res.json({
        success: false,
        message: `Please enter correct password`,
      });
    }

    res.cookie("jwt", genToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    return res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstname: user.firstname,
        lastname: user.lastname,
        color: user.color,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// get user info

export const getUser = async (req, res) => {
  try {
    const id = req.userId;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(500).send("No user found");
    }
    return res.status(200).json({
      id: user.id,
      email: user.email,
      profileSetup: user.profileSetup,
      firstname: user.firstname,
      lastname: user.lastname,
      color: user.color,
      image: user.image
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
// get update user

export const updateUser = async (req, res) => {
  try {
    const id = req.userId;
    const { firstName, lastName, color } = req.body;

    const user = await userModel.findByIdAndUpdate(id, {
      firstname: firstName,
      lastname: lastName,
      color,
      profileSetup: true 
    },{
        new: true
    });
    if (!user) {
      return res.status(500).send("No user found please login again");
    }
    return res.status(200).json({
      email: user.email,
      profileSetup: true,
      firstname: firstName,
      lastname: lastName,
      color: color,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};


export const updateProfilePicture = async (req, res) => {
  try {
    const id = req.userId;


    // Save the file path to the database (relative path, not absolute path)
    const filePath = req.file.filename; // Relative path for frontend

    const user = await userModel.findById(id)
    if (!user) {
        return res.status(500).send("No user found please login again");
    }
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        firstname: user.firstname,
        lastname: user.lastname,
        color: user.color,
        image: filePath,
        profileSetup: true,
      },
      {
        new: true,
      }
    );
    
    return res.status(200).json({
      email: user.email,
      profileSetup: true,
      firstname: user.firstname,
      lastname: user.lastname,
      color: updateUser.color,
      image: user.image,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const removeProfilePicture = async (req, res) => {
  try {
    const id = req.userId;

    const user = await userModel.findById(id);
    
        if (!user) {
          return res.status(500).send("No user found please login again");
        }

    // Check if the user has a profile picture
    if (user.image) {
      // Build the path to the image file
      const imagePath = path.join(process.cwd(), "uploads/profiles", user.image); // Adjust the path according to your storage setup

      // Check if the file exists on disk
      fs.exists(imagePath, (exists) => {
        if (exists) {
          // Delete the file from disk
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error("Error deleting file:", err);
              return res
                .status(500)
                .send("Error deleting the profile picture from disk");
            }

            console.log("File deleted successfully");
          });
        }
      });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        firstname: user.firstname,
        lastname: user.lastname,
        color: user.color,
        image: null,
        profileSetup: true,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      email: user.email,
      profileSetup: true,
      firstname: user.firstname,
      lastname: user.lastname,
      color: user.color,
      image: null,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};




// logout function
export const logout = async (req, res) => {
  try {
    // Clear the JWT cookie by setting it to expire in the past
    res.clearCookie("jwt", {
      secure: true,
      sameSite: "None",
    });

    return res.json({
      success: true,
      message: "Successfully logged out",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
