"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

function subscribeMedia(query: string, onStoreChange: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onStoreChange) => subscribeMedia(query, onStoreChange),
    () => window.matchMedia(query).matches,
    () => false,
  );
}

type Options = {
  compactQuery?: string;
};

export function useCompactMenu({
  compactQuery = "(max-width: 639px)",
}: Options = {}) {
  const isCompact = useMediaQuery(compactQuery);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const effectiveOpen = isCompact && menuOpen;

  useEffect(() => {
    if (!effectiveOpen) return;

    const onPointerDown = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [effectiveOpen]);

  return {
    isCompact,
    menuOpen: effectiveOpen,
    setMenuOpen,
    menuRef,
  };
}
