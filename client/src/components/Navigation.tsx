"use client";

import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { CiSearch } from "react-icons/ci";

const Navigation = () => {
  const router = useRouter()
  const [query, setQuery] = useState("")

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    router.push(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  return (
    <nav className='w-[97%] rounded-md text-neutral-200 font-[urbanist] mt-3 px-3 py-3 flex flex-wrap justify-between items-center gap-3 md:px-4'>
        <div className='shrink-0'>
            <Link href="/" className='text-2xl font-semibold tracking-tight'>velour.</Link>
        </div>
        <form
          onSubmit={handleSearch}
          className='relative order-3 w-full rounded-md border border-white/8 bg-white/8 shadow-xl shadow-black/10 sm:order-none sm:max-w-[360px] md:max-w-[420px]'
        >
            <input
              type="text"
              placeholder='Search for your next read'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className='h-11 w-full bg-transparent pl-4 pr-11 text-sm text-neutral-100 outline-none placeholder:text-neutral-500'
            />
            <button
              type="submit"
              className='absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-md text-neutral-300 transition hover:bg-white/10 hover:text-white'
              aria-label='Search'
            >
              <CiSearch className='h-5 w-5' />
            </button>
        </form>
        <div className='flex shrink-0 items-center gap-3 text-sm sm:text-base'>
            <SignedOut>
                <SignInButton mode='modal' />
                <SignUpButton mode='modal'>
                  <button className="bg-[#302f2f] cursor-pointer text-[#ededed] px-3 py-1 rounded-sm">
                    Start Journey
                  </button>
                </SignUpButton>
              </SignedOut>
              {/* Show the user button when the user is signed in */}
              <SignedIn>
                <Link href="/my-library" className='whitespace-nowrap'>My Library</Link>
                <UserButton />
              </SignedIn>
        </div>
    </nav>
  )
}

export default Navigation
