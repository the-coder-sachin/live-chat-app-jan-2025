import { signup } from "../controllers/AuthController.js";

import { Router } from "express";

export const authRouter = Router();

authRouter.post('/signup', signup)