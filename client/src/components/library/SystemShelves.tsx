import type { LibraryShelf } from "@/hooks/useLibraryOverview";
import { CiEdit } from "react-icons/ci";
import ShelfCard from "./ShelfCard";

type SystemShelvesProps = {
  shelves: LibraryShelf[];
  loading: boolean;
};

const SystemShelves = ({ shelves, loading }: SystemShelvesProps) => {
  return (
    <section className="mt-8">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold" style={{ color: "var(--velour-text)" }}>Your Shelves</h2>
          <p className="text-sm text-neutral-500">
            Organize your books and track your reading
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 rounded-md px-2 py-1 text-sm text-neutral-400 transition hover:bg-white/5 hover:text-white"
        >
          Edit
          <CiEdit className="h-4 w-4" />
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-4">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="min-h-44.5 animate-pulse rounded-xl border border-white/8 bg-[#0d1012]/60 p-4 sm:min-h-51.25 sm:p-5"
              >
                <div className="h-10 w-10 rounded-full bg-white/10" />
                <div className="mt-16 h-4 w-2/3 rounded bg-white/10" />
                <div className="mt-3 h-3 w-1/3 rounded bg-white/8" />
              </div>
            ))
          : shelves.map((shelf) => <ShelfCard key={shelf.id} shelf={shelf} />)}
      </div>
    </section>
  );
};

export default SystemShelves;
