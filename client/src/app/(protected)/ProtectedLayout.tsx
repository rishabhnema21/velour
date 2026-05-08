"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  CiBookmark,
  CiCompass1,
  CiLogout,
  CiSettings,
} from "react-icons/ci";
import { FaRegChartBar, FaRegLightbulb } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";
import { RiDoubleQuotesL } from "react-icons/ri";

const navItems = [
  { label: "Library", href: "/my-library", icon: IoBookOutline },
  { label: "Discover", href: "/discover", icon: CiCompass1 },
  { label: "Bookmarks", href: "/bookmarks", icon: CiBookmark },
  { label: "Highlights", href: "/highlights", icon: RiDoubleQuotesL },
  { label: "Stats", href: "/stats", icon: FaRegChartBar },
];

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#030508] text-neutral-100 font-[urbanist]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_24%_14%,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_78%_5%,rgba(197,146,76,0.08),transparent_24%)]" />
      <div className="relative flex min-h-screen gap-5 px-3 pb-24 pt-28 sm:px-4 md:pb-5 lg:px-6">
        <aside className="fixed inset-x-3 bottom-3 z-30 rounded-xl border border-white/8 bg-[#0d1012]/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl md:sticky md:top-24 md:h-[calc(100vh-116px)] md:w-[240px] md:self-start md:p-3">
          <nav className="grid grid-cols-5 gap-1 md:block md:space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex h-12 min-w-0 flex-col items-center justify-center gap-1 rounded-lg px-2 text-[11px] transition md:flex-row md:justify-start md:gap-3 md:px-3 md:text-sm ${
                    isActive
                      ? "bg-white/8 text-white shadow-inner shadow-white/5"
                      : "text-neutral-400 hover:bg-white/5 hover:text-white"
                  }`}
                  aria-label={item.label}
                >
                  <Icon
                    className={`h-5 w-5 shrink-0 md:h-6 md:w-6 ${
                      isActive ? "text-[#f0c978]" : "text-neutral-400"
                    }`}
                  />
                  <span className="max-w-full truncate md:inline">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden space-y-2 border-t border-white/8 pt-4 md:block">
            <Link
              href="/settings"
              className="flex h-11 items-center justify-center gap-3 rounded-lg px-3 text-sm text-neutral-400 transition hover:bg-white/5 hover:text-white md:justify-start"
              aria-label="Settings"
            >
              <CiSettings className="h-6 w-6" />
              <span className="hidden md:inline">Settings</span>
            </Link>
            <button
              type="button"
              className="flex h-11 w-full items-center justify-center gap-3 rounded-lg px-3 text-sm text-neutral-400 transition hover:bg-white/5 hover:text-white md:justify-start"
              aria-label="Logout"
            >
              <CiLogout className="h-6 w-6" />
              <span className="hidden md:inline">Logout</span>
            </button>
            <div className="hidden h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#111417] text-xl font-semibold text-white md:flex">
              <FaRegLightbulb className="h-5 w-5 text-[#f0c978]" />
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default ProtectedLayout;
