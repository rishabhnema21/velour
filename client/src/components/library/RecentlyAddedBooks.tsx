import Image from "next/image";
import type { RecentlyAddedBook } from "@/hooks/useLibraryOverview";
import { getBookCover } from "./libraryUtils";

type RecentlyAddedBooksProps = {
  books: RecentlyAddedBook[];
  loading: boolean;
};

const RecentlyAddedBooks = ({ books, loading }: RecentlyAddedBooksProps) => {
  return (
    <section className="mt-7">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Recently Added</h2>
          <p className="text-sm text-neutral-500">Your latest additions</p>
        </div>
        <button
          type="button"
          className="flex items-center gap-3 rounded-md px-2 py-1 text-sm text-neutral-400 transition hover:bg-white/5 hover:text-white"
        >
          See all
          <span className="text-xl leading-none">&rsaquo;</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 rounded-xl border border-white/8 bg-[#0d1012]/70 p-3 sm:grid-cols-3 sm:gap-4 sm:p-5 md:grid-cols-4 xl:grid-cols-6">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="aspect-5/7 animate-pulse rounded-md bg-white/10"
              />
            ))
          : books.map((book) => (
              <div
                key={book.id}
                className="aspect-5/7 overflow-hidden rounded-md bg-white/5"
              >
                <Image
                  src={getBookCover(book)}
                  alt={book.title}
                  width={240}
                  height={336}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}

        {!loading && books.length === 0 && (
          <div className="col-span-full px-2 py-8 text-sm text-neutral-400">
            No books have been added yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentlyAddedBooks;
