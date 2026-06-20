"use client";

import React from "react";
import { useShelf } from "@/hooks/useShelfWithBooks";
import { useParams } from "next/navigation";
import BookCard from "@/components/book/BookCard";
import { LuArrowLeft } from "react-icons/lu";
import Link from "next/link";
import RenameShelfPopover from "@/components/sections/shelfs/RenamePop";
import DeleteShelfModal from "@/components/modals/DeleteShelfModal";
import MoveBookModal from "@/components/modals/MoveBookModal";

const Page = () => {
  const { shelfId } = useParams<{ shelfId: string }>();
  const { data: shelf, isLoading, error } = useShelf(shelfId);

  if (!shelf) return null;

  return (
    <div className="h-full w-full">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/my-library"
            className="grid h-10 w-10 place-items-center rounded-md transition"
            style={{
              backgroundColor: "var(--velour-surface-secondary)",
              color: "var(--velour-text-muted)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "var(--velour-surface-tertiary)";
              (e.currentTarget as HTMLAnchorElement).style.color =
                "var(--velour-text)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "var(--velour-surface-secondary)";
              (e.currentTarget as HTMLAnchorElement).style.color =
                "var(--velour-text-muted)";
            }}
          >
            <LuArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1
              className="text-2xl font-semibold"
              style={{ color: "var(--velour-ink)" }}
            >
              {shelf?.name || "Shelf"}
            </h1>
            <p
              className="text-sm"
              style={{ color: "var(--velour-text-muted)" }}
            >
              {shelf
                ? `${shelf.shelfBooks.length} ${shelf.shelfBooks.length === 1 ? "book" : "books"}`
                : "Loading shelf..."}
            </p>
          </div>
        </div>

        {!shelf?.isSystem && (
          <div className="flex items-center gap-2">
            <RenameShelfPopover shelfId={shelf?.id} currentName={shelf?.name} />
            <DeleteShelfModal shelfId={shelf?.id} shelfName={shelf?.name} />
          </div>
        )}
      </div>

      <hr style={{ borderColor: "var(--velour-border)" }} />

      {isLoading && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-56 w-full rounded-md bg-white/6" />
              <div className="mt-3 h-4 w-3/4 rounded bg-white/8" />
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-md bg-red-900/30 px-4 py-3 text-sm text-red-100">
          {(error as any)?.message || "Failed to load shelf."}
        </div>
      )}

      {!isLoading && shelf && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {shelf.shelfBooks.length === 0 && (
            <div className="col-span-full rounded-md border border-white/8 bg-[#0d1012]/70 p-6 text-sm text-neutral-400">
              No books in this shelf yet.
            </div>
          )}

          {shelf.shelfBooks.map((shelfBook) => {
            const book = shelfBook.userBook.book;

            const cover = book.smallThumbnail || "/book.jfif";

            return (
              <BookCard
                key={shelfBook.id}
                id={book.id}
                cover={cover}
                title={book.title}
                authors={book.authors || []}
                description={book.description}
                userBookId={shelfBook.userBook?.id}
                currentShelfIds={[shelfId]}
              />
            );
          })}
        </div>
      )}
      <MoveBookModal />
    </div>
  );
};

export default Page;
