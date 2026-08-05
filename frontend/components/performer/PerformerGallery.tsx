"use client";

import GalleryAllMediaDialog from "@/components/performer/GalleryAllMediaDialog";
import GalleryPreviewDialog from "@/components/performer/GalleryPreviewDialog";
import GalleryThumb from "@/components/performer/GalleryThumb";
import TextLink from "@/components/ui/TextLink";
import { useGalleryLightbox } from "@/hooks/useGalleryLightbox";
import type { GalleryItem } from "@/types/performer";

type Props = {
  name: string;
  items: GalleryItem[];
};

const PREVIEW_LIMIT = 9;

export default function PerformerGallery({ name, items }: Props) {
  const {
    activeIndex,
    setActiveIndex,
    showAll,
    setShowAll,
    activeItem,
  } = useGalleryLightbox(items);

  const previewItems = items.slice(0, PREVIEW_LIMIT);
  const hasMore = items.length > PREVIEW_LIMIT;

  if (items.length === 0) return null;

  return (
    <>
      <section
        className="rounded-lg border border-stone bg-[color-mix(in_srgb,var(--color-parchment)_92%,var(--color-espresso)_8%)] p-3 sm:p-4"
        aria-label="Media gallery"
      >
        <div className="flex items-baseline justify-between gap-2 px-1">
          <h2 className="text-lg font-medium text-espresso">Photos & Videos</h2>
          {hasMore && (
            <TextLink
              label="View all"
              onClick={() => setShowAll(true)}
              className="font-performer"
            />
          )}
        </div>
        <div className="mt-3 flex gap-0.5 overflow-hidden rounded-md lg:grid lg:grid-cols-3 lg:gap-1.5">
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

      <GalleryAllMediaDialog
        open={showAll}
        name={name}
        items={items}
        onClose={() => setShowAll(false)}
        onSelectItem={setActiveIndex}
      />

      {activeItem && activeIndex !== null && (
        <GalleryPreviewDialog
          open
          name={name}
          items={items}
          activeIndex={activeIndex}
          activeItem={activeItem}
          onClose={() => setActiveIndex(null)}
          onPrevious={() =>
            setActiveIndex((activeIndex - 1 + items.length) % items.length)
          }
          onNext={() => setActiveIndex((activeIndex + 1) % items.length)}
        />
      )}
    </>
  );
}
