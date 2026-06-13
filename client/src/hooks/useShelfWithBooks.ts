import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import type { Shelf } from "@/types/book";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export const useShelf = (shelfId?: string) => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["shelfBooks", shelfId],
    queryFn: async () => {
      if (!shelfId) throw new Error("No shelfId");
      const token = await getToken();
      const res = await axios.get<ApiResponse<Shelf>>(
        `${API_BASE}/api/shelves/${shelfId}`,
        { headers: token ? { Authorization: `Bearer ${token}` } : undefined },
      );

      if (!res.data.success) {
        throw new Error(res.data.message || "Failed to fetch shelf");
      }

      return res.data.data;
    },
    enabled: !!shelfId,
  });
};
