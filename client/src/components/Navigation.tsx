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
    <nav className='w-[97%] rounded-md text-neutral-200 font-[urbanist] mt-3 px-4 py-3 flex justify-between items-center'>
        <div>
            <h2 className='text-xl tracking-wide'>velour.</h2>
        </div>
        <form onSubmit={handleSearch} className='relative bg-[#232323] shadow-md rounded-sm'>
            <input
              type="text"
              placeholder='Search for your next read'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className='py-1 pl-1 md:pl-2 md:pr-24 outline-none'
            />
            <button type="submit" className='absolute right-2 py-2 px-1 cursor-pointer'>
              <CiSearch />
            </button>
        </form>
        <div className='flex items-center gap-3'>
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
                <Link href="/my-library">My Library</Link>
                <UserButton />
              </SignedIn>
        </div>
    </nav>
  )
}

export default Navigation
