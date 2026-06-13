import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

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
        placeholder="Search for your next read"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="h-11 w-full pl-4 pr-11 text-sm bg-neutral-300/60 rounded-sm text-neutral-800 outline-none placeholder:text-neutral-500"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-md text-neutral-800 transition hover:bg-white/10 hover:text-neutral-900 pointer-cursor"
        aria-label="Search"
      >
        <CiSearch className="h-5 w-5" />
      </button>
    </form>
  );
};

export default SearchBar;
