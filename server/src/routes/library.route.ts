import express from "express";
import { requireAuth } from "@clerk/express";
import { addToLibrary } from "../controller/library.controller";
const router = express.Router();

router.post("/add", requireAuth(), addToLibrary);

export default router;