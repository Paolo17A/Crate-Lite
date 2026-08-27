"use client";

import OnboardingGalleryPreviewDialog from "@/components/onboarding/OnboardingGalleryPreviewDialog";
import { useGalleryLightbox } from "@/hooks/useGalleryLightbox";
import type { PerformerOnboardingState } from "@/hooks/usePerformerOnboardingForm";
import { formatPeso } from "@/lib/format";
import { galleryPreviewSrc } from "@/lib/performer-onboarding";
import type { BandMember } from "@/types/performer-onboarding";

function formatMember(member: BandMember): string {
  const name = member.name.trim();
  const instrument = member.instrument.trim();
  const role = member.role.trim();
  if (instrument && role) {
    return `${name} — ${instrument} (${role})`;
  }
  if (instrument) {
    return `${name} — ${instrument}`;
  }
  if (role) {
    return `${name} (${role})`;
  }
  return name;
}

export default function ReviewStep({
  form,
}: {
  form: PerformerOnboardingState;
}) {
  const displayName = form.stageName.trim() || `${form.firstName} ${form.lastName}`.trim();
  const membersLabel =
    form.members.length === 0
      ? "Solo performer"
      : form.members.map(formatMember).join(", ");
  const tiersLabel = form.pricingTiers
    .map((tier) => `${tier.eventType}: ${formatPeso(tier.price)}`)
    .join(" · ");
  const { activeIndex, setActiveIndex, activeItem } = useGalleryLightbox(
    form.gallery,
  );

  const reviewRows: [string, string][] = [
    ["Email", form.email],
    ["Genres", form.genres.join(", ")],
    ...(form.category === "Band" ? ([["Band", membersLabel]] as [string, string][]) : []),
    ["Pricing", tiersLabel],
    [
      "Gallery",
      `${form.gallery.length} ${form.gallery.length === 1 ? "item" : "items"}`,
    ],
  ];

  return (
    <div className="animate-fade-up overflow-hidden rounded-2xl border border-stone bg-sand">
      <div className="flex items-center gap-4 border-b border-stone/80 p-5">
        <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-burnt-orange font-headline text-2xl text-sand">
          {displayName.charAt(0).toUpperCase() || "?"}
        </span>
        <div>
          <p className="font-semibold text-espresso">{displayName}</p>
          <p className="text-xs text-espresso/55">
            {form.category} · {form.firstName} {form.lastName}
          </p>
          <p className="mt-1 text-xs text-burnt-orange">
            {form.pricingTiers[0]
              ? `${formatPeso(form.pricingTiers[0].price)} starting`
              : "No pricing yet"}
          </p>
        </div>
      </div>
      <dl className="grid gap-x-8 gap-y-3 p-5 text-sm sm:grid-cols-2">
        {reviewRows.map(([label, value]) => (
          <div key={label} className="border-b border-stone/60 pb-2">
            <dt className="text-xs uppercase tracking-wide text-espresso/55">
              {label}
            </dt>
            <dd className="mt-1 text-espresso">{value}</dd>
          </div>
        ))}
        <div className="sm:col-span-2">
          <dt className="text-xs uppercase tracking-wide text-espresso/55">
            Bio
          </dt>
          <dd className="mt-1 leading-relaxed text-espresso/80">{form.bio}</dd>
        </div>
        {form.gallery.length > 0 ? (
          <div className="sm:col-span-2">
            <dt className="text-xs uppercase tracking-wide text-espresso/55">
              Gallery preview
            </dt>
            <dd className="mt-2 flex gap-2 overflow-x-auto">
              {form.gallery.map((item, index) => {
                const preview = galleryPreviewSrc(item);
                const isVideo = item.type === "video";
                const isUploadVideo = isVideo && item.source === "upload";
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-stone bg-sand transition-opacity hover:opacity-90"
                    aria-label={
                      isVideo
                        ? `Play gallery video ${index + 1}`
                        : `Preview gallery image ${index + 1}`
                    }
                  >
                    {isUploadVideo ? (
                      <video
                        src={item.src}
                        muted
                        playsInline
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={preview}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    )}
                    {isVideo ? (
                      <span
                        className="absolute inset-0 flex items-center justify-center bg-espresso/30"
                        aria-hidden="true"
                      >
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sand/95 text-espresso">
                          <svg
                            viewBox="0 0 24 24"
                            className="ml-px h-3 w-3 fill-current"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </dd>
          </div>
        ) : null}
      </dl>
      {activeItem && activeIndex !== null ? (
        <OnboardingGalleryPreviewDialog
          open
          items={form.gallery}
          activeIndex={activeIndex}
          activeItem={activeItem}
          onClose={() => setActiveIndex(null)}
          onPrevious={() =>
            setActiveIndex(
              (activeIndex - 1 + form.gallery.length) % form.gallery.length,
            )
          }
          onNext={() =>
            setActiveIndex((activeIndex + 1) % form.gallery.length)
          }
        />
      ) : null}
      <p className="border-t border-stone/80 p-5 text-xs text-espresso/55">
        By submitting, you agree to Crate&rsquo;s performer terms: a 12% service
        fee per booking, payouts within 24 hours of completed performances, and
        identity verification before your profile goes live.
      </p>
      {form.submitError ? (
        <p className="border-t border-stone/80 px-5 pb-5 text-sm text-burnt-orange" role="alert">
          {form.submitError}
        </p>
      ) : null}
    </div>
  );
}
