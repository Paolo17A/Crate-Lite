"use client";

import { usePathname, useRouter } from "next/navigation";
import CrateLogo from "@/components/shared/CrateLogo";
import SearchBar from "@/components/shared/SearchBar";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  // Home page uses HomeStickyNav instead
  if (pathname === "/") return null;

  const isBookingPage = /^\/book\/[^/]+/.test(pathname);

  return (
    <header className="sticky top-0 z-50 bg-sand/95 shadow-sm backdrop-blur-sm">
      <div className="flex w-full items-center">
        {isBookingPage && (
          <button
            type="button"
            onClick={() => router.back()}
            className="flex shrink-0 items-center self-stretch px-3 text-sm font-medium text-burnt-orange transition-opacity hover:opacity-80 landscape:px-4"
            aria-label="Go back"
          >
            <span aria-hidden="true">←</span>
            <span className="ml-1.5 hidden sm:inline landscape:inline">
              Go Back
            </span>
          </button>
        )}
        <div
          className={`mx-auto flex min-w-0 flex-1 items-center gap-3 py-3 sm:gap-5 sm:py-3.5 ${
            isBookingPage
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
