"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CrateLogo from "@/components/shared/CrateLogo";
import SearchBar from "@/components/shared/SearchBar";

export default function Header() {
  const pathname = usePathname();

  // Home page uses HomeStickyNav instead
  if (pathname === "/") return null;

  const bookingMatch = pathname.match(/^\/book\/([^/]+)/);
  const bookingPerformerId = bookingMatch?.[1] ?? null;

  return (
    <header className="sticky top-0 z-50 bg-sand/95 shadow-sm backdrop-blur-sm">
      <div className="relative">
        {bookingPerformerId && (
          <Link
            href={`/performers/${bookingPerformerId}`}
            className="absolute top-0 bottom-0 left-0 z-10 flex items-center px-3 text-sm font-medium text-burnt-orange transition-opacity hover:opacity-80 sm:px-4"
            aria-label="Go back"
          >
            <span aria-hidden="true">←</span>
            <span className="ml-1.5 hidden sm:inline">Go Back</span>
          </Link>
        )}
        <div
          className={`mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:gap-6 sm:px-6 sm:py-3.5 lg:px-10 ${
            bookingPerformerId ? "pl-10 sm:pl-28" : ""
          }`}
        >
          <CrateLogo priority />
          <div className="min-w-0 flex-1">
            <SearchBar id="nav-search" compact />
          </div>
        </div>
      </div>
    </header>
  );
}
