"use client";

import BookCard from "@/components/book/BookCard";
import { useLibrary } from "@/hooks/library";
import { searchBooks } from "@/lib/apifetch/book";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";

const SearchContent = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim() || "";

  const {
    data: books = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["books", query],
    queryFn: () => searchBooks(query),
    enabled: !!query,
  });

  const {data: libraryBooks} = useLibrary();

  const libraryMap = useMemo(() => {
    return new Map(libraryBooks?.map(ub => [ub.book.id, ub]));
  }, [libraryBooks]);

  return (
    <div
      className="px-4 md:px-10 pt-20 min-h-screen font-[urbanist]"
      style={{ color: "var(--velour-text)" }}
    >
      <div className="mb-8">
        <h1
          className="text-3xl md:text-4xl font-semibold"
          style={{ color: "var(--velour-ink)" }}
        >
          Search results{query ? ` for "${query}"` : ""}
        </h1>
        <p
          className="text-sm mt-1"
          style={{ color: "var(--velour-text-muted)" }}
        >
          {query
            ? "Browse the books we found for your search."
            : "Type a search in the top bar to get started."}
        </p>
      </div>

      {isLoading && <div className="text-lg">Loading books...</div>}

      {isError && (
        <div style={{ color: "var(--velour-shelf-dnf)" }}>
          {(error as Error).message}
        </div>
      )}

      {isLoading && isError && query && books.length === 0 && (
        <div>No books found for this search.</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-4">
        {books.map((book) => {
          const cover = book.thumbnail || book.smallThumbnail || "/book.jfif";
          const userbook = libraryMap.get(book.id);
          return (
            <BookCard
              key={book.id}
              id={book.id}
              cover={cover}
              title={book.title}
              authors={book.authors}
              description={book.description}
              userBookId={userbook?.id}
              currentShelfIds={userbook?.shelfBooks.map(s => s.shelfId) ?? []}
            />
          );
        })}
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense
      fallback={
        <div
          className="px-4 md:px-10 pt-20 min-h-screen font-[urbanist]"
          style={{ color: "var(--velour-text)" }}
        >
          Loading search...
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
};

export default Page;
