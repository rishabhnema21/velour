import type { LibraryOverview } from "@/hooks/useLibraryOverview";
import Image from "next/image";

type LibraryHeroProps = {
  overview: LibraryOverview;
  loading: boolean;
};

const LibraryHero = ({ overview, loading }: LibraryHeroProps) => {
  const totalBooks = overview.defaultShelves.reduce(
    (total, shelf) => total + shelf.bookCount,
    0,
  );

  return (
    <section className="relative min-h-52.5 overflow-hidden rounded-md border border-white/8 bg-neutral-300 sm:min-h-57.5">
      <Image
        src="/library.jfif"
        alt="library cover"
        fill
        priority
        className="object-cover object-top"
      />
      <div className="absolute inset-0" />
      <div className="relative flex min-h-52.5 flex-col justify-center px-5 py-8 sm:min-h-57.5 sm:px-8 md:px-16">
        <h1 className="w-full md:max-w-xl text-3xl font-semibold leading-tight tracking-normal text-white sm:text-4xl md:text-6xl text-shadow-2xs">
          My Library
        </h1>
        <div className="text-start md:text-end md:w-[25vw]">
          <blockquote className="text-neutral-200 mt-3">To understand yourself is the beginning of wisdom.</blockquote>
          <p className=" text-neutral-200 mr-4">— J. Krishnamurti</p>
        </div>
        {/* <div className="mt-5 flex flex-wrap items-center gap-4 sm:mt-3 sm:gap-8">
          <p className="text-sm text-neutral-200 md:text-base">
            {loading
              ? "Loading your shelves..."
              : `${formatBookCount(totalBooks)} across your system shelves`}
          </p>
        </div> */}
      </div>
    </section>
  );
};

export default LibraryHero;
