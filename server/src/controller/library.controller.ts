import { Request, RequestHandler, Response } from "express";
import { db } from "../db";
import { books, shelfBooks, shelves, userBooks, users } from "../db/schema";
import { and, asc, count, desc, eq, inArray } from "drizzle-orm";
import type { UserBookParams } from "../types/params";

export const addToLibrary = async (req: Request, res: Response) => {
  try {
    // extracting user's clerk id and book id from the request body
    const { bookId } = req.body;
    const auth = req.auth();
    const clerkId = "userId" in auth ? auth.userId : null;
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

// get all books in the user's library

export const getLibraryBooks = async (req: Request, res: Response) => {
  try {
    const user = req.User;
    console.log(user?.id);
    const library = await db.query.userBooks.findMany({
      where: (userBooks, { eq }) => eq(userBooks.userId, user.id),
      with: {
        book: true,
      },
    });

    return res.status(200).json({ success: true, data: library });
  } catch (err) {
    console.log("Error in getting library books: ", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// moving books between shelves
export const updateBookShelf: RequestHandler<UserBookParams> = async (
  req,
  res,
) => {
  try {
    const user = req.User;
    const { userBookId } = req.params;
    const { shelfId } = req.body;

    if (!userBookId || !shelfId) {
      return res.status(400).json({
        success: false,
        message: "UserBook ID and Shelf ID are required",
      });
    }

    // checking if the shelf belongs to the user
    const shelf = await db.query.shelves.findFirst({
      where: (shelves, { eq, and }) =>
        and(eq(shelves.id, shelfId), eq(shelves.userId, user.id)),
    });

    if (!shelf) {
      return res
        .status(404)
        .json({ success: false, message: "Shelf Not Found" });
    }

    const userbook = await db.query.userBooks.findFirst({
      where: (userBooks, { eq, and }) =>
        and(eq(userBooks.id, userBookId), eq(userBooks.userId, user.id)),
    });

    if (!userbook) {
      return res.status(404).json({
        success: false,
        message: "UserBook not found",
      });
    }

    if (shelf.isSystem) {
      const systemShelves = await db
        .select({ id: shelves.id })
        .from(shelves)
        .where(and(eq(shelves.userId, user.id), eq(shelves.isSystem, true)));

      const systemShelfIds = systemShelves.map((s) => s.id);

      if (systemShelfIds.length > 0) {
        await db
          .delete(shelfBooks)
          .where(
            and(
              eq(shelfBooks.userBookId, userBookId),
              inArray(shelfBooks.shelfId, systemShelfIds),
            ),
          );
      }
    }

    await db
      .insert(shelfBooks)
      .values({ shelfId, userBookId })
      .onConflictDoNothing();

    return res.status(200).json({
      success: true,
      message: shelf.isSystem
        ? "Books moved to system shelf successfully"
        : "Book added to shelf",
    });
  } catch (err) {
    console.log("Error in moving books between shelves: ", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// removing book from library
export const removeFromLibrary: RequestHandler<UserBookParams> = async (
  req,
  res,
) => {
  try {
    const { userBookId } = req.params;
    const user = req.User;

    if (!userBookId) {
      return res.status(400).json({
        success: false,
        message: "UserBook ID is required",
      });
    }

    const userbook = await db.query.userBooks.findFirst({
      where: (userBooks, { eq, and }) =>
        and(eq(userBooks.id, userBookId), eq(userBooks.userId, user.id)),
    });

    if (!userbook) {
      return res.status(404).json({
        success: false,
        message: "UserBook not found",
      });
    }

    await db
      .delete(userBooks)
      .where(and(eq(userBooks.id, userBookId), eq(userBooks.userId, user.id)));

    return res.status(200).json({
      success: true,
      message: "Book removed from library successfully",
    });
  } catch (err) {
    console.log("Error in removing book from library", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};


export const handleLibraryOverview = async (req: Request, res: Response) => {
  try {
    const user = req.User;

    const shelfOverview = await db.select({
      id: shelves.id,
      name: shelves.name,
      isSystem: shelves.isSystem,
      createdAt: shelves.createdAt,
      bookCount: count(shelfBooks.id),
    })
    .from(shelves)
    .leftJoin(shelfBooks, eq(shelves.id, shelfBooks.shelfId))
    .where(eq(shelves.userId, user.id))
    .groupBy(shelves.id, shelves.name, shelves.isSystem, shelves.createdAt)
    .orderBy(desc(shelves.isSystem), asc(shelves.createdAt));

    const recentlyAdded = await db.query.userBooks.findMany({
      where: (userBooks, { eq }) => eq(userBooks.userId, user.id),
      orderBy: (userBooks, { desc}) => desc(userBooks.createdAt),
      limit: 6,
      with: {
        book: true,
      }
    })

    const formattedShelves = shelfOverview.map((shelf) => ({
      id: shelf.id,
      name: shelf.name,
      isSystem: shelf.isSystem,
      bookCount: Number(shelf.bookCount),
      createdAt: shelf.createdAt,
    }));

    return res.status(200).json({
      success: true,
      data: {
        defaultShelves: formattedShelves.filter((shelf) => shelf.isSystem),
        customShelves: formattedShelves.filter((shelf) => !shelf.isSystem),
        recentlyAdded: recentlyAdded.map((item) => ({
          id: item.id,
          title: item.book.title,
          authors: item.book.authors,
          thumbnail: item.book.thumbnail,
          smallThumbnail: item.book.smallThumbnail,
        }))
      }
    })

  } catch (err) {
    console.log("Error in getting library overview: ", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
