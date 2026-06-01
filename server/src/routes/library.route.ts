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

router.post("/", requireAuth(), attachUser, addToLibrary); // add a book to the library
// to have an overview of the library and its shelves
router.get("/overview", requireAuth(), attachUser, handleLibraryOverview);
router.get("/", requireAuth(), attachUser, getLibraryBooks); // get all books in the library of the user.
router.post(
  "/books/:userBookId/shelves",
  requireAuth(),
  attachUser,
  updateBookShelf,
); // moving a book between shelves.
router.delete(
  "/books/:userBookId",
  requireAuth(),
  attachUser,
  removeFromLibrary,
); // remove a book from the library.


export default router;
