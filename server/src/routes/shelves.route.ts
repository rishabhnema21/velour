import express from "express";
import { attachUser } from "../middleware/attatchUser";
import { requireAuth } from "@clerk/express";
import { getShelves } from "../controller/shelves.controller";
const router = express.Router();

// get all shelves of the user
router.get("/", requireAuth(), attachUser, getShelves);

export default router;
