import Image from "next/image";
import type { GalleryItem } from "@/types/performer";

type Props = {
  item: GalleryItem;
  name: string;
  index: number;
  onSelect: () => void;
};

function youtubeThumb(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export default function GalleryThumb({
  item,
  name,
  index,
  onSelect,
}: Props) {
  const isVideo = item.type === "video";
  const src = isVideo ? youtubeThumb(item.youtubeId) : item.src;
  const label = isVideo
    ? `Play ${item.title}`
    : `Preview ${name} photo ${index + 1}`;

  return (
    <button
      type="button"
      onClick={onSelect}
      className="relative aspect-square min-w-0 flex-1 overflow-hidden bg-stone/40 transition-opacity hover:opacity-90 lg:flex-none"
      aria-label={label}
    >
      <Image
        src={src}
        alt={isVideo ? item.title : `${name} gallery ${index + 1}`}
        fill
        sizes="(min-width: 1024px) 80px, 11vw"
        className="object-cover"
      />
      {isVideo && (
        <>
          <span className="absolute inset-0 bg-espresso/25" aria-hidden="true" />
          <span
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sand/95 text-espresso shadow-sm lg:h-9 lg:w-9">
              <svg
                viewBox="0 0 24 24"
                className="ml-px h-2.5 w-2.5 fill-current lg:ml-0.5 lg:h-4 lg:w-4"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </>
      )}
    </button>
  );
}
