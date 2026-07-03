"use client";

import { useDeleteHighlight } from "@/hooks/useHighlight";
import { Highlight } from "@/lib/apifetch/highlight";
import { useHighlightModalStore } from "@/store/HighlightModalStore";
import { Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";
import { VscKebabVertical } from "react-icons/vsc";

type QuoteProps = {
  highlight: Highlight;
};

const Quote = ({ highlight }: QuoteProps) => {
  const [menu, setMenu] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const { openEditModal } = useHighlightModalStore();
  const { mutate: deleteHighlight, isPending: isDeleting } = useDeleteHighlight();

  const handleEdit = () => {
    openEditModal(highlight);
    setMenu(false);
  };

  const handleDelete = () => {
    deleteHighlight(highlight.id, {
      onSuccess: () => {
        setConfirmingDelete(false);
        setMenu(false);
      },
    });
  };

  return (
    <div className="rounded-sm relative hover:border-neutral-500 transition-all duration-200 ease-in break-inside-avoid border-l-4 border-l-neutral-800 border border-neutral-300 px-5 py-4 w-full">
      <button
        onClick={() => {
          setMenu((prev) => !prev);
          setConfirmingDelete(false);
        }}
        className="absolute top-1 right-1 rounded-sm p-0.5 hover:bg-neutral-200 transition-all duration-200"
      >
        <div
          className={`transition-all duration-200 ${
            menu ? "rotate-90 scale-110" : "rotate-0 scale-100"
          }`}
        >
          {menu ? <X size={18} /> : <VscKebabVertical size={18} />}
        </div>
      </button>

      {menu && (
        <div
          className="
      absolute right-2 top-9 z-50
      w-52 overflow-hidden
      rounded-md border border-neutral-200
      bg-white/95 backdrop-blur-md
      shadow-[0_10px_40px_rgba(0,0,0,0.12)]
      animate-in fade-in zoom-in-95 duration-150
    "
        >
          {!confirmingDelete ? (
            <>
              <button
                onClick={handleEdit}
                className="
            flex w-full items-center gap-3
            px-4 py-3 text-sm font-medium
            text-neutral-700
            cursor-pointer
            transition-colors
            hover:bg-neutral-100
          "
              >
                <Pencil size={16} />
                <span>Edit Highlight</span>
              </button>

              <div className="mx-2 h-px bg-neutral-200" />

              <button
                onClick={() => setConfirmingDelete(true)}
                className="
            flex w-full items-center gap-3
            px-4 py-3 text-sm font-medium
            text-red-600
            cursor-pointer
            transition-colors
            hover:bg-red-50
          "
              >
                <Trash2 size={16} />
                <span>Delete Highlight</span>
              </button>
            </>
          ) : (
            <div className="p-6 space-y-2">
              <p className="text-sm text-neutral-600">Delete this highlight?</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setConfirmingDelete(false)}
                  disabled={isDeleting}
                  className="flex-1 rounded-md border border-neutral-200 py-1.5 text-sm text-neutral-600 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-1 rounded-md bg-red-600 py-1.5 text-sm text-white hover:bg-red-700 disabled:opacity-50"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <blockquote className="font-[serif] italic text-neutral-800 text-xl">
        &ldquo;{highlight.quote}&rdquo;
      </blockquote>

      {highlight.note && (
        <div className="my-2 bg-neutral-100 p-2 rounded-sm">
          <p className="text-neutral-500 text-sm">{highlight.note}</p>
        </div>
      )}

      <div className="flex justify-between mt-3 items-end">
        <div>
          <h3 className="font-semibold text-neutral-800">
            {highlight.userBook?.book.title}
          </h3>
          <h4 className="text-sm font-semibold text-neutral-600">
            {highlight.userBook?.book?.authors?.join(", ")}
          </h4>
        </div>
        <div>
          {highlight.pageNumber && (
            <span className="text-xs italic font-[serif] text-neutral-400">
              p. {highlight.pageNumber}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quote;
