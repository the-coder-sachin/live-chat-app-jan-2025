import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { getContactsForDMList, searchContact } from "../controllers/ContactController.js";

export const contactRouter = Router();

contactRouter.post("/search-contact", verifyToken, searchContact);
contactRouter.get("/get-contact-dm-list", verifyToken, getContactsForDMList);