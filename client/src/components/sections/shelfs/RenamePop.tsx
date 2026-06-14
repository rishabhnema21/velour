"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useRenameShelf } from "@/hooks/useShelfWithBooks";

type Props = {
  shelfId: string;
  currentName: string;
};

export default function RenameShelfPopover({
  shelfId,
  currentName,
}: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const renameMutation = useRenameShelf();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = name.trim();
    if (!trimmed || !shelfId) return;

    renameMutation.mutate(
      {
        shelfId,
        name: trimmed,
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
      },
    );
  };

  return (
    <div className="relative">

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-md px-3 py-2 text-sm transition"
        style={{
          backgroundColor: "var(--velour-accent)",
          color: "var(--velour-surface)",
        }}
      >
        Rename
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-2 w-72 rounded-md border p-3 shadow-lg"
          style={{
            backgroundColor: "var(--velour-surface)",
            borderColor: "var(--velour-border)",
            color: "var(--velour-text)",
          }}
        >

          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-medium">Rename Shelf</h3>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded p-1 transition"
              style={{
                color: "var(--velour-text-muted)",
              }}
            >
              <X className="h-4 w-4" />
            </button>
          </div>


          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Shelf name"
              className="w-full rounded-md border px-3 py-2 text-sm outline-none"
              style={{
                backgroundColor: "var(--velour-surface-secondary)",
                borderColor: "var(--velour-border)",
                color: "var(--velour-text)",
              }}
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md border px-3 py-2 text-sm"
                style={{
                  borderColor: "var(--velour-border)",
                  color: "var(--velour-text-muted)",
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={renameMutation.isPending}
                className="rounded-md px-3 py-2 text-sm transition disabled:opacity-50"
                style={{
                  backgroundColor: "var(--velour-accent)",
                  color: "var(--velour-surface)",
                }}
              >
                {renameMutation.isPending ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}