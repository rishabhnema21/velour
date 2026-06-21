import { relations } from "drizzle-orm";
import { userBooks } from "./userBooks";
import { shelves } from "./shelves";
import { users } from "./user";
import { books } from "./books";
import { shelfBooks } from "./shelf_books";
import { highlights } from "./highlight";

export const userRelations = relations(users, ({many}) => ({
    userBooks: many(userBooks),
    shelves: many(shelves),
    highlights: many(highlights),
}));

export const booksRelations = relations(books, ({many}) => ({
    userBooks: many(userBooks),
}));

export const userBookRelations = relations(userBooks, ({one, many}) => ({
    user: one(users, {
        fields: [userBooks.userId],
        references: [users.id],
    }),
    book: one(books, {
        fields: [userBooks.bookId],
        references: [books.id],
    }),
    shelfBooks: many(shelfBooks),
    highlights: many(highlights),
}));

export const shelvesRelations = relations(shelves, ({one, many}) => ({
    user: one(users, {
        fields: [shelves.userId],
        references: [users.id],
    }),
    shelfBooks: many(shelfBooks),
}));

export const shelfBooksRelations = relations(shelfBooks, ({one}) => ({
    shelf: one(shelves, {
        fields: [shelfBooks.shelfId],
        references: [shelves.id],
    }),
    userBook: one(userBooks, {
        fields: [shelfBooks.userBookId],
        references: [userBooks.id],
    }),
}));

export const highlightRelations = relations(highlights, ({one}) => ({
    user: one(users, {
        fields: [highlights.userId],
        references: [users.id],
    }),
    userBook: one(userBooks, {
        fields: [highlights.userBookId],
        references: [userBooks.id],
    })
}))