import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./user";
import { userBooks } from "./userBooks";

export const highlights = pgTable("highlights", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade"}).notNull(),
    userBookId: uuid("user_book_id").references(() => userBooks.id, { onDelete: "cascade"}).notNull(),
    quote: text("quote").notNull(),
    note: text("note"),
    pageNumber: text("page_number"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})