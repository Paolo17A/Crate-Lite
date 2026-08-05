"use client";

import { createPortal } from "react-dom";
import Image from "next/image";
import TextLink from "@/components/ui/TextLink";
import { useIsClient } from "@/hooks/useIsClient";
import type { GalleryItem } from "@/types/performer";

type Props = {
  open: boolean;
  name: string;
  items: GalleryItem[];
  activeIndex: number;
  activeItem: GalleryItem;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export default function GalleryPreviewDialog({
  open,
  name,
  items,
  activeIndex,
  activeItem,
  onClose,
  onPrevious,
  onNext,
}: Props) {
  const mounted = useIsClient();

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-210 flex items-center justify-center bg-espresso/90 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={
        activeItem.type === "video" ? "Video player" : "Image preview"
      }
      onClick={onClose}
    >
      <TextLink
        label="Close"
        onClick={onClose}
        uppercase
        className="absolute top-4 right-4 z-20"
      />

      {items.length > 1 && (
        <>
          <button
            type="button"
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-sand/15 px-3 py-2 text-sand backdrop-blur-sm transition hover:bg-sand/25 sm:left-6"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
          >
            ‹
          </button>
          <button
            type="button"
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-sand/15 px-3 py-2 text-sand backdrop-blur-sm transition hover:bg-sand/25 sm:right-6"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
          >
            ›
          </button>
        </>
      )}

      <div
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        {activeItem.type === "video" ? (
          <div className="overflow-hidden rounded-lg bg-espresso shadow-lg">
            <div className="relative aspect-video w-full">
              <iframe
                key={activeItem.youtubeId}
                src={`https://www.youtube.com/embed/${activeItem.youtubeId}?autoplay=1&rel=0`}
                title={activeItem.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
            <p className="px-4 py-3 text-sm text-sand/80">{activeItem.title}</p>
          </div>
        ) : (
          <div className="relative h-[70vh] w-full">
            <Image
              src={activeItem.src}
              alt={`${name} preview ${activeIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
        )}
      </div>

      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-sand/70">
        {activeIndex + 1} / {items.length}
      </p>
    </div>,
    document.body,
  );
}
