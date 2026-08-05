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
      <div className="flex w-full items-center">
        {bookingPerformerId && (
          <Link
            href={`/performers/${bookingPerformerId}`}
            className="flex shrink-0 items-center self-stretch px-3 text-sm font-medium text-burnt-orange transition-opacity hover:opacity-80 landscape:px-4"
            aria-label="Go back"
          >
            <span aria-hidden="true">←</span>
            <span className="ml-1.5 hidden sm:inline landscape:inline">
              Go Back
            </span>
          </Link>
        )}
        <div
          className={`mx-auto flex min-w-0 flex-1 items-center gap-3 py-3 sm:gap-5 sm:py-3.5 ${
            bookingPerformerId
              ? "pr-3 sm:pr-6 lg:pr-10"
              : "px-3 sm:px-6 lg:px-10"
          } max-w-7xl`}
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
