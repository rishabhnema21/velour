import { UserBook } from "@/types/book";
import axios from "axios";

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const addBookToLibrary = async (
  bookId: string,
  token?: string,
): Promise<void> => {
  const res = await axios.post<ApiResponse<null>>(
    `${API_BASE}/api/library`,
    { bookId },
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    },
  );

  const response = res.data;

  if (!response.success) {
    throw new Error(response.message || "Failed to add book to library");
  }
};

export const getLibraryBooks = async (token?: string): Promise<UserBook[]> => {
  const res = await axios.get<ApiResponse<UserBook[]>>(
    `${API_BASE}/api/library`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    },
  );

  const response = res.data;
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch library books");
  }

  return response.data || [];
};
