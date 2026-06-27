export declare const userRelations: import("drizzle-orm").Relations<"users", {
    userBooks: import("drizzle-orm").Many<"user_books">;
    shelves: import("drizzle-orm").Many<"shelves">;
    highlights: import("drizzle-orm").Many<"highlights">;
}>;
export declare const booksRelations: import("drizzle-orm").Relations<"books", {
    userBooks: import("drizzle-orm").Many<"user_books">;
}>;
export declare const userBookRelations: import("drizzle-orm").Relations<"user_books", {
    user: import("drizzle-orm").One<"users", true>;
    book: import("drizzle-orm").One<"books", true>;
    shelfBooks: import("drizzle-orm").Many<"shelf_books">;
    highlights: import("drizzle-orm").Many<"highlights">;
}>;
export declare const shelvesRelations: import("drizzle-orm").Relations<"shelves", {
    user: import("drizzle-orm").One<"users", true>;
    shelfBooks: import("drizzle-orm").Many<"shelf_books">;
}>;
export declare const shelfBooksRelations: import("drizzle-orm").Relations<"shelf_books", {
    shelf: import("drizzle-orm").One<"shelves", true>;
    userBook: import("drizzle-orm").One<"user_books", true>;
}>;
export declare const highlightRelations: import("drizzle-orm").Relations<"highlights", {
    user: import("drizzle-orm").One<"users", true>;
    userBook: import("drizzle-orm").One<"user_books", true>;
}>;
//# sourceMappingURL=relations.d.ts.map