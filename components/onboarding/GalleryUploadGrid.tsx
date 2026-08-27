"use client";

import { useRef, useState, type DragEvent } from "react";
import { fieldClass, labelClass } from "@/components/onboarding/fieldStyles";
import {
  GALLERY_ACCEPT,
  GALLERY_DRAG_PREFIX,
  GALLERY_DRAG_TYPE,
  usePerformerGallery,
} from "@/hooks/usePerformerGallery";
import { galleryPreviewSrc } from "@/lib/performer-onboarding";
import type { OnboardingGalleryCard } from "@/types/performer-onboarding";

type GalleryControls = ReturnType<typeof usePerformerGallery>;

type Props = GalleryControls;

function PlayBadge() {
  return (
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
  );
}

function GalleryCard({
  item,
  onRemove,
  onReorder,
}: {
  item: OnboardingGalleryCard;
  onRemove: (id: string) => void;
  onReorder: (fromId: string, toId: string) => void;
}) {
  const preview = galleryPreviewSrc(item);
  const isVideo = item.type === "video";
  const isUploadVideo = isVideo && item.source === "upload";

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData(GALLERY_DRAG_TYPE, `${GALLERY_DRAG_PREFIX}${item.id}`);
        e.dataTransfer.effectAllowed = "move";
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const raw = e.dataTransfer.getData(GALLERY_DRAG_TYPE);
        if (raw.startsWith(GALLERY_DRAG_PREFIX)) {
          onReorder(raw.slice(GALLERY_DRAG_PREFIX.length), item.id);
        }
      }}
      className="group relative aspect-square cursor-grab overflow-hidden rounded-xl border border-stone bg-sand active:cursor-grabbing"
    >
      {isUploadVideo ? (
        <video
          src={item.src}
          muted
          playsInline
          className="h-full w-full object-cover"
        />
      ) : (
        // Blob URLs and YouTube thumbs are not always valid next/image sources.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt=""
          className="h-full w-full object-cover"
          draggable={false}
        />
      )}
      {isVideo ? <PlayBadge /> : null}
      <button
        type="button"
        onClick={() => onRemove(item.id)}
        className="absolute right-2 top-2 rounded-full bg-burnt-orange px-3 py-1 text-xs font-semibold text-sand shadow-sm transition-colors hover:bg-burnt-orange/90"
      >
        Remove
      </button>
    </div>
  );
}

export default function GalleryUploadGrid({
  items,
  youtubeUrl,
  setYoutubeUrl,
  youtubeError,
  addFiles,
  addYoutube,
  remove,
  reorder,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dropping, setDropping] = useState(false);

  const onFileDrop = (e: DragEvent) => {
    e.preventDefault();
    setDropping(false);
    const raw = e.dataTransfer.getData(GALLERY_DRAG_TYPE);
    if (raw.startsWith(GALLERY_DRAG_PREFIX)) return;
    if (e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <span className={labelClass}>Photos and clips</span>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragEnter={(e) => {
            e.preventDefault();
            if ([...e.dataTransfer.types].includes("Files")) setDropping(true);
          }}
          onDragLeave={() => setDropping(false)}
          onDragOver={(e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "copy";
          }}
          onDrop={onFileDrop}
          className={`flex w-full flex-col items-center justify-center rounded-xl border border-dashed px-4 py-8 text-center text-sm transition-colors ${
            dropping
              ? "border-burnt-orange bg-burnt-orange/10 text-espresso"
              : "border-stone bg-sand text-espresso/55"
          }`}
        >
          Drop photos or MP4s here, or click to browse.
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={GALLERY_ACCEPT}
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="onboarding-youtube">
          YouTube link
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id="onboarding-youtube"
            className={fieldClass}
            placeholder="https://www.youtube.com/watch?v=…"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addYoutube();
              }
            }}
          />
          <button
            type="button"
            onClick={() => addYoutube()}
            className="shrink-0 rounded-full bg-burnt-orange px-5 py-2.5 text-sm font-semibold text-sand transition-colors hover:bg-burnt-orange/90"
          >
            Add
          </button>
        </div>
        {youtubeError ? (
          <p className="mt-1.5 text-xs text-burnt-orange">{youtubeError}</p>
        ) : null}
      </div>

      {items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-stone bg-sand px-4 py-6 text-center text-sm text-espresso/55">
          Add at least one photo, MP4, or YouTube link to continue.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {items.map((item) => (
            <GalleryCard
              key={item.id}
              item={item}
              onRemove={remove}
              onReorder={reorder}
            />
          ))}
        </div>
      )}
    </div>
  );
}
