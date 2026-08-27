import type { PerformerCategory } from "@/types/performer";

export const ONBOARDING_STEPS = [
  "Personal details",
  "Pricing tiers",
  "Gallery",
  "Review",
] as const;

export const ONBOARDING_CATEGORIES = [
  "DJ",
  "Musician",
  "Band",
  "Other",
] as const satisfies readonly PerformerCategory[];

export type BandMember = {
  name: string;
  instrument: string;
  role: string;
};

export type PricingTier = {
  eventType: string;
  price: number;
};

export type OnboardingGalleryItem =
  | { type: "image"; src: string; title?: string }
  | { type: "video"; source: "upload"; src: string; title?: string }
  | { type: "video"; source: "youtube"; youtubeURL: string; title?: string };

/** Client-only id for keys / drag-and-drop; also used as gallery fileKey. */
export type OnboardingGalleryCard = OnboardingGalleryItem & {
  id: string;
  file?: File;
};

export type OnboardingImageUpload = {
  file: File;
  previewUrl: string;
};

export type PerformerOnboardingValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  stageName: string;
  category: PerformerCategory;
  genres: string[];
  bio: string;
  members: BandMember[];
  pricingTiers: PricingTier[];
  gallery: OnboardingGalleryItem[];
};
