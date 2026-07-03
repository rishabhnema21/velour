import { useToast } from "@/components/notifications/ToastProvider";
import { moveBook } from "@/lib/apifetch/book";
import { addBookToLibrary, getLibraryBooks } from "@/lib/apifetch/library";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getErrorMessage = (err: unknown) =>
  err instanceof Error ? err.message : "Something went wrong";

export const useAddToLibrary = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: async ({ bookId }: { bookId: string }) => {
      const token = await getToken();
      return addBookToLibrary(bookId, token ?? undefined);
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["libraryBooks", variables.bookId],
      });

      showToast({
        type: "success",
        title: "Book added to Library",
        message: "Book added to Library successfully",
      });
    },

    onError: (err: unknown) => {
      showToast({
        type: "error",
        title: "Add to Library failed",
        message: getErrorMessage(err),
      });
    },
  });
};

export const useLibrary = () => {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  return useQuery({
    queryKey: ["libraryBooks", "books"],
    queryFn: async () => {
      const token = await getToken();
      return getLibraryBooks(token ?? undefined);
    },
    enabled: isLoaded && isSignedIn,
    staleTime: 1000 * 60 * 2,
  });
};

export const useMoveBooks = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: async ({
      userBookId,
      shelfId,
    }: {
      userBookId: string;
      shelfId: string;
    }) => {
      const token = await getToken();
      return moveBook(userBookId, shelfId, token ?? undefined);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["library", "overview"] });
      queryClient.invalidateQueries({ queryKey: ["library", "books"] });
      queryClient.invalidateQueries({ queryKey: ["shelf"] });

      showToast({
        type: "success",
        title: "Wohoooo!!!",
        message: "Book moved to Shelf Successfully",
      });
    },
  });
};
