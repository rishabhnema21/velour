"use client";

import { useAddToLibrary } from "@/hooks/library";
import { useBook } from "@/hooks/useBook";
import { useLibraryBooks } from "@/hooks/useLibraryOverview";
import { useBookDrawerStore } from "@/store/BookDrawerStore";
import { useMoveModalStore } from "@/store/MoveModalStore";
import Image from "next/image";

const BookDrawer = () => {
  const { selectedBookId, closeDrawer, isOpen } = useBookDrawerStore();

  const { data: book, isLoading } = useBook(selectedBookId ?? "");
  const image = book?.smallThumbnail || "/placeholder.webp";
  const { data: libraryBooks } = useLibraryBooks();
  const { openModal } = useMoveModalStore();

  const addToLibraryMutation = useAddToLibrary();
  const userBook = libraryBooks?.find((ub) => ub.book.id === book?.id);
  const isinLibrary = !!userBook;
  const currentShelfIds = userBook?.shelfBooks.map((s) => s.shelfId) ?? [];

  return (
    <div
      className="fixed inset-y-0 right-0 w-96 z-50 h-full shadow-lg transition-transform duration-300"
      style={{
        backgroundColor: "var(--velour-surface)",
        color: "var(--velour-text)",
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
      }}
    >
      <div
        className="p-4 border-b flex items-center justify-between"
        style={{
          borderColor: "var(--velour-border)",
        }}
      >
        <div>
          <h2 className="text-lg font-semibold">Book Details</h2>
        </div>

        <button
          onClick={closeDrawer}
          className="px-2 py-1 text-sm rounded transition"
          style={{
            backgroundColor: "var(--velour-surface-secondary)",
            color: "var(--velour-text)",
            border: "1px solid var(--velour-border)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "var(--velour-surface-tertiary)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "var(--velour-surface-secondary)";
          }}
        >
          Close
        </button>
      </div>

      <div
        className="p-4 space-y-4 overflow-y-auto"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <div
          className="w-1/2 mx-auto h-48 rounded-lg flex items-center justify-center"
          style={{
            backgroundColor: "var(--velour-surface-secondary)",
          }}
        >
          <Image
            src={image}
            alt="book_cover"
            height={1000}
            width={1000}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <h3 className="text-xl text-center font-bold">{book?.title}</h3>
          {book?.authors.map((author) => (
            <p
              className="text-sm text-center"
              key={author}
              style={{ color: "var(--velour-text-muted)" }}
            >
              {author}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div
            className="p-2 rounded"
            style={{
              backgroundColor: "var(--velour-surface-secondary)",
              color: "var(--velour-text-muted)",
            }}
          >
            Rating: 4.5
          </div>
          <div
            className="p-2 rounded"
            style={{
              backgroundColor: "var(--velour-surface-secondary)",
              color: "var(--velour-text-muted)",
            }}
          >
            Pages: {book?.pageCount}
          </div>
          <div
            className="p-2 rounded"
            style={{
              backgroundColor: "var(--velour-surface-secondary)",
              color: "var(--velour-text-muted)",
            }}
          >
            Language: {book?.language}
          </div>
          <div
            className="p-2 rounded"
            style={{
              backgroundColor: "var(--velour-surface-secondary)",
              color: "var(--velour-text-muted)",
            }}
          >
            Publisher: {book?.publisher}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-1">Description</h4>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--velour-ink)" }}
          >
            {book?.description}
          </p>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={() => {
              if (!book?.id) return;
              if (isinLibrary && userBook) {
                openModal(userBook.id, currentShelfIds);
              } else {
                addToLibraryMutation.mutate({ bookId: book?.id });
              }
            }}
            disabled={addToLibraryMutation.isPending}
            className="flex-1 py-2 hover:bg-neutral-600 rounded transition cursor-pointer"
            style={{
              backgroundColor: "var(--velour-accent)",
              color: "var(--velour-surface)",
            }}
          >
            {addToLibraryMutation.isPending
              ? "Adding..."
              : isinLibrary
                ? "Move to Shelf"
                : "Add to Library"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDrawer;
