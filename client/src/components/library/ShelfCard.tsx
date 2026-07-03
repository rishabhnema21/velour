"use client";

import type { LibraryShelf } from "@/hooks/useLibraryOverview";
import Image from "next/image";
import Link from "next/link";
import { formatBookCount, formatShelfName } from "./libraryUtils";

type ShelfCardProps = {
  shelf: LibraryShelf;
};

const ShelfCard = ({ shelf }: ShelfCardProps) => {
  const shelfName = formatShelfName(shelf.name);

  return (
    <Link
      href={`/my-library/shelf/${shelf.id}`}
      className="h-[40vh] relative group block bg-secondary rounded-sm border border-neutral-200 p-2 shadow-md shadow-black/10 transition hover:border-neutral-400 sm:p-1"
      aria-label={`View ${shelfName} shelf`}
    >
      <div className="flex items-start h-full justify-between gap-4">
        <div className="relative h-full w-full overflow-hidden rounded-sm">
          <Image
            src={shelf.coverImage || "/placeholder.webp"}
            alt="placeholder"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      </div>
      <div className="absolute top-2 right-4">
        <p className="mt-1 text-sm text-neutral-300">
          {formatBookCount(shelf.bookCount)}
        </p>
      </div>
      <div className="mt-5 absolute bottom-3 left-3">
        <h3 className="font-semibold text-shadow-md text-3xl w-[95%] text-white">{shelfName}</h3>
      </div>
    </Link>
  );
};

export default ShelfCard;
