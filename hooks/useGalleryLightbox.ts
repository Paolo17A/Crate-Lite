"use client";

import { useEffect, useState } from "react";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import type { GalleryItem } from "@/types/performer";

export function useGalleryLightbox(items: GalleryItem[]) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const locked = activeIndex !== null || showAll;

  useBodyScrollLock(locked, {
    onEscape: () => {
      if (activeIndex !== null) setActiveIndex(null);
      else setShowAll(false);
    },
  });

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setActiveIndex((i) =>
          i === null ? null : (i + 1) % items.length,
        );
      }
      if (e.key === "ArrowLeft") {
        setActiveIndex((i) =>
          i === null ? null : (i - 1 + items.length) % items.length,
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, items.length]);

  const activeItem = activeIndex !== null ? items[activeIndex] : null;

  return {
    activeIndex,
    setActiveIndex,
    showAll,
    setShowAll,
    activeItem,
  };
}
