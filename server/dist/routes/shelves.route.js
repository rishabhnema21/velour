import express from "express";
import { attachUser } from "../middleware/attatchUser";
import { requireAuth } from "@clerk/express";
import { createCustomShelves, deleteShelf, getShelfBooks, getShelves, renameShelf } from "../controller/shelves.controller";
const router = express.Router();
// get all shelves of the user
router.get("/", requireAuth(), attachUser, getShelves);
// get a shelf with its books for the user
router.get("/:shelfId", requireAuth(), attachUser, getShelfBooks);
// create custom shelves
router.post("/", requireAuth(), attachUser, createCustomShelves);
// Rename shelves
router.patch("/:shelfId", requireAuth(), attachUser, renameShelf);
// delete custom shelves
router.delete("/:shelfId", requireAuth(), attachUser, deleteShelf);
export default router;
//# sourceMappingURL=shelves.route.js.map