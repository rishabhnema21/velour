"use client";

import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image';

type Book = {
  id: string
  title: string
  authors?: string[]
  description?: string | null
  thumbnail?: string | null
  smallThumbnail?: string | null
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

const Page = () => {
  const searchParams = useSearchParams()
  const query = useMemo(() => (searchParams.get("q") || "").trim(), [searchParams])
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!query) {
      setBooks([])
      setError(null)
      return
    }

    const controller = new AbortController()
    const run = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`${API_BASE}/api/books?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          const data = await response.json().catch(() => null)
          const message = data?.message || "Failed to fetch books"
          throw new Error(message)
        }

        const data = await response.json()
        setBooks(Array.isArray(data?.books) ? data.books : [])
      } catch (err) {
        if ((err as Error).name === "AbortError") return
        setError((err as Error).message || "Something went wrong")
        setBooks([])
      } finally {
        setLoading(false)
      }
    }

    run()
    return () => controller.abort()
  }, [query])

  return (
    <div className='px-4 md:px-10 pt-20 bg-[#d0dfdf] min-h-screen font-[urbanist] text-[#191919]'>
      <div className='mb-8'>
        <h1 className='text-3xl md:text-4xl font-semibold'>
          Search results{query ? ` for "${query}"` : ""}
        </h1>
        <p className='text-sm text-[#4a4a4a] mt-1'>
          {query ? "Browse the books we found for your search." : "Type a search in the top bar to get started."}
        </p>
      </div>

      {loading && (
        <div className='text-lg'>Loading books...</div>
      )}

      {!loading && error && (
        <div className='text-red-600'>{error}</div>
      )}

      {!loading && !error && query && books.length === 0 && (
        <div>No books found for this search.</div>
      )}

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6'>
        {books.map((book) => {
          const cover = book.thumbnail || book.smallThumbnail || "/book.jfif"
          return (
            <div key={book.id} className='bg-white rounded-md  overflow-hidden'>
              <div className='h-72 bg-[#f5f5f5]'>
                <Image
                  src={cover}
                  alt={book.title}
                  height={1000}
                  width={1000}
                  className='h-full w-full object-cover'
                  loading='lazy'
                />
              </div>
              <div className='p-4'>
                <h2 className='text-lg font-semibold mb-1'>{book.title}</h2>
                {book.authors && book.authors.length > 0 && (
                  <p className='text-sm text-[#4a4a4a] mb-2'>
                    {book.authors.join(", ")}
                  </p>
                )}
                {book.description && (
                  <p className='text-sm text-[#4a4a4a] line-clamp-3'>
                    {book.description}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Page
