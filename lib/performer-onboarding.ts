import type {
  BandMember,
  PerformerOnboardingValues,
  PricingTier,
} from "@/types/performer-onboarding";

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
  return members.every((member) => member.name.trim().length > 0);
}

export function isPricingValid(tiers: PricingTier[]): boolean {
  if (tiers.length === 0) return false;
  const normalized = tiers.map((tier) => tier.eventType.trim().toLowerCase());
  if (normalized.length !== new Set(normalized).size) return false;
  return tiers.every((tier) => Number.isFinite(tier.price) && tier.price > 0);
}
