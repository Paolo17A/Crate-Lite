"use client";

import { Suspense, useEffect, useState } from "react";
import CrateLogo from "@/components/shared/CrateLogo";
import SearchBar from "@/components/shared/SearchBar";

export default function HomeStickyNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home-hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-8% 0px 0px 0px" },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-sand/95 shadow-md backdrop-blur-sm transition-all duration-500 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-full opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:gap-6 sm:px-6 sm:py-3.5">
        <CrateLogo priority />
        <div className="min-w-0 flex-1">
          <Suspense fallback={null}>
            <SearchBar id="sticky-search" compact />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
