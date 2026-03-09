import { Router } from "express";
import { getBooks, getOneBook } from "../controller/book.controller";
const router = Router();

router.get("/", getBooks);
router.get("/:id", getOneBook);

export default router;