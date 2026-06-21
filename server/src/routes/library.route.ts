import express from "express";
import { requireAuth } from "@clerk/express";
import {
  addToLibrary,
  getLibraryBooks,
  handleLibraryOverview,
  removeFromLibrary,
  updateBookShelf,
} from "../controller/library.controller";
import { attachUser } from "../middleware/attatchUser";
const router = express.Router();

router.use(requireAuth(), attachUser);

// add a book to the library
router.post("/", addToLibrary);

// to have an overview of the library and its shelves
router.get("/overview",  handleLibraryOverview);

// get all books in the library of the user.
router.get("/",  getLibraryBooks);

// moving a book between shelves.
router.post("/books/:userBookId/shelves", updateBookShelf);

// remove a book from the library.
router.delete("/books/:userBookId", removeFromLibrary,);

export default router;