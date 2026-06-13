"use client";

import type { LibraryShelf } from "@/hooks/useLibraryOverview";
import CreateShelfCard from "./CreateShelfCard";
import ShelfCard from "./ShelfCard";
import CustomShelfSkeleton from "./CustomShelfSkeleton";
import { useState } from "react";
import { CreateShelfModal } from "../modals/CreateShelfModal";

type CustomShelvesProps = {
  shelves: LibraryShelf[];
  loading: boolean;
  onShelfCreated?: () => void | Promise<void>;
};

const CustomShelves = ({
  shelves,
  loading,
  onShelfCreated,
}: CustomShelvesProps) => {
  const [isCreateShelfOpen, setIsCreateShelfOpen] = useState(false);

  return (
    <section className="mt-7">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2
            className="text-lg font-semibold"
            style={{ color: "var(--velour-text)" }}
          >
            Custom Shelves
          </h2>
          <p className="text-sm" style={{ color: "var(--velour-text-muted)" }}>
            Shelves you created
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-3 rounded-md px-2 py-1 text-sm transition"
          style={{ color: "var(--velour-text-muted)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "var(--velour-surface-tertiary)";
            (e.currentTarget as HTMLButtonElement).style.color =
              "var(--velour-text)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "transparent";
            (e.currentTarget as HTMLButtonElement).style.color =
              "var(--velour-text-muted)";
          }}
        >
          See all
          <span className="text-xl leading-none">&rsaquo;</span>
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-4">
        <CreateShelfCard onClick={() => setIsCreateShelfOpen(true)} />
        <CreateShelfModal
          open={isCreateShelfOpen}
          onOpenChange={setIsCreateShelfOpen}
          onCreated={onShelfCreated}
        />

        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <CustomShelfSkeleton key={index} />
            ))
          : shelves.map((shelf) => <ShelfCard key={shelf.id} shelf={shelf} />)}

        {!loading && shelves.length === 0 && (
          <div
            className="flex min-h-40 items-center rounded-lg border p-5 text-sm sm:min-h-47.5"
            style={{
              backgroundColor: "var(--velour-surface-secondary)",
              borderColor: "var(--velour-border)",
              color: "var(--velour-text-muted)",
            }}
          >
            No custom shelves yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default CustomShelves;
