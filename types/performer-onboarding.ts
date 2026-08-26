import type { PerformerCategory } from "@/types/performer";

export const ONBOARDING_STEPS = [
  "Personal details",
  "Band configuration",
  "Pricing tiers",
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
  role: string;
};

export type PricingTier = {
  eventType: string;
  price: number;
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
};
