import { CiMenuKebab } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import type { LibraryShelf } from "@/hooks/useLibraryOverview";
import { formatBookCount, formatShelfName } from "./libraryUtils";

type CustomShelvesProps = {
  shelves: LibraryShelf[];
  loading: boolean;
};

const CustomShelves = ({ shelves, loading }: CustomShelvesProps) => {
  return (
    <section className="mt-7">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Custom Shelves</h2>
          <p className="text-sm text-neutral-500">Shelves you created</p>
        </div>
        <button
          type="button"
          className="flex items-center gap-3 rounded-md px-2 py-1 text-sm text-neutral-400 transition hover:bg-white/5 hover:text-white"
        >
          See all
          <span className="text-xl leading-none">&rsaquo;</span>
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-4">
        <button
          type="button"
          className="flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed border-white/25 bg-[#0b0d0f]/70 p-5 text-center transition hover:border-[#f0c978]/70 hover:bg-white/5 sm:min-h-47.5"
        >
          <GoPlus className="h-10 w-10 text-neutral-300" />
          <span className="mt-8 font-semibold text-white">Create Shelf</span>
          <span className="mt-1 text-sm text-neutral-500">
            Build your collection
          </span>
        </button>

        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="min-h-42 animate-pulse rounded-xl border border-white/8 bg-[#0d1012]/85 p-4 sm:min-h-47.5 sm:p-5"
              >
                <div className="h-20 rounded-md bg-white/10 sm:h-24" />
                <div className="mt-4 h-4 w-2/3 rounded bg-white/10" />
                <div className="mt-3 h-3 w-1/3 rounded bg-white/8" />
              </div>
            ))
          : shelves.map((shelf) => (
              <article
                key={shelf.id}
                className="relative min-h-42 overflow-hidden rounded-xl border border-white/8 bg-[#0d1012]/85 p-4 shadow-xl shadow-black/20 sm:min-h-47.5 sm:p-5"
              >
                <button
                  type="button"
                  className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-md text-neutral-400 transition hover:bg-white/10 hover:text-white"
                  aria-label={`Open ${formatShelfName(shelf.name)} shelf menu`}
                >
                  <CiMenuKebab className="h-5 w-5" />
                </button>
                <div className="h-20 rounded-md border border-white/8 bg-[linear-gradient(135deg,rgba(157,240,189,0.1),rgba(255,255,255,0.04)_45%,rgba(244,199,108,0.1))] sm:h-24" />
                <h3 className="mt-4 font-semibold text-white">
                  {formatShelfName(shelf.name)}
                </h3>
                <p className="mt-1 text-sm text-neutral-400">
                  {formatBookCount(shelf.bookCount)}
                </p>
              </article>
            ))}

        {!loading && shelves.length === 0 && (
          <div className="flex min-h-40 items-center rounded-xl border border-white/8 bg-[#0d1012]/70 p-5 text-sm text-neutral-400 sm:min-h-47.5">
            No custom shelves yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default CustomShelves;
