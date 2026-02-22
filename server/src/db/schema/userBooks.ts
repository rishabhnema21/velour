import { pgTable, text, date, uuid, timestamp, integer, boolean, uniqueIndex } from "drizzle-orm/pg-core";
import { users } from "./user";
import { books } from "./books";

export const userBooks = pgTable("user_books", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
    bookId: uuid("book_id").references(() => books.id, { onDelete: "cascade" }).notNull(),
    createdAt: timestamp("created_at", {withTimezone: true}).defaultNow().notNull(),
}, (table) => ({
    uniqueUserBook: uniqueIndex("user_book_unique").on(table.userId, table.bookId)
}));