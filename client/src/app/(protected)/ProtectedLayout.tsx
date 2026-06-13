"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, useClerk } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import React, { useEffect, useRef } from "react";
import { CiBookmark, CiCompass1, CiLogout, CiSettings } from "react-icons/ci";
import { FaRegChartBar } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";
import { RiDoubleQuotesL } from "react-icons/ri";
import BookDrawer from "@/components/book/BookDrawer";
import Logo from "@/components/Logo";
import SearchBar from "@/components/SearchBar";

const navItems = [
  { label: "Library", href: "/my-library", icon: IoBookOutline },
  { label: "Discover", href: "/discover", icon: CiCompass1 },
  { label: "Bookmarks", href: "/bookmarks", icon: CiBookmark },
  { label: "Highlights", href: "/highlights", icon: RiDoubleQuotesL },
  { label: "Stats", href: "/stats", icon: FaRegChartBar },
];

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { isLoaded, isSignedIn } = useAuth();
  const { openSignIn, signOut } = useClerk();
  const hasOpenedSignIn = useRef(false);

  useEffect(() => {
    if (!isLoaded || isSignedIn || hasOpenedSignIn.current) return;
    hasOpenedSignIn.current = true;
    openSignIn();
  }, [isLoaded, isSignedIn, openSignIn]);

  if (!isLoaded || !isSignedIn) {
    return <div className="min-h-screen bg-[#030508]" />;
  }

  return (
    <div className="min-h-screen bg-[#030508] text-neutral-100 font-[urbanist]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_24%_14%,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_78%_5%,rgba(197,146,76,0.08),transparent_24%)]" />

      {/* sidebar */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 z-30 w-52 flex-col border-r border-white/8 bg-[#0a0a0a]">
        <div className="flex h-14 shrink-0 items-center px-4 border-b border-white/8">
          <Logo />
        </div>

        <nav className="flex-1 space-y-1 p-2 pt-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex h-10 items-center gap-3 rounded-lg px-3 text-sm transition ${
                  isActive
                    ? "bg-white/9 text-white"
                    : "text-neutral-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon
                  className={`h-5 w-5 shrink-0 ${isActive ? "text-[#f0c978]" : "text-neutral-400"}`}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-white/8 p-2 pb-4">
          <Link
            href="/settings"
            className="flex h-10 items-center gap-3 rounded-lg px-3 text-sm text-neutral-400 transition hover:bg-white/5 hover:text-white"
          >
            <CiSettings className="h-5 w-5" />
            Settings
          </Link>
          <button
            type="button"
            onClick={() => signOut()}
            className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm text-neutral-400 transition hover:bg-white/5 hover:text-white"
          >
            <CiLogout className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* header */}
      <header className="fixed top-0 left-0 right-0 md:left-52 z-40 h-14 border-b border-white/8 bg-[#030508]/80 backdrop-blur-xl flex items-center px-4 gap-4">
        <SearchBar />
        <div className="ml-auto">
          <UserButton />
        </div>
      </header>

      {/* mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex md:hidden border-t border-white/8 bg-[#0a0a0a] px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center gap-1 rounded-lg py-2 text-[10px] transition ${
                isActive ? "text-white" : "text-neutral-500 hover:text-white"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "text-[#f0c978]" : ""}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* content */}
      <div className="pt-18 pb-20 md:pb-6 md:pl-48 px-4 md:px-0">
        <div className="px-4 md:px-6 lg:px-8">
          <main>{children}</main>
        </div>
      </div>

      <BookDrawer />
    </div>
  );
};

export default ProtectedLayout;
