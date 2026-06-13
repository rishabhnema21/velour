"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { CiSearch } from "react-icons/ci";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

const Navigation = () => {

  return (
    <nav className="w-[97%] rounded-md text-neutral-200 font-[urbanist] mt-3 px-3 py-3 flex flex-wrap justify-between items-center gap-3 md:px-4">
      <Logo />
      <SearchBar />
      <div className="flex shrink-0 items-center gap-3 text-sm sm:text-base">
        <SignedOut>
          <SignInButton mode="modal" />
          <SignUpButton mode="modal">
            <button className="bg-[#302f2f] cursor-pointer text-[#ededed] px-3 py-1 rounded-sm">
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
