import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { searchContact } from "../controllers/ContactController.js";

export const contactRouter = Router();

contactRouter.post("/search-contact", verifyToken, searchContact);