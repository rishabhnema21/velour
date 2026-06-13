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
      className="relative order-3 w-full rounded-md border border-white/8 bg-white/8 shadow-xl shadow-black/10 sm:order-none sm:max-w-[360px] md:max-w-[420px]"
    >
      <input
        type="text"
        placeholder="Search for your next read"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="h-11 w-full bg-transparent pl-4 pr-11 text-sm text-neutral-100 outline-none placeholder:text-neutral-500"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-md text-neutral-300 transition hover:bg-white/10 hover:text-white"
        aria-label="Search"
      >
        <CiSearch className="h-5 w-5" />
      </button>
    </form>
  );
};

export default SearchBar;
