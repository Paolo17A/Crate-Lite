"use client";

import GalleryUploadGrid from "@/components/onboarding/GalleryUploadGrid";
import { usePerformerGallery } from "@/hooks/usePerformerGallery";
import type { PerformerOnboardingState } from "@/hooks/usePerformerOnboardingForm";

export default function PerformerGalleryStep({
  form,
}: {
  form: PerformerOnboardingState;
}) {
  const gallery = usePerformerGallery({
    items: form.gallery,
    onChange: form.setGallery,
  });

  return (
    <div className="animate-fade-up">
      <p className="mb-5 text-sm text-espresso/70">
        Add promotional photos, live clips, or a YouTube link. Drag cards to
        change the order.
      </p>
      <GalleryUploadGrid {...gallery} />
    </div>
  );
}
