"use client";

import { useBook } from "@/hooks/useBook";
import { useBookDrawerStore } from "@/store/BookDrawerStore";
import Image from "next/image";

const BookDrawer = () => {
  const { selectedBookId, closeDrawer, isOpen } =
    useBookDrawerStore();
  
    const { data: book, isLoading } = useBook(selectedBookId ?? '');
  return (
    <div
      className={`fixed inset-y-0 right-0 w-96 z-50 h-full bg-[#1e1d1d] text-white shadow-2xl
  transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Book Details</h2>
        </div>

        <button
          onClick={closeDrawer}
          className="px-2 py-1 text-sm bg-black hover:bg-black/80 rounded"
        >
          Close
        </button>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-64px)]">

        <div className="w-1/2 mx-auto h-48 bg-white/10 rounded-lg flex items-center justify-center">
          <Image src={book?.smallThumbnail as string} alt="book_cover" height={1000} width={1000} className="h-full w-full object-cover" />
        </div>

        <div>
          <h3 className="text-xl text-center font-bold">{book?.title}</h3>
          {book?.authors.map((author) => (
            <p className="text-sm text-center text-white/60">{author}</p>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-white/5 p-2 rounded">
            Rating: 4.5
          </div>
          <div className="bg-white/5 p-2 rounded">
            Pages: {book?.pageCount}
          </div>
          <div className="bg-white/5 p-2 rounded">
            Language: {book?.language}
          </div>
          <div className="bg-white/5 p-2 rounded">
            Publisher: {book?.publisher}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-1">Description</h4>
          <p className="text-sm text-white/70 leading-relaxed">
            {book?.description}
          </p>
        </div>

        <div className="flex gap-2 pt-2">
          <button className="flex-1 bg-[#121010] hover:bg-[#050505] py-2 rounded">
            Add to Library
          </button>
          <button className="flex-1 bg-[#121010] hover:bg-[#050505] py-2 rounded">
            Read
          </button>
        </div>

      </div>
    </div>
  );
};

export default BookDrawer;