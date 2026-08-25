"use client";

import { createPortal } from "react-dom";
import GalleryThumb from "@/components/performer/GalleryThumb";
import { useIsClient } from "@/hooks/useIsClient";
import type { GalleryItem } from "@/types/performer";

type Props = {
  open: boolean;
  name: string;
  items: GalleryItem[];
  onClose: () => void;
  onSelectItem: (index: number) => void;
};

export default function GalleryAllMediaDialog({
  open,
  name,
  items,
  onClose,
  onSelectItem,
}: Props) {
  const mounted = useIsClient();

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-200 flex items-center justify-center bg-espresso/80 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="All media"
      onClick={onClose}
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
            onClick={onClose}
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
              onSelect={() => onSelectItem(i)}
            />
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}
