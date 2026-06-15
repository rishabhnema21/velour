import { useToast } from "@/components/notifications/ToastProvider";
import { addBookToLibrary } from "@/lib/apifetch/library";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

    onError: (err: any) => {
      showToast({
        type: "error",
        title: "Add to Library failed",
        message: err?.message || "Something went wrong",
      });
    },
  });
};
