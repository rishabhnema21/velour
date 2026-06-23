import { Router } from "express";
import { attachUser } from "../middleware/attatchUser";
import { requireAuth } from "@clerk/express";
import { createHighlight, deleteHighlights, getAllHighlights, updateHighlights } from "../controller/highlight.controller";

const router = Router();
router.use(requireAuth(), attachUser);

// get all highlights
router.get("/", getAllHighlights);
// update highlights by id
router.patch("/:highlightId", updateHighlights);
// delete highlights by id
router.delete("/:highlightId", deleteHighlights);

export default router;