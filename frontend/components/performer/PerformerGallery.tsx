"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { GalleryItem } from "@/types/performer";

type Props = {
  name: string;
  items: GalleryItem[];
};

const PREVIEW_LIMIT = 9;

function youtubeThumb(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

function GalleryThumb({
  item,
  name,
  index,
  onSelect,
}: {
  item: GalleryItem;
  name: string;
  index: number;
  onSelect: () => void;
}) {
  const isVideo = item.type === "video";
  const src = isVideo ? youtubeThumb(item.youtubeId) : item.src;
  const label = isVideo
    ? `Play ${item.title}`
    : `Preview ${name} photo ${index + 1}`;

  return (
    <button
      type="button"
      onClick={onSelect}
      className="relative aspect-square overflow-hidden bg-stone/40 transition-opacity hover:opacity-90"
      aria-label={label}
    >
      <Image
        src={src}
        alt={isVideo ? item.title : `${name} gallery ${index + 1}`}
        fill
        sizes="160px"
        className="object-cover"
      />
      {isVideo && (
        <>
          <span className="absolute inset-0 bg-espresso/25" aria-hidden="true" />
          <span
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sand/95 text-espresso shadow-sm">
              <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 fill-current">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </>
      )}
    </button>
  );
}

export default function PerformerGallery({ name, items }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [mounted, setMounted] = useState(false);

  const previewItems = items.slice(0, PREVIEW_LIMIT);
  const hasMore = items.length > PREVIEW_LIMIT;
  const activeItem = activeIndex !== null ? items[activeIndex] : null;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activeIndex === null && !showAll) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeIndex !== null) setActiveIndex(null);
        else setShowAll(false);
      }
      if (activeIndex !== null && e.key === "ArrowRight") {
        setActiveIndex((i) =>
          i === null ? null : (i + 1) % items.length,
        );
      }
      if (activeIndex !== null && e.key === "ArrowLeft") {
        setActiveIndex((i) =>
          i === null ? null : (i - 1 + items.length) % items.length,
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, showAll, items.length]);

  if (items.length === 0) return null;

  const allMediaModal =
    showAll && (
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center bg-espresso/80 p-4"
        role="dialog"
        aria-modal="true"
        aria-label="All media"
        onClick={() => setShowAll(false)}
      >
        <div
          className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-stone bg-sand p-4 sm:p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-medium text-espresso">
              All media ({items.length})
            </h2>
            <button
              type="button"
              className="text-sm text-espresso/60 transition-colors hover:text-espresso"
              onClick={() => setShowAll(false)}
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {items.map((item, i) => (
              <GalleryThumb
                key={
                  item.type === "video"
                    ? `all-video-${item.youtubeId}-${i}`
                    : `all-image-${item.src}-${i}`
                }
                item={item}
                name={name}
                index={i}
                onSelect={() => setActiveIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    );

  const previewModal =
    activeItem && activeIndex !== null && (
      <div
        className="fixed inset-0 z-[210] flex items-center justify-center bg-espresso/90 p-4"
        role="dialog"
        aria-modal="true"
        aria-label={
          activeItem.type === "video" ? "Video player" : "Image preview"
        }
        onClick={() => setActiveIndex(null)}
      >
        <button
          type="button"
          className="absolute top-4 right-4 z-20 text-sm font-medium uppercase tracking-wide text-burnt-orange underline underline-offset-4 transition-opacity hover:opacity-80"
          onClick={() => setActiveIndex(null)}
        >
          Close
        </button>

        {items.length > 1 && (
          <>
            <button
              type="button"
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-sand/15 px-3 py-2 text-sand backdrop-blur-sm transition hover:bg-sand/25 sm:left-6"
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(
                  (activeIndex - 1 + items.length) % items.length,
                );
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
                setActiveIndex((activeIndex + 1) % items.length);
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
              <p className="px-4 py-3 text-sm text-sand/80">
                {activeItem.title}
              </p>
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
      </div>
    );

  return (
    <>
      <section
        className="rounded-lg border border-stone bg-[color-mix(in_srgb,var(--color-parchment)_92%,var(--color-espresso)_8%)] p-3 sm:p-4"
        aria-label="Media gallery"
      >
        <div className="flex items-baseline justify-between gap-2 px-1">
          <h2 className="text-lg font-medium text-espresso">Photos & Videos</h2>
          {hasMore && (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="font-performer text-sm font-medium text-burnt-orange underline underline-offset-4 transition-opacity hover:opacity-80"
            >
              View all
            </button>
          )}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1 overflow-hidden rounded-md sm:gap-1.5">
          {previewItems.map((item, i) => (
            <GalleryThumb
              key={
                item.type === "video"
                  ? `preview-video-${item.youtubeId}-${i}`
                  : `preview-image-${item.src}-${i}`
              }
              item={item}
              name={name}
              index={i}
              onSelect={() => setActiveIndex(i)}
            />
          ))}
        </div>
      </section>

      {mounted &&
        createPortal(
          <>
            {allMediaModal}
            {previewModal}
          </>,
          document.body,
        )}
    </>
  );
}
