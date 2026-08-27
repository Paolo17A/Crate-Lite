import type {
  BandMember,
  OnboardingGalleryCard,
  OnboardingGalleryItem,
  OnboardingImageUpload,
  PerformerOnboardingValues,
  PricingTier,
} from "@/types/performer-onboarding";
import { getApiUrl, readJson } from "@/lib/api";
import { parseYoutubeId, youtubeThumbUrl } from "@/lib/youtube";

export const BIO_MIN_LENGTH = 30;
export const PASSWORD_MIN_LENGTH = 8;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmailValid(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim());
}

export const PROFILE_IMAGE_ACCEPT = "image/jpeg,image/png";
export const PROFILE_IMAGE_TYPES = new Set(["image/jpeg", "image/png"]);

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
  > & {
    profileImage: OnboardingImageUpload | null;
    validId: OnboardingImageUpload | null;
  },
): boolean {
  return (
    values.firstName.trim().length > 1 &&
    values.lastName.trim().length > 1 &&
    isEmailValid(values.email) &&
    values.password.length >= PASSWORD_MIN_LENGTH &&
    values.stageName.trim().length > 1 &&
    values.genres.length > 0 &&
    values.bio.trim().length >= BIO_MIN_LENGTH &&
    values.profileImage?.file instanceof File &&
    values.validId?.file instanceof File
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

export function isGalleryItemValid(item: OnboardingGalleryItem & { file?: File }): boolean {
  if (item.type === "image") {
    return item.src.trim().length > 0 && item.file instanceof File;
  }
  if (item.source === "upload") {
    return item.src.trim().length > 0 && item.file instanceof File;
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

export function revokeImageUpload(upload: OnboardingImageUpload | null) {
  if (upload?.previewUrl.startsWith("blob:")) {
    URL.revokeObjectURL(upload.previewUrl);
  }
}

function galleryPayload(items: OnboardingGalleryCard[]) {
  return items.map((item) => {
    if (item.type === "image") {
      return { type: "image" as const, fileKey: item.id };
    }
    if (item.source === "youtube") {
      return {
        type: "video" as const,
        source: "youtube" as const,
        youtubeURL: item.youtubeURL,
      };
    }
    return { type: "video" as const, source: "upload" as const, fileKey: item.id };
  });
}

export function buildRegisterFormData(input: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  stageName: string;
  category: PerformerOnboardingValues["category"];
  genres: string[];
  bio: string;
  members: BandMember[];
  pricingTiers: PricingTier[];
  gallery: OnboardingGalleryCard[];
  profileImage: File;
  validId: File;
}): FormData {
  const formData = new FormData();
  formData.append("firstName", input.firstName.trim());
  formData.append("lastName", input.lastName.trim());
  formData.append("email", input.email.trim());
  formData.append("password", input.password);
  formData.append("stageName", input.stageName.trim());
  formData.append("category", input.category);
  formData.append("bio", input.bio.trim());
  formData.append("genres", JSON.stringify(input.genres));
  formData.append(
    "pricingTiers",
    JSON.stringify(
      input.pricingTiers.map((tier) => ({
        eventType: tier.eventType.trim(),
        price: tier.price,
      })),
    ),
  );
  formData.append(
    "members",
    JSON.stringify(
      input.members.map((member) => ({
        name: member.name.trim(),
        role: member.role.trim(),
      })),
    ),
  );
  formData.append("gallery", JSON.stringify(galleryPayload(input.gallery)));
  formData.append("profileImage", input.profileImage);
  formData.append("validId", input.validId);
  for (const item of input.gallery) {
    if (item.file) {
      formData.append(`galleryFile_${item.id}`, item.file);
    }
  }
  return formData;
}

type RegisterErrorBody = {
  message?: string;
};

export async function registerPerformerRequest(formData: FormData): Promise<void> {
  let res: Response;
  try {
    res = await fetch(`${getApiUrl()}/api/performers/register`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
  } catch {
    throw new Error(
      "Could not reach the API. Start Crate Backend and try again.",
    );
  }

  const body = await readJson<RegisterErrorBody>(res);
  if (!res.ok) {
    throw new Error(body?.message || `Registration failed (${res.status})`);
  }
}
