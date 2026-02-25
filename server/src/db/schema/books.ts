import { pgTable, text, uuid, timestamp, integer, boolean, uniqueIndex } from "drizzle-orm/pg-core"

export const books = pgTable("books", {
    id: uuid("id").defaultRandom().primaryKey(),
    googleBooksId: text("google_books_id").notNull(),
    title: text("title").notNull(),
    authors: text("authors").notNull().array(),
    publisher: text("publisher"),
    description: text("description"),
    pageCount: integer("page_count"),   
    categories: text("categories").array(),
    smallThumbnail: text("small_thumbnail"),
    thumbnail: text("thumbnail"),
    language: text("language"),
    isbn10: text("isbn_10"),
    isbn13: text("isbn_13"),
    createdAt: timestamp("created_at", {withTimezone: true}).defaultNow().notNull(),
}, (table) => {
    return {
        googleBooksIdIndex: uniqueIndex("google_books_id_idx").on(table.googleBooksId),
    }
});

