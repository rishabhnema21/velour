import Image from "next/image";
import type { LibraryOverview } from "@/hooks/useLibraryOverview";
import { formatBookCount, getBookCover } from "./libraryUtils";

type LibraryHeroProps = {
  overview: LibraryOverview;
  loading: boolean;
};

const LibraryHero = ({ overview, loading }: LibraryHeroProps) => {
  const totalBooks = overview.defaultShelves.reduce(
    (total, shelf) => total + shelf.bookCount,
    0,
  );
  const heroCover = overview.recentlyAdded[0]
    ? getBookCover(overview.recentlyAdded[0])
    : "/library.jfif";

  return (
    <section className="relative min-h-52.5 overflow-hidden rounded-xl border border-white/8 bg-[#0b0d0f] sm:min-h-57.5">
      <Image
        src={heroCover}
        alt=""
        fill
        priority
        className="object-cover object-[70%_42%] opacity-55"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#06080b_0%,rgba(6,8,11,0.9)_34%,rgba(6,8,11,0.52)_66%,rgba(6,8,11,0.8)_100%)]" />
      <div className="relative flex min-h-52.5 flex-col justify-center px-5 py-8 sm:min-h-57.5 sm:px-8 md:px-16">
        <h1 className="max-w-xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
          My Library
        </h1>
        <div className="mt-5 flex flex-wrap items-center gap-4 sm:mt-7 sm:gap-8">
          <p className="text-sm text-neutral-200 md:text-base">
            {loading
              ? "Loading your shelves..."
              : `${formatBookCount(totalBooks)} across your system shelves`}
          </p>
        </div>
      </div>
    </section>
  );
};

export default LibraryHero;
