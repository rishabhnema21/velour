import express from "express";
import { attachUser } from "../middleware/attatchUser";
import { requireAuth } from "@clerk/express";
import {
  createCustomShelves,
  deleteShelf,
  getShelfBooks,
  getShelves,
  renameShelf,
} from "../controller/shelves.controller";
import type { ShelfParams } from "../types/params";
const router = express.Router();

router.use(requireAuth(), attachUser);

// get all shelves of the user
router.get("/", getShelves);
// get a shelf with its books for the user
router.get<ShelfParams>("/:shelfId", getShelfBooks);
// create custom shelves
router.post("/", createCustomShelves);
// Rename shelves
router.patch("/:shelfId", renameShelf);
// delete custom shelves
router.delete("/:shelfId", deleteShelf);

export default router;
