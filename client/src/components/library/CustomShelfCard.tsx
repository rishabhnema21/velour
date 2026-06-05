import { CiMenuKebab } from "react-icons/ci";
import type { LibraryShelf } from "@/hooks/useLibraryOverview";
import { formatBookCount, formatShelfName } from "./libraryUtils";

type CustomShelfCardProps = {
  shelf: LibraryShelf;
};

const CustomShelfCard = ({ shelf }: CustomShelfCardProps) => {
  const shelfName = formatShelfName(shelf.name);

  return (
    <article className="relative min-h-42 overflow-hidden rounded-xl border border-white/8 bg-[#0d1012]/85 p-4 shadow-xl shadow-black/20 sm:min-h-47.5 sm:p-5">
      <button
        type="button"
        className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-md text-neutral-400 transition hover:bg-white/10 hover:text-white"
        aria-label={`Open ${shelfName} shelf menu`}
      >
        <CiMenuKebab className="h-5 w-5" />
      </button>
      <div className="h-20 rounded-md border border-white/8 bg-[linear-gradient(135deg,rgba(157,240,189,0.1),rgba(255,255,255,0.04)_45%,rgba(244,199,108,0.1))] sm:h-24" />
      <h3 className="mt-4 font-semibold text-white">{shelfName}</h3>
      <p className="mt-1 text-sm text-neutral-400">
        {formatBookCount(shelf.bookCount)}
      </p>
    </article>
  );
};

export default CustomShelfCard;
