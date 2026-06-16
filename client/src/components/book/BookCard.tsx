"use client";

import { useBookDrawerStore } from "@/store/BookDrawerStore";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
type BookCardProps = {
  id: string;
  cover: string;
  title: string;
  authors: string[];
  description: string | null;
};

const BookCard = ({
  id,
  cover,
  title,
  authors,
  description,
}: BookCardProps) => {
  const router = useRouter();
  const { openDrawer } = useBookDrawerStore();
  return (
    <div
      onClick={() => openDrawer(id)}
      className="overflow-hidden relative group p-2 flex flex-col items-center"
    >
      <div className="absolute top-2 right-2">
        <EllipsisVertical />
      </div>
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
      <div className="py-2 tracking-tight text-center">
        <h2
          className="text-lg font-semibold"
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
