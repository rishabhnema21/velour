import { Request, Response } from "express";
import { db } from "../db";
import { books, shelfBooks, shelves, userBooks, users } from "../db/schema";
import { and, eq } from "drizzle-orm";

export const addToLibrary = async (req: Request, res: Response) => {
  try {
    // extracting user's clerk id and book id from the request body
    const { bookId } = req.body;
    const clerkId: string | undefined = req.auth().userId;
    if (!clerkId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    console.log("Clerk ID from token:", clerkId);

    if (!bookId) {
      return res
        .status(400)
        .json({ success: false, message: "Book ID is required" });
    }

    console.log("Book ID from request body:", bookId);
    // searching for the user in the database using the clerk id
    console.log("Searching for the user");
    const user = await db
      .select()
      .from(users)
      .where(eq(users.clerkUserId, clerkId))
      .limit(1);

    // if user is not found, return and error response

    if (!user || user.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    console.log("User found: ", user[0].id);
    // if user is found, search for the book in the database using the book id

    const book = await db
      .select()
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    // if book is not found, return an error response

    if (!book || book.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    // if book is found, checking whether it exsists already in the userbook table (user's library)

    const userBook = await db
      .select()
      .from(userBooks)
      .where(
        and(eq(userBooks.userId, user[0].id), eq(userBooks.bookId, book[0].id)),
      )
      .limit(1);

    let userBookId;

    // if it already exists, save it in a variable
    if (userBook && userBook.length > 0) {
      userBookId = userBook[0].id;
    } else {
      const insertResult = await db
        .insert(userBooks)
        .values({
          userId: user[0].id,
          bookId: book[0].id,
        })
        .returning();

      userBookId = insertResult[0].id;
    }

    // checking if the userbook is added to the default shelf ( to be read )
    const shelf = await db
      .select()
      .from(shelves)
      .where(
        and(eq(shelves.userId, user[0].id), eq(shelves.name, "TO BE READ")),
      )
      .limit(1);

    const existingShelfBook = await db
      .select()
      .from(shelfBooks)
      .where(
        and(
          eq(shelfBooks.shelfId, shelf[0].id),
          eq(shelfBooks.userBookId, userBookId),
        ),
      )
      .limit(1);

    // if it is not added to the default shelf, add it to the default shelf
    if (shelf && shelf.length > 0 && !existingShelfBook.length) {
      await db.insert(shelfBooks).values({
        shelfId: shelf[0].id,
        userBookId: userBookId,
      });
    }

    // return a success response with the userbook details
    return res
      .status(200)
      .json({ success: true, message: "Book added to Library successfully" });
  } catch (err) {
    console.error("Error in Adding to library: ", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
