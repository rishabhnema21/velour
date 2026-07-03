"use client";

import { getLibraryBooks } from "@/lib/apifetch/library";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export type LibraryShelf = {
  id: string;
  name: string;
  isSystem: boolean;
  bookCount: number;
  coverImage?: string | null;
  createdAt: string;
};

export type RecentlyAddedBook = {
  id: string;
  title: string;
  authors?: string[] | null;
  thumbnail?: string | null;
  smallThumbnail?: string | null;
};

export type LibraryOverview = {
  defaultShelves: LibraryShelf[];
  customShelves: LibraryShelf[];
  recentlyAdded: RecentlyAddedBook[];
};

type ApiResponse = {
  success: boolean;
  data?: LibraryOverview;
  message?: string;
};

const fetchLibraryOverview = async (
  token: string | null,
): Promise<LibraryOverview> => {
  const response = await axios.get<ApiResponse>(
    `${API_BASE}/api/library/overview`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    },
  );

  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to load your library.");
  }

  return (
    response.data.data ?? {
      defaultShelves: [],
      customShelves: [],
      recentlyAdded: [],
    }
  );
};

export const useLibraryOverview = () => {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["library", "overview"],
    queryFn: async () => {
      const token = await getToken();
      return fetchLibraryOverview(token);
    },
    enabled: isLoaded && !!isSignedIn,
    staleTime: 1000 * 60 * 2,
  });

  return {
    overview: data ?? {
      defaultShelves: [],
      customShelves: [],
      recentlyAdded: [],
    },
    isLoading,
    error: error ? (error as Error).message : null,
    refetch,
  };
};

export const useLibraryBooks = () => {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  return useQuery({
    queryKey: ["library", "books"],
    queryFn: async () => {
      const token = await getToken();
      return getLibraryBooks(token ?? undefined);
    },
    enabled: isLoaded && !!isSignedIn,
    staleTime: 1000 * 60 * 2,
  });
};
