import express from "express";
import { requireAuth } from "@clerk/express";
import { addToLibrary, getLibraryBooks } from "../controller/library.controller";
import { attachUser } from "../middleware/attatchUser";
const router = express.Router();

router.post("/", requireAuth(), addToLibrary);
router.get("/", requireAuth(), attachUser, getLibraryBooks);

export default router;