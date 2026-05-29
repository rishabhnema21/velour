"use client";

import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export type LibraryShelf = {
  id: string;
  name: string;
  isSystem: boolean;
  bookCount: number;
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

const emptyOverview: LibraryOverview = {
  defaultShelves: [],
  customShelves: [],
  recentlyAdded: [],
};

export const useLibraryOverview = () => {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [overview, setOverview] = useState<LibraryOverview>(emptyOverview);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      setLoading(false);
      setError("Please sign in to view your library.");
      return;
    }

    const controller = new AbortController();

    const loadOverview = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = await getToken();
        const response = await axios.get<ApiResponse>(
          `${API_BASE}/api/library/overview`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            signal: controller.signal,
          },
        );

        if (!response.data.success) {
          throw new Error(
            response.data.message || "Failed to load your library.",
          );
        }

        setOverview(response.data.data || emptyOverview);
      } catch (err) {
        if (axios.isCancel(err)) return;

        const message = axios.isAxiosError<ApiResponse>(err)
          ? err.response?.data?.message || err.message
          : (err as Error).message;

        setError(message || "Something went wrong.");
        setOverview(emptyOverview);
      } finally {
        setLoading(false);
      }
    };

    loadOverview();

    return () => controller.abort();
  }, [getToken, isLoaded, isSignedIn]);

  return { overview, loading, error };
};
