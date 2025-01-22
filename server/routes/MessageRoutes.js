import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { getMessages } from "../controllers/MessageController.js";


export const messageRoutes = Router();

messageRoutes.post('/get-messages', verifyToken, getMessages)