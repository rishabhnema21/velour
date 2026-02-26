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

const Navigation = () => {
  return (
    <nav className='w-[97%] rounded-md mt-3 backdrop-blur-xl px-4 py-3 flex justify-between'>
        <div>
            <h2 className='text-xl text-white tracking-wider font-light'>velour</h2>
        </div>
        <div className='flex gap-6 text-white'>
            <a href="#">home</a>
            <a href="#">about</a>
            <a href="#">library</a>
            <a href="#">panchayat</a>
        </div>
        <div className='flex gap-3 text-white'>
            <SignedOut>
                <SignInButton mode='modal' />
                <SignUpButton mode='modal'>
                  <button className="text-white">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              {/* Show the user button when the user is signed in */}
              <SignedIn>
                <UserButton />
              </SignedIn>
        </div>
    </nav>
  )
}

export default Navigation