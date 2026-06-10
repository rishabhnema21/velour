import Link from "next/link";
import { CiCircleCheck } from "react-icons/ci";
import { IoBookOutline } from "react-icons/io5";
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
    icon: IoBookOutline,
    tone: "bg-[#6b4214] text-[#ffd184]",
  },
};

const defaultShelfStyle = {
  icon: IoBookOutline,
  tone: "bg-white/10 text-neutral-200",
};

type ShelfCardProps = {
  shelf: LibraryShelf;
};

const ShelfCard = ({ shelf }: ShelfCardProps) => {
  const style = shelf.isSystem
    ? systemShelfStyles[shelf.name] || defaultShelfStyle
    : defaultShelfStyle;
  const Icon = style.icon;
  const shelfName = formatShelfName(shelf.name);

  return (
    <Link
      href={`/my-library/shelf/${shelf.id}`}
      className="group block rounded-xl border border-white/8 bg-[#0d1012]/85 p-4 shadow-xl shadow-black/20 transition hover:border-white/20 sm:p-5"
      aria-label={`View ${shelfName} shelf`}
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
        <h3 className="font-semibold text-white">{shelfName}</h3>
        <p className="mt-1 text-sm text-neutral-400">
          {formatBookCount(shelf.bookCount)}
        </p>
      </div>
    </Link>
  );
};

export default ShelfCard;
