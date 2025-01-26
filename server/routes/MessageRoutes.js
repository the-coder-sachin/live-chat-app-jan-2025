import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { getMessages, uploadFile } from "../controllers/MessageController.js";
import multer from "multer";


export const messageRoutes = Router();




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/temp"); // Path where files are temporarily stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ dest: 'uploads/files' });





messageRoutes.post('/get-messages', verifyToken, getMessages)


messageRoutes.post('/upload-file', verifyToken, upload.single('file'), uploadFile)