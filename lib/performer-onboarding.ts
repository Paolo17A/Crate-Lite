import type {
  BandMember,
  OnboardingGalleryItem,
  PerformerOnboardingValues,
  PricingTier,
} from "@/types/performer-onboarding";
import { parseYoutubeId, youtubeThumbUrl } from "@/lib/youtube";

export const BIO_MIN_LENGTH = 30;
export const PASSWORD_MIN_LENGTH = 8;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmailValid(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim());
}

export function isPersonalDetailsValid(
  values: Pick<
    PerformerOnboardingValues,
    | "firstName"
    | "lastName"
    | "email"
    | "password"
    | "stageName"
    | "genres"
    | "bio"
  >,
): boolean {
  return (
    values.firstName.trim().length > 1 &&
    values.lastName.trim().length > 1 &&
    isEmailValid(values.email) &&
    values.password.length >= PASSWORD_MIN_LENGTH &&
    values.stageName.trim().length > 1 &&
    values.genres.length > 0 &&
    values.bio.trim().length >= BIO_MIN_LENGTH
  );
}

export function isBandValid(members: BandMember[]): boolean {
  return (
    members.length > 0 &&
    members.every((member) => member.name.trim().length > 0)
  );
}

export function isPricingValid(tiers: PricingTier[]): boolean {
  if (tiers.length === 0) return false;
  if (tiers.some((tier) => !tier.eventType.trim())) return false;
  const normalized = tiers.map((tier) => tier.eventType.trim().toLowerCase());
  if (normalized.length !== new Set(normalized).size) return false;
  return tiers.every((tier) => Number.isFinite(tier.price) && tier.price > 0);
}

export function isGalleryItemValid(item: OnboardingGalleryItem): boolean {
  if (item.type === "image") {
    return item.src.trim().length > 0;
  }
  if (item.source === "upload") {
    return item.src.trim().length > 0;
  }
  return (
    item.youtubeURL.trim().length > 0 &&
    parseYoutubeId(item.youtubeURL) !== null
  );
}

export function isGalleryValid(items: OnboardingGalleryItem[]): boolean {
  return items.length > 0 && items.every(isGalleryItemValid);
}

export function galleryPreviewSrc(item: OnboardingGalleryItem): string {
  if (item.type === "image" || item.source === "upload") {
    return item.src;
  }
  const id = parseYoutubeId(item.youtubeURL);
  return id ? youtubeThumbUrl(id) : "";
}

export function revokeGalleryBlobUrls(items: OnboardingGalleryItem[]) {
  for (const item of items) {
    if ("src" in item && item.src.startsWith("blob:")) {
      URL.revokeObjectURL(item.src);
    }
  }
}
