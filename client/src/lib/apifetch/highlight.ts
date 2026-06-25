import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

export type Highlight = {
  id: string;
  userId: string;
  userBookId: string;
  quote: string;
  note: string | null;
  pageNumber: number | null;
  createdAt: string;
  userBook?: {
    id: string;
    book: {
      id: string;
      title: string;
      authors: string[] | null;
      smallThumbnail?: string | null;
    };
  };
};

export const addHighlight = async (
  token: string,
  userBookId: string,
  quote: string,
  note?: string,
  pageNumber?: number,
) => {
  const res = await axios.post<ApiResponse<Highlight>>(
    `${API_BASE}/api/library/books/${userBookId}/highlights`,
    { quote, note, pageNumber },
    { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` } },
  );

  const response = res.data;
  if (!response.success) {
    throw new Error(response.message || "Failed to Add Highlight");
  }

  return response.data
};

export const fetchHighlight = async (token: string) => {
  const res = await axios.get<ApiResponse<Highlight[]>>(`${API_BASE}/api/highlights`, { headers: { "Authorization": `Bearer ${token}` } });
  const response = res.data;
  if (!response.success) {
    throw new Error(response.message || "Failed to Fetch Highlights");
  }

  return response.data;
}