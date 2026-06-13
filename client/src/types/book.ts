export interface Book {
  id: string;
  googleBooksId: string;
  title: string;

  authors: string[];

  publisher: string | null;
  description: string | null;
  pageCount: number | null;
  categories: string[] | null;

  smallThumbnail: string | null;
  thumbnail: string | null;
  language: string | null;

  isbn10: string | null;
  isbn13: string | null;

  createdAt: string; // JSON response, not Date
}

export interface Shelf {
  id: string;
  userId: string;
  name: string;
  isSystem: boolean;
  createdAt: string;
  shelfBooks: ShelfBook[];
}

export interface ShelfBook {
  id: string;
  shelfId: string;
  userBookId: string;
  createdAt: string;
  userBook: UserBook;
}

export interface UserBook {
  id: string;
  userId: string;
  bookId: string;
  createdAt: string;
  book: Book;
}
