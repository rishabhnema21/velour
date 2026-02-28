"use-client";

import Link from 'next/link'
import React from 'react'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { CiSearch } from "react-icons/ci";

const Navigation = () => {
  return (
    <nav className='w-[97%] rounded-md text-black font-[urbanist] mt-3 px-4 py-3 flex justify-between items-center'>
        <div>
            <h2 className='text-xl tracking-wide'>velour.</h2>
        </div>
        <div className='relative bg-[#fafafa] shadow-md rounded-sm'>
            <input type="text" placeholder='Search for your next read' className='py-1 pl-2 pr-24 outline-none'/>
            <button className='absolute right-2 py-2 px-1 cursor-pointer'><CiSearch /></button>
        </div>
        <div className='flex items-center gap-3'>
            <SignedOut>
                <SignInButton mode='modal' />
                <SignUpButton mode='modal'>
                  <button className="bg-[#191919] cursor-pointer text-[#ededed] px-3 py-1 rounded-sm">
                    Start Journey
                  </button>
                </SignUpButton>
              </SignedOut>
              {/* Show the user button when the user is signed in */}
              <SignedIn>
                <a href="#">My Library</a>
                <UserButton />
              </SignedIn>
        </div>
    </nav>
  )
}

export default Navigation