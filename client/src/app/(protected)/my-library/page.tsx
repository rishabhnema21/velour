import Image from "next/image";
import { CiCircleCheck, CiEdit, CiMenuKebab } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { IoBookOutline, IoPauseOutline } from "react-icons/io5";
import { LuHourglass, LuX } from "react-icons/lu";

const defaultShelves = [
  {
    name: "Currently Reading",
    count: "4 books",
    icon: IoBookOutline,
    tone: "bg-[#583b10] text-[#f4c76c]",
    image: "/library.jfif",
    progress: true,
  },
  {
    name: "To Be Read",
    count: "12 books",
    icon: LuHourglass,
    tone: "bg-[#3b2b5c] text-[#d6c2ff]",
    image: "/book.jfif",
  },
  {
    name: "Read",
    count: "37 books",
    icon: CiCircleCheck,
    tone: "bg-[#1f4f37] text-[#9df0bd]",
    image: "/heroImage.jpg",
  },
  {
    name: "DNF",
    count: "3 books",
    icon: LuX,
    tone: "bg-[#5c2628] text-[#ffaaa8]",
    image: "/image.jfif",
  },
  {
    name: "On Hold",
    count: "2 books",
    icon: IoPauseOutline,
    tone: "bg-[#6b4214] text-[#ffd184]",
    image: "/custom-shelves.jfif",
  },
];

const customShelves = [
  { name: "Philosophy", count: "8 books", image: "/custom-shelves.jfif" },
  { name: "Favorites", count: "15 books", image: "/mesh.png" },
  { name: "2025 Goals", count: "6 books", image: "/library.jfif" },
  { name: "Poetry", count: "9 books", image: "/book.jfif" },
];

const recentBooks = [
  "/library.jfif",
  "/book.jfif",
  "/custom-shelves.jfif",
  "/image.jfif",
  "/heroImage.jpg",
  "/heroBg.jpg",
];

const page = () => {
  return (
    <div className="pb-2 md:pb-10">
      <section className="relative min-h-52.5 overflow-hidden rounded-xl border border-white/8 bg-[#0b0d0f] sm:min-h-57.5">
        <Image
          src="/heroImage.jpg"
          alt="Open book"
          fill
          priority
          className="object-cover object-[70%_42%] opacity-60"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#06080b_0%,rgba(6,8,11,0.88)_34%,rgba(6,8,11,0.35)_66%,rgba(6,8,11,0.72)_100%)]" />
        <div className="relative flex min-h-52.5 flex-col justify-center px-5 py-8 sm:min-h-57.5 sm:px-8 md:px-16">
          <h1 className="max-w-xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            Continue Reading
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-4 sm:mt-7 sm:gap-8">
            <p className="text-sm text-neutral-200 md:text-base">
              Pick up where you left off
            </p>
            <button
              type="button"
              className="grid h-9 w-12 place-items-center rounded-md text-2xl text-white transition hover:bg-white/10"
              aria-label="Continue reading"
            >
              &rarr;
            </button>
          </div>
        </div>
      </section>

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
          {defaultShelves.map((shelf) => {
            const Icon = shelf.icon;

            return (
              <article
                key={shelf.name}
                className="min-h-44.5 rounded-xl border border-white/8 bg-[#0d1012]/85 p-4 shadow-xl shadow-black/20 sm:min-h-51.25 sm:p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${shelf.tone}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="relative h-20 flex-1 overflow-hidden sm:h-24">
                    <Image
                      src={shelf.image}
                      alt=""
                      width={220}
                      height={120}
                      className="h-full w-full rounded-md object-cover object-left"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-[#0d1012]" />
                  </div>
                </div>
                <div className="mt-5">
                  <h3 className="font-semibold text-white">{shelf.name}</h3>
                  <p className="mt-1 text-sm text-neutral-400">{shelf.count}</p>
                  {shelf.progress && (
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[38%] rounded-full bg-[#f0c978]" />
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

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

          {customShelves.map((shelf) => (
            <article
              key={shelf.name}
              className="relative min-h-42 overflow-hidden rounded-xl border border-white/8 bg-[#0d1012]/85 p-4 shadow-xl shadow-black/20 sm:min-h-47.5 sm:p-5"
            >
              <button
                type="button"
                className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-md text-neutral-400 transition hover:bg-white/10 hover:text-white"
                aria-label={`Open ${shelf.name} shelf menu`}
              >
                <CiMenuKebab className="h-5 w-5" />
              </button>
              <div className="relative h-20 overflow-hidden rounded-md sm:h-24">
                <Image
                  src={shelf.image}
                  alt=""
                  fill
                  className="object-cover object-left opacity-85"
                />
                <div className="absolute inset-0 bg-linear-to-r from-transparent to-[#0d1012]" />
              </div>
              <h3 className="mt-4 font-semibold text-white">{shelf.name}</h3>
              <p className="mt-1 text-sm text-neutral-400">{shelf.count}</p>
            </article>
          ))}
        </div>
      </section>

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
          {recentBooks.map((book, index) => (
            <div
              key={`${book}-${index}`}
              className="aspect-5/7 overflow-hidden rounded-md bg-white/5"
            >
              <Image
                src={book}
                alt=""
                width={240}
                height={336}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default page;
