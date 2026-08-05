"use client";

import PerformerBiography from "@/components/performer/PerformerBiography";
import PerformerGallery from "@/components/performer/PerformerGallery";
import type { GalleryItem } from "@/types/performer";

type Props = {
  name: string;
  biography: string;
  gallery: GalleryItem[];
};

export default function ProfileMainPanels({
  name,
  biography,
  gallery,
}: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr] lg:items-start">
      <PerformerGallery name={name} items={gallery} />
      <PerformerBiography name={name} biography={biography} fillAvailable />
    </div>
  );
}
