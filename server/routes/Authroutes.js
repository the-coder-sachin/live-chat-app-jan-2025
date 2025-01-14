import {
  signup,
  login,
  getUser,
  updateUser,
  updateProfilePicture,
  removeProfilePicture,
} from "../controllers/AuthController.js";



import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

import multer from 'multer';


// Set up the storage engine with diskStorage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the destination folder where files will be uploaded
    cb(null, 'uploads/profiles');
  },
  filename: (req, file, cb) => {
    // Set the filename for the uploaded file
    cb(null, Date.now() + file.originalname); // Add timestamp to avoid name conflicts
  }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });






export const authRouter = Router();

authRouter.post('/signup', signup)
authRouter.post('/login', login)
authRouter.get('/user-info', verifyToken, getUser)
authRouter.post('/update-user', verifyToken, updateUser)
authRouter.post('/update-profile-image', verifyToken, upload.single('profile'), updateProfilePicture)
authRouter.delete(
  "/remove-profile-image",
  verifyToken,
  removeProfilePicture
);