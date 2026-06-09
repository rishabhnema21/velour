import { useQuery } from "@tanstack/react-query";
import { fetchBook } from "@/lib/apifetch/book";

export const useBook = (bookId: string) => {
  return useQuery({
    queryKey: ["book", bookId],
    queryFn: () => fetchBook(bookId),
    enabled: !!bookId,
  });
};
