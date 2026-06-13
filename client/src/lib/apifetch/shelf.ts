import axios from "axios";
import { Shelf, ShelfBook, UserBook, Book } from "@/types/book";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export const shelfFetch = async (shelfId: string): Promise<Shelf> => {
  const res = await axios.get<ApiResponse<Shelf>>(
    `${API_BASE}/api/shelves/${shelfId}`,
  );

  const response = res.data;

  if (!response.success) {
    throw new Error(response.message || "Failed to fetch");
  }

  return response.data;
};
