"use client";

import { useBookDrawerStore } from "@/store/BookDrawerStore";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMoveModalStore } from "@/store/MoveModalStore";
import { useHighlightModalStore } from "@/store/HighlightModalStore";
type BookCardProps = {
  id: string;
  cover: string;
  title: string;
  authors: string[];
  description: string | null;
  userBookId?: string;
  currentShelfIds?: string[];
};

const BookCard = ({
  id,
  cover,
  title,
  authors,
  userBookId,
  currentShelfIds,
}: BookCardProps) => {
  const router = useRouter();
  const { openDrawer } = useBookDrawerStore();
  const { openModal } = useMoveModalStore();
  const { openModal: openHighlightModal } = useHighlightModalStore();
  const [menu, setMenu] = useState(false);
  return (
    <div
      onClick={() => openDrawer(id)}
      className="overflow-hidden relative group transition-all duration-200 ease-in cursor-pointer py-1 flex flex-col items-center"
    >
      {userBookId && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute hidden group-hover:block top-2 right-7"
        >
          <button
            className="bg-neutral-200/50 text-neutral-50 rounded-full"
            onClick={() => setMenu((prev) => !prev)}
          >
            <EllipsisVertical size={20} />
          </button>

          {menu && (
            <div
              className="absolute w-36 overflow-hidden right-0 top-6 font-bold z-10 rounded-md border shadow-md"
              style={{
                backgroundColor: "var(--velour-surface)",
                borderColor: "var(--velour-border)",
              }}
            >
              <button
                type="button"
                onClick={() => {
                  openModal(userBookId!, currentShelfIds ?? []);
                  setMenu(false);
                }}
                className="px-4 h-full cursor-pointer py-2 text-sm w-full text-left hover:bg-neutral-200"
                style={{ color: "var(--velour-text)" }}
              >
                Move
              </button>
              <hr />
              <button
                className="px-4 cursor-pointer text-sm h-full py-2 w-full hover:bg-neutral-200 text-left"
                style={{ color: "var(--velour-text)" }}
              >
                Delete
              </button>

              <hr />
              <button
              type="button"
              onClick={() => {
                openHighlightModal(userBookId!);
                setMenu(false);
              }}
                className="px-4 cursor-pointer h-full py-2 text-sm w-full hover:bg-neutral-200 text-left"
                style={{ color: "var(--velour-text)" }}
              >
                Add Highlight
              </button>
            </div>
          )}
        </div>
      )}
      <div className="w-42 h-56">
        <Image
          src={cover}
          alt={title}
          height={1000}
          width={1000}
          className="object-cover h-full w-full"
          loading="eager"
        />
      </div>
      <div className="py-1 w-42 tracking-tight text-center">
        <h2
          className="text-lg font-semibold truncate"
          style={{ color: "var(--velour-text)" }}
        >
          {title}
        </h2>
        {authors && authors.length > 0 && (
          <p className="text-sm" style={{ color: "var(--velour-text-muted)" }}>
            {authors.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
};

export default BookCard;
