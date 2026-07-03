"use client";

import Link from "next/link";
import React from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

const Navigation = () => {
  return (
    <nav
      className="w-full rounded-md font-[urbanist] px-4 py-3 flex flex-wrap justify-between items-center gap-3 md:px-4"
      style={{ color: "var(--velour-text)" }}
    >
      <Logo />
      <SearchBar />
      <div className="flex shrink-0 items-center gap-2 text-sm sm:text-base">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="cursor-pointer px-3 py-1 rounded-sm border border-[#333232] text-neutral-800 transition">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="cursor-pointer px-3 py-1 rounded-sm bg-[#202020] text-neutral-200 transition">
              Start Journey
            </button>
          </SignUpButton>
        </SignedOut>
        {/* Show the user button when the user is signed in */}
        <SignedIn>
          <Link href="/my-library" className="whitespace-nowrap">
            My Library
          </Link>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navigation;
