import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import {
  createChannel,
  getUserChannel,
} from "../controllers/ChannelController.js";

export const channelRoutes = Router();

channelRoutes.post('/create-channel', verifyToken, createChannel)
channelRoutes.get("/get-user-channel", verifyToken, getUserChannel);