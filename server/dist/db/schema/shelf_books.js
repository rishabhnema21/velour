import { pgTable, uuid, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { shelves } from "./shelves";
import { userBooks } from "./userBooks";
export const shelfBooks = pgTable("shelf_books", {
    id: uuid("id").defaultRandom().primaryKey(),
    shelfId: uuid("shelf_id").references(() => shelves.id, { onDelete: "cascade" }).notNull(),
    userBookId: uuid("user_book_id").references(() => userBooks.id, { onDelete: "cascade" }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
    uniqueShelfBooks: uniqueIndex("unique_shelf_book").on(table.shelfId, table.userBookId),
}));
//# sourceMappingURL=shelf_books.js.map