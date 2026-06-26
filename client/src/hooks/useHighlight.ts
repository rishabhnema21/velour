import { useToast } from "@/components/notifications/ToastProvider";
import { addHighlight, deleteHighlight, editHighlight, fetchHighlight } from "@/lib/apifetch/highlight";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export const useAddHighlight = () => {
    const { getToken } = useAuth();
    const queryClient = useQueryClient();
    const { showToast } = useToast();

    return useMutation({
        mutationFn: async ({
            userBookId,
            quote,
            note,
            pageNumber
        }: {
            userBookId: string;
            quote: string;
            note?: string;
            pageNumber?: number;
        }) => {
            const token = await getToken();
            if (!token) throw new Error("You must be signed in to add a highlight.");
            return addHighlight(token, userBookId, quote, note, pageNumber);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["highlights"] });
            showToast({
                type: "success",
                title: "Highlight added",
                message: "Your highlight was added successfully",
            });
        },
        onError: (err: any) => {
            showToast({
                type: "error",
                title: "Add highlight failed",
                message: err?.message || "Something went wrong",
            });
        },
    });
}

export const useFetchHighlight = () => {
    const { getToken, isLoaded, isSignedIn } = useAuth();
    return useQuery({
        queryKey: ["highlights"],
        queryFn: async () => {
            const token = await getToken();
            if (!token) throw new Error("You must be signed in to fetch highlights.");
            return fetchHighlight(token);
        },
        enabled: !!isLoaded && !!isSignedIn,
    })
};

export const useEditHighlight = () => {
    const {getToken} = useAuth();
    const queryClient = useQueryClient();
    const {showToast} = useToast();

    return useMutation({
        mutationFn: async ({
            highlightId,
            quote,
            note,
            pageNumber
        }: {
            highlightId: string,
            quote: string,
            note?: string,
            pageNumber?: number
        }) => {
            const token = await getToken();
            if (!token) throw new Error("You must be signed in to edit a highlight.");
            return editHighlight({token, highlightId, quote, note, pageNumber});
        },

        onSuccess : () => {
            queryClient.invalidateQueries({queryKey: ["highlights"]});
            showToast({
        type: "success",
        title: "Highlight Edited",
        message: "Your highlight was edited successfully",
      });
        },

        onError: (err: any) => {
      showToast({
        type: "error",
        title: "Edit failed",
        message: err?.message || "Something went wrong",
      });
    },
    })
}

export const useDeleteHighlight = () => {
    const { getToken } = useAuth();
    const queryClient = useQueryClient();
    const {showToast} = useToast();

    return useMutation ({
        mutationFn: async (highlightId: string) => {
            const token = await getToken();
            if (!token) throw new Error("You must be signed in to delete a highlight");
            return deleteHighlight(token, highlightId);
        },
        onSuccess: (_, highlightId) => {
            queryClient.invalidateQueries({queryKey: ["highlights"]});
            showToast({
                type: "success",
                title: "Highlight deleted",
                message: "Your highlight was deleted successfully",
            });
        },
        onError: (err: any) => {
            showToast({
                type: "error",
                title: "Delete failed",
                message: err?.message || "Something went wrong",
            })
        }

    })
}