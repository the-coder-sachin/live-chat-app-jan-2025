import { signup, login, getUser } from "../controllers/AuthController.js";

import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

export const authRouter = Router();

authRouter.post('/signup', signup)
authRouter.post('/login', login)
authRouter.get('/user-info', verifyToken, getUser)