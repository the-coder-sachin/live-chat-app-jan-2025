import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { getMessages, uploadFile } from "../controllers/MessageController.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";


export const messageRoutes = Router();



const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "chat_files", // Cloudinary में folder का नाम
    resource_type: "auto", // pdf, images, videos सब support
  },
});

const upload = multer({ storage: storage });





messageRoutes.post('/get-messages', verifyToken, getMessages)


messageRoutes.post('/upload-file', verifyToken, upload.single('file'), uploadFile)