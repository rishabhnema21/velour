import { Router } from "express";
import { attachUser } from "../middleware/attatchUser";
import { requireAuth } from "@clerk/express";
import { createHighlight } from "../controller/highlight.controller";

const router = Router();
router.use(requireAuth(), attachUser);

router.post("/books/:userBookId/highlights", createHighlight);

export default router;