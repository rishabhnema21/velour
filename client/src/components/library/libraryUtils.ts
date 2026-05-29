import type { RecentlyAddedBook } from "@/hooks/useLibraryOverview";

export const formatShelfName = (name: string) =>
  name
    .toLowerCase()
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export const formatBookCount = (count: number) =>
  `${count} ${count === 1 ? "book" : "books"}`;

export const getBookCover = (book: RecentlyAddedBook) =>
  book.thumbnail || book.smallThumbnail || "/book.jfif";
