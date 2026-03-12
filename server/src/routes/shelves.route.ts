import express from "express";
import { attachUser } from "../middleware/attatchUser";
import { requireAuth } from "@clerk/express";
import { getShelfBooks, getShelves } from "../controller/shelves.controller";
import type { ShelfParams } from "../types/params";
const router = express.Router();

// get all shelves of the user
router.get("/", requireAuth(), attachUser, getShelves);
// get a shelf with its books for the user
router.get<ShelfParams>("/:shelfId", requireAuth(), attachUser, getShelfBooks);

export default router;
