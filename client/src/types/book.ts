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