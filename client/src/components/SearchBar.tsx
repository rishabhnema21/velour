import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative order-3 w-full rounded-md bg-white/8  sm:order-0 sm:max-w-90 md:max-w-105"
    >
      <input
        type="text"
        placeholder="Try Searching for Raag Darbari"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="py-2 w-full pl-4 pr-11  border border-neutral-300 shadow-md rounded-sm text-neutral-800 font-semibold outline-none placeholder:text-neutral-800"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 bg-grey-100 border border-neutral-200 grid px-3 py-1 -translate-y-1/2 place-items-center rounded-md text-neutral-800 transition hover:700/80 hover:text-neutral-900 pointer-cursor"
        aria-label="Search"
      >
        <kbd className="">
          <span className="mr-1">⌘</span>K
        </kbd>
      </button>
    </form>
  );
};

export default SearchBar;
