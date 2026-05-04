import { relations } from "drizzle-orm";
import { userBooks } from "./userBooks";
import { shelves } from "./shelves";
import { users } from "./user";
import { books } from "./books";
import { shelfBooks } from "./shelf_books";
export const userRelations = relations(users, ({ many }) => ({
    userBooks: many(userBooks),
    shelves: many(shelves),
}));
export const booksRelations = relations(books, ({ many }) => ({
    userBooks: many(userBooks),
}));
export const userBookRelations = relations(userBooks, ({ one, many }) => ({
    user: one(users, {
        fields: [userBooks.userId],
        references: [users.id],
    }),
    book: one(books, {
        fields: [userBooks.bookId],
        references: [books.id],
    }),
    shelfBooks: many(shelfBooks),
}));
export const shelvesRelations = relations(shelves, ({ one, many }) => ({
    user: one(users, {
        fields: [shelves.userId],
        references: [users.id],
    }),
    shelfBooks: many(shelfBooks),
}));
export const shelfBooksRelations = relations(shelfBooks, ({ one }) => ({
    shelf: one(shelves, {
        fields: [shelfBooks.shelfId],
        references: [shelves.id],
    }),
    userBook: one(userBooks, {
        fields: [shelfBooks.userBookId],
        references: [userBooks.id],
    }),
}));
//# sourceMappingURL=relations.js.map