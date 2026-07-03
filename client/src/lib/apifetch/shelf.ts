import { Shelf } from "@/types/book";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

export const shelfFetch = async (
  shelfId: string,
  token?: string,
): Promise<Shelf> => {
  const res = await axios.get<ApiResponse<Shelf>>(
    `${API_BASE}/api/shelves/${shelfId}`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    },
  );

  const response = res.data;

  if (!response.success) {
    throw new Error(response.message || "Failed to fetch shelf");
  }

  return response.data as Shelf;
};

export const renameShelf = async ({
  shelfId,
  name,
  token,
}: {
  shelfId: string;
  name: string;
  token?: string;
}): Promise<Shelf> => {
  const res = await axios.patch<ApiResponse<Shelf>>(
    `${API_BASE}/api/shelves/${shelfId}`,
    { name },
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    },
  );
  const response = res.data;
  if (!response.success) {
    throw new Error(response.message || "Failed to rename shelf");
  }

  return response.data as Shelf;
};

export const deleteShelf = async (
  shelfId: string,
  token?: string,
): Promise<void> => {
  const res = await axios.delete<ApiResponse<null>>(
    `${API_BASE}/api/shelves/${shelfId}`,
    {
      headers: token
        ? { Authorization: `Bearer ${token}` }
        : undefined,
    },
  );

  const response = res.data;

  if (!response.success) {
    throw new Error(response.message || "Failed to delete shelf");
  }
};
