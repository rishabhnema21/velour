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
import HighlightModal from "@/components/modals/HighlightModal";

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
    return (
      <div
        className="min-h-screen"
        style={{ backgroundColor: "var(--velour-surface)" }}
      />
    );
  }

  return (
    <div
      className="min-h-screen font-[urbanist]"
      style={{
        backgroundColor: "var(--velour-surface)",
        color: "var(--velour-text)",
      }}
    >
      {/* sidebar */}
      <aside
        className="hidden md:flex fixed inset-y-0 left-0 z-30 w-52 flex-col border-r"
        style={{
          backgroundColor: "var(--velour-surface)",
          borderColor: "var(--velour-border)",
        }}
      >
        <div
          className="flex h-14 shrink-0 items-center px-4 border-b"
          style={{
            borderColor: "var(--velour-border)",
          }}
        >
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
                className="flex h-10 items-center gap-3 rounded-lg px-3 text-sm transition"
                style={{
                  backgroundColor: isActive
                    ? "var(--velour-accent)"
                    : "transparent",
                  color: isActive
                    ? "var(--velour-surface)"
                    : "var(--velour-text-muted)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (
                      e.currentTarget as HTMLAnchorElement
                    ).style.backgroundColor = "var(--velour-surface-tertiary)";
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "var(--velour-text)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (
                      e.currentTarget as HTMLAnchorElement
                    ).style.backgroundColor = "transparent";
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "var(--velour-text-muted)";
                  }
                }}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div
          className="space-y-1 border-t p-2 pb-4"
          style={{
            borderColor: "var(--velour-border)",
          }}
        >
          <Link
            href="/settings"
            className="flex h-10 items-center gap-3 rounded-lg px-3 text-sm transition"
            style={{ color: "var(--velour-text-muted)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "var(--velour-surface-tertiary)";
              (e.currentTarget as HTMLAnchorElement).style.color =
                "var(--velour-text)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "transparent";
              (e.currentTarget as HTMLAnchorElement).style.color =
                "var(--velour-text-muted)";
            }}
          >
            <CiSettings className="h-5 w-5" />
            Settings
          </Link>
          <button
            type="button"
            onClick={() => signOut()}
            className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm transition"
            style={{ color: "var(--velour-text-muted)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "var(--velour-surface-tertiary)";
              (e.currentTarget as HTMLButtonElement).style.color =
                "var(--velour-text)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "transparent";
              (e.currentTarget as HTMLButtonElement).style.color =
                "var(--velour-text-muted)";
            }}
          >
            <CiLogout className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* header */}
      <header
        className="fixed top-0 left-0 right-0 md:left-52 z-40 h-14 border-b backdrop-blur-xl flex items-center px-4 gap-4"
        style={{
          backgroundColor: "rgba(253, 252, 251, 0.8)",
          borderColor: "var(--velour-border)",
        }}
      >
        <SearchBar />
        <div className="ml-auto">
          <UserButton />
        </div>
      </header>

      {/* mobile bottom nav */}
      <nav
        className="fixed inset-x-0 bottom-0 z-30 flex md:hidden border-t px-2 py-2"
        style={{
          backgroundColor: "var(--velour-surface)",
          borderColor: "var(--velour-border)",
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-1 flex-col items-center gap-1 rounded-lg py-2 text-[10px] transition"
              style={{
                color: isActive
                  ? "var(--velour-accent)"
                  : "var(--velour-text-muted)",
              }}
            >
              <Icon className="h-5 w-5" />
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
      <HighlightModal />
    </div>
  );
};

export default ProtectedLayout;
