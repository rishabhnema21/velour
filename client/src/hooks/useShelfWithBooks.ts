import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import type { Shelf } from "@/types/book";
import { deleteShelf, renameShelf, shelfFetch } from "@/lib/apifetch/shelf";
import { useToast } from "@/components/notifications/ToastProvider";

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

      return shelfFetch(shelfId, token ?? undefined);
    },
    enabled: !!shelfId,
  });
};

export const useRenameShelf = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: async ({
      shelfId,
      name,
    }: {
      shelfId: string;
      name: string;
    }) => {
      const token = await getToken();

      return renameShelf({
        shelfId,
        name,
        token: token ?? undefined,
      });
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["shelfBooks", variables.shelfId],
      });

      showToast({
        type: "success",
        title: "Shelf renamed",
        message: "Your shelf was updated successfully",
      });
    },

    onError: (err: any) => {
      showToast({
        type: "error",
        title: "Rename failed",
        message: err?.message || "Something went wrong",
      });
    },
  });
};

export const useDeleteShelf = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: async (shelfId: string) => {
      const token = await getToken();

      return deleteShelf(shelfId, token ?? undefined);
    },

    onSuccess: (_, shelfId) => {
      queryClient.invalidateQueries({
        queryKey: ["shelves"],
      });

      queryClient.invalidateQueries({
        queryKey: ["shelfBooks", shelfId],
      });

      showToast({
        type: "success",
        title: "Shelf deleted",
        message: "The shelf was removed successfully",
      });
    },

    onError: (err: any) => {
      showToast({
        type: "error",
        title: "Delete failed",
        message: err?.message || "Something went wrong",
      });
    },
  });
};
