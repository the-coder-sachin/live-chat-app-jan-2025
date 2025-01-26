import { messageModel } from "../models/MessageModel.js";
import {mkdirSync, renameSync } from 'fs'

export const getMessages = async (req, res) =>{
    try {
        const user1 = req.userId;
        const user2 = req.body.id;

        if(!user1 || !user2){
            return res.status(400).send('credentials missing')
        }
        

        const messages = await messageModel.find({
            $or:[
                {sender: user1, recipient: user2},
                {sender: user2, recipient: user1},
            ]
        }).sort({timestamp: 1});
        return res.status(200).json({messages});


    } catch (error) {
        console.log({error});
        return res.status(500).send('internal server error')
    }
}

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("File is missing");
    }

    const date = Date.now();
    const fileDir = `uploads/files/${date}`;
    const fileName = `${fileDir}/${req.file.originalname}`;

    // Log paths for debugging
    console.log("Temporary file path:", req.file.path); // Check if the temporary file exists
    console.log("Target file path:", fileName); // Check if the target file path is valid

    // Ensure directory exists
    try {
      mkdirSync(fileDir, { recursive: true });
      console.log("Directory created or already exists:", fileDir); // Log directory creation
    } catch (mkdirError) {
      console.error("Error creating directory:", mkdirError);
      return res.status(500).json({
        success: false,
        message: `Error creating directory: ${mkdirError.message}`,
      });
    }

    // Move the file to the new directory
    try {
      renameSync(req.file.path, fileName);
      console.log("File successfully moved to:", fileName); // Log if the file move was successful
    } catch (renameError) {
      console.error("Error renaming file:", renameError);
      return res.status(500).json({
        success: false,
        message: `Error renaming file: ${renameError.message}`,
      });
    }

    // Return the path of the uploaded file
    return res.status(200).json({ filePath: fileName });
  } catch (error) {
    console.error(error); // Log error for debugging purposes
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
