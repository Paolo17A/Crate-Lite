"use client";

import { createPortal } from "react-dom";
import TextLink from "@/components/ui/TextLink";
import { useIsClient } from "@/hooks/useIsClient";
import { parseYoutubeId } from "@/lib/youtube";
import type { OnboardingGalleryCard } from "@/types/performer-onboarding";

type Props = {
  open: boolean;
  items: OnboardingGalleryCard[];
  activeIndex: number;
  activeItem: OnboardingGalleryCard;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

function EnlargedMedia({ item }: { item: OnboardingGalleryCard }) {
  if (item.type === "image") {
    return (
      <div className="relative flex h-[70vh] w-full items-center justify-center">
        {/* Blob URLs are not valid next/image sources. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt="Gallery image"
          className="max-h-full max-w-full object-contain"
        />
      </div>
    );
  }

  if (item.source === "upload") {
    return (
      <div className="overflow-hidden rounded-lg bg-espresso shadow-lg">
        <video
          key={item.src}
          src={item.src}
          controls
          autoPlay
          playsInline
          className="max-h-[70vh] w-full bg-espresso"
        />
      </div>
    );
  }

  const youtubeId = parseYoutubeId(item.youtubeURL);

  return (
    <div className="overflow-hidden rounded-lg bg-espresso shadow-lg">
      <div className="relative aspect-video w-full">
        {youtubeId ? (
          <iframe
            key={youtubeId}
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : null}
      </div>
    </div>
  );
}

export default function OnboardingGalleryPreviewDialog({
  open,
  items,
  activeIndex,
  activeItem,
  onClose,
  onPrevious,
  onNext,
}: Props) {
  const mounted = useIsClient();

  if (!mounted || !open) return null;

  const isVideo = activeItem.type === "video";

  return createPortal(
    <div
      className="fixed inset-0 z-210 flex items-center justify-center bg-espresso/90 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={isVideo ? "Video player" : "Image preview"}
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
        <EnlargedMedia item={activeItem} />
      </div>

      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-sand/70">
        {activeIndex + 1} / {items.length}
      </p>
    </div>,
    document.body,
  );
}
