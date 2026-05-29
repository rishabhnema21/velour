import { CiCircleCheck, CiEdit } from "react-icons/ci";
import { IoBookOutline, IoPauseOutline } from "react-icons/io5";
import { LuHourglass, LuX } from "react-icons/lu";
import type { IconType } from "react-icons";
import type { LibraryShelf } from "@/hooks/useLibraryOverview";
import { formatBookCount, formatShelfName } from "./libraryUtils";

const systemShelfStyles: Record<string, { icon: IconType; tone: string }> = {
  "CURRENTLY READING": {
    icon: IoBookOutline,
    tone: "bg-[#583b10] text-[#f4c76c]",
  },
  "TO BE READ": {
    icon: LuHourglass,
    tone: "bg-[#3b2b5c] text-[#d6c2ff]",
  },
  READ: {
    icon: CiCircleCheck,
    tone: "bg-[#1f4f37] text-[#9df0bd]",
  },
  DNF: {
    icon: LuX,
    tone: "bg-[#5c2628] text-[#ffaaa8]",
  },
  "ON HOLD": {
    icon: IoPauseOutline,
    tone: "bg-[#6b4214] text-[#ffd184]",
  },
};

type SystemShelvesProps = {
  shelves: LibraryShelf[];
  loading: boolean;
};

const SystemShelves = ({ shelves, loading }: SystemShelvesProps) => {
  return (
    <section className="mt-8">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Your Shelves</h2>
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
                className="min-h-44.5 animate-pulse rounded-xl border border-white/8 bg-[#0d1012]/85 p-4 sm:min-h-51.25 sm:p-5"
              >
                <div className="h-10 w-10 rounded-full bg-white/10" />
                <div className="mt-16 h-4 w-2/3 rounded bg-white/10" />
                <div className="mt-3 h-3 w-1/3 rounded bg-white/8" />
              </div>
            ))
          : shelves.map((shelf) => {
              const style = systemShelfStyles[shelf.name] || {
                icon: IoBookOutline,
                tone: "bg-white/10 text-neutral-200",
              };
              const Icon = style.icon;

              return (
                <article
                  key={shelf.id}
                  className="min-h-44.5 rounded-xl border border-white/8 bg-[#0d1012]/85 p-4 shadow-xl shadow-black/20 sm:min-h-51.25 sm:p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${style.tone}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="h-20 flex-1 rounded-md border border-white/8 bg-[linear-gradient(135deg,rgba(240,201,120,0.12),rgba(255,255,255,0.04)_45%,rgba(255,255,255,0.08))] sm:h-24" />
                  </div>
                  <div className="mt-5">
                    <h3 className="font-semibold text-white">
                      {formatShelfName(shelf.name)}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-400">
                      {formatBookCount(shelf.bookCount)}
                    </p>
                  </div>
                </article>
              );
            })}
      </div>
    </section>
  );
};

export default SystemShelves;
