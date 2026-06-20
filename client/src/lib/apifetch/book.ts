import { Book } from "@/types/book";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export const searchBooks = async (query: string): Promise<Book[]> => {
  const res = await axios.get<ApiResponse<Book[]>>(`${API_BASE}/api/books`, {
    params: { q: query },
  });

  const response = res.data;

  if (!response.success) {
    throw new Error(response.message || "Failed to fetch");
  }

  return response.data;
};

export const fetchBook = async (id: string): Promise<Book> => {
  const res = await axios.get<ApiResponse<Book>>(`${API_BASE}/api/books/${id}`);

  const response = res.data;

  if (!response.success) {
    throw new Error(response.message || "Failed to fetch");
  }

  return response.data;
};

export const moveBook = async (
  userBookId: string,
  shelfId: string,
  token?: string,
) => {
  const res = await axios.post(
    `${API_BASE}/api/library/books/${userBookId}/shelves`,
    { shelfId },
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    },
  );

  const response = res.data;
  if (!response.success) {
    throw new Error(response.message || "Failed to move");
  }
  return response.data;
};
