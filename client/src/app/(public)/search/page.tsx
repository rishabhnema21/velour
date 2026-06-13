"use client";

import React, { Suspense, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import BookCard from '@/components/book/BookCard';
import { searchBooks } from '@/lib/apifetch/book';
import { useQuery } from "@tanstack/react-query";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

const SearchContent = () => {
  const searchParams = useSearchParams()
  const query = searchParams.get("q")?.trim() || "";

const { data: books = [], isLoading, isError, error } = useQuery({
  queryKey: ["books", query],
  queryFn: () => searchBooks(query),
  enabled: !!query,
});  

  return (
    <div className='px-4 md:px-10 pt-20 min-h-screen font-[urbanist] text-neutral-200'>
      <div className='mb-8'>
        <h1 className='text-3xl md:text-4xl font-semibold'>
          Search results{query ? ` for "${query}"` : ""}
        </h1>
        <p className='text-sm text-[#6c6c6c] mt-1'>
          {query ? "Browse the books we found for your search." : "Type a search in the top bar to get started."}
        </p>
      </div>

      {isLoading && (
        <div className='text-lg'>Loading books...</div>
      )}

      {isError && (
        <div className='text-red-600'>
          {(error as Error).message}
        </div>
      )}

      {isLoading && isError && query && books.length === 0 && (
        <div>No books found for this search.</div>
      )}

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-4'>
        {books.map((book) => {
          const cover = book.thumbnail || book.smallThumbnail || "/book.jfif"
          return (
            <BookCard key={book.id} id={book.id} cover={cover} title={book.title} authors={book.authors} description={book.description} />
          )
        })}
      </div>
    </div>
  )
}

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className='px-4 md:px-10 pt-20 min-h-screen font-[urbanist] text-neutral-200'>
          Loading search...
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  )
}

export default Page
