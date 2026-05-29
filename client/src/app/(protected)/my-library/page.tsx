"use client";

import CustomShelves from "@/components/library/CustomShelves";
import LibraryHero from "@/components/library/LibraryHero";
import RecentlyAddedBooks from "@/components/library/RecentlyAddedBooks";
import SystemShelves from "@/components/library/SystemShelves";
import { useLibraryOverview } from "@/hooks/useLibraryOverview";

const Page = () => {
  const { overview, loading, error } = useLibraryOverview();

  return (
    <div className="pb-2 md:pb-10">
      <LibraryHero overview={overview} loading={loading} />

      {error && (
        <div className="mt-6 rounded-xl border border-red-400/20 bg-red-950/30 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      )}

      <SystemShelves shelves={overview.defaultShelves} loading={loading} />
      <CustomShelves shelves={overview.customShelves} loading={loading} />
      <RecentlyAddedBooks books={overview.recentlyAdded} loading={loading} />
    </div>
  );
};

export default Page;
