import { Request, Response } from "express";
import { db } from "../db";
import { eq, ilike, or } from "drizzle-orm";
import { books } from "../db/schema";
import { searchInGoogleBooks } from "../services/googleBooks";

export const getBooks = async (req: Request, res: Response) => {
  try {
    // Extract the search query from the request query parameters
    const query = req.query.q as string;
    console.log("Search query: ", query);

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Search for books in the database based on the query

    const searchCondition = or(
      ilike(books.title, `%${query}%`),
      ilike(books.description, `%${query}%`),
    );

    console.log("searching books in db");

    const existingBooks = await db.select().from(books).where(searchCondition);

    if (existingBooks.length > 0) {
      return res.status(200).json({
        success: true,
        books: existingBooks,
      });
    }

    console.log("searching in google books api");

    // If no books are in DB, call Google Books API
    const googleSearchResult = await searchInGoogleBooks(query);
    if (!googleSearchResult || googleSearchResult.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }

    const filteredResult = googleSearchResult.filter((item: any) => {
      const title = item.volumeInfo.title?.toLowerCase() || "";
      const queryLower = query.toLowerCase();
      return title.includes(queryLower);
    });

    if (!filteredResult || filteredResult.length === 0) {
      return res.status(404).json({ message: "No Books Found" });
    }

    console.log(
      "google books api search completed, this is result: ",
      googleSearchResult,
    );
    console.log(
      "mapping google books api result to our db schema and inserting into db if not exists",
    );
    // Map Google Books API response to our database schema

    const booksToInsert = filteredResult.map((item: any) => ({
      googleBooksId: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || [],
      publisher: item.volumeInfo.publisher,
      description: item.volumeInfo.description,
      pageCount: item.volumeInfo.pageCount || null,
      categories: item.volumeInfo.categories || [],
      smallThumbnail: item.volumeInfo.imageLinks?.smallThumbnail,
      thumbnail: item.volumeInfo.imageLinks?.thumbnail,
      language: item.volumeInfo.language,
      isbn10: item.volumeInfo.industryIdentifiers?.find(
        (id: any) => id.type === "ISBN_10",
      )?.identifier,
      isbn13: item.volumeInfo.industryIdentifiers?.find(
        (id: any) => id.type === "ISBN_13",
      )?.identifier,
    }));

    console.log("inserting books to db");

    // Insert extracted book into the database's books table and ignore duplicates based on googleBooksId
    await db
      .insert(books)
      .values(booksToInsert)
      .onConflictDoNothing({ target: books.googleBooksId });

    console.log(
      "books inserted to db, fetching the inserted records to return to client",
    );

    //   Fetch the books again to get the inserted records with their generated IDs. This ensures we return the complete book data, including the database-generated ID, to the client.

    const resultedBooks = await db.select().from(books).where(searchCondition);

    console.log("resulted books: ", resultedBooks);

    return res.status(200).json({
      message: "Books fetched and stored successfully",
      books: resultedBooks,
    });
  } catch (err) {
    console.log("Error fetching books: ", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getOneBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Invalid book id" });
    }

    const book = await db.select().from(books).where(eq(books.id, id)).limit(1);

    if (!book || book.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ success: true, book: book[0] });
  } catch (err) {
    console.log("Error fetching book: ", err);
    return res.status(500).json({ message: "Internal Server error" });
  }
};
