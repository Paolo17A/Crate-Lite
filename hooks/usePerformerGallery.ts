"use client";

import { useRef, useState } from "react";
import type { OnboardingGalleryCard } from "@/types/performer-onboarding";
import { parseYoutubeId } from "@/lib/youtube";

const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const VIDEO_TYPES = new Set(["video/mp4"]);
const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;
const VIDEO_EXT = /\.mp4$/i;

export const GALLERY_ACCEPT = "image/jpeg,image/png,image/webp,video/mp4";
export const GALLERY_DRAG_TYPE = "text/plain";
export const GALLERY_DRAG_PREFIX = "gallery:";

type Props = {
  items: OnboardingGalleryCard[];
  onChange: (items: OnboardingGalleryCard[]) => void;
};

function classifyFile(file: File): "image" | "video" | null {
  if (IMAGE_TYPES.has(file.type) || IMAGE_EXT.test(file.name)) return "image";
  if (VIDEO_TYPES.has(file.type) || VIDEO_EXT.test(file.name)) return "video";
  return null;
}

function revokeBlobSrc(src: string | undefined) {
  if (src?.startsWith("blob:")) {
    URL.revokeObjectURL(src);
  }
}

export function usePerformerGallery({ items, onChange }: Props) {
  const [youtubeUrl, setYoutubeUrlState] = useState("");
  const [youtubeError, setYoutubeError] = useState("");
  const filesRef = useRef(new Map<string, File>());
  const itemsRef = useRef(items);
  itemsRef.current = items;

  const setYoutubeUrl = (value: string) => {
    setYoutubeUrlState(value);
    if (youtubeError) setYoutubeError("");
  };

  const addFiles = (list: FileList | File[]) => {
    const next: OnboardingGalleryCard[] = [];
    for (const file of Array.from(list)) {
      const kind = classifyFile(file);
      if (!kind) continue;
      const id = crypto.randomUUID();
      const src = URL.createObjectURL(file);
      filesRef.current.set(id, file);
      if (kind === "image") {
        next.push({ id, type: "image", src });
      } else {
        next.push({ id, type: "video", source: "upload", src });
      }
    }
    if (next.length === 0) return;
    onChange([...itemsRef.current, ...next]);
  };

  const addYoutube = (rawUrl = youtubeUrl) => {
    const id = parseYoutubeId(rawUrl);
    if (!id) {
      setYoutubeError("Enter a valid YouTube URL.");
      return false;
    }
    const duplicate = itemsRef.current.some(
      (item) =>
        item.type === "video" &&
        item.source === "youtube" &&
        parseYoutubeId(item.youtubeURL) === id,
    );
    if (duplicate) {
      setYoutubeError("That video is already in your gallery.");
      return false;
    }
    const card: OnboardingGalleryCard = {
      id: crypto.randomUUID(),
      type: "video",
      source: "youtube",
      youtubeURL: rawUrl.trim(),
    };
    onChange([...itemsRef.current, card]);
    setYoutubeUrl("");
    setYoutubeError("");
    return true;
  };

  const remove = (id: string) => {
    const current = itemsRef.current;
    const item = current.find((entry) => entry.id === id);
    if (item && "src" in item) {
      revokeBlobSrc(item.src);
    }
    filesRef.current.delete(id);
    onChange(current.filter((entry) => entry.id !== id));
  };

  const reorder = (fromId: string, toId: string) => {
    if (fromId === toId) return;
    const current = itemsRef.current;
    const from = current.findIndex((entry) => entry.id === fromId);
    const to = current.findIndex((entry) => entry.id === toId);
    if (from < 0 || to < 0) return;
    const next = [...current];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  };

  return {
    items,
    youtubeUrl,
    setYoutubeUrl,
    youtubeError,
    addFiles,
    addYoutube,
    remove,
    reorder,
  };
}
