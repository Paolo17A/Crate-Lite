"use client";

import { useEffect, useRef, useState } from "react";
import {
  buildRegisterFormData,
  isBandValid,
  isGalleryValid,
  isPersonalDetailsValid,
  isPricingValid,
  registerPerformerRequest,
  revokeGalleryBlobUrls,
  revokeImageUpload,
} from "@/lib/performer-onboarding";
import {
  ONBOARDING_CATEGORIES,
  type BandMember,
  type OnboardingGalleryCard,
  type OnboardingImageUpload,
  type PricingTier,
} from "@/types/performer-onboarding";

export { ONBOARDING_STEPS as onboardingSteps } from "@/types/performer-onboarding";

export function usePerformerOnboardingForm() {
  const [step, setStep] = useState(0);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stageName, setStageName] = useState("");
  const [category, setCategoryState] = useState<(typeof ONBOARDING_CATEGORIES)[number]>(
    ONBOARDING_CATEGORIES[0],
  );
  const [genres, setGenres] = useState<string[]>([]);
  const [bio, setBio] = useState("");
  const [members, setMembers] = useState<BandMember[]>([]);
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([]);
  const [gallery, setGallery] = useState<OnboardingGalleryCard[]>([]);
  const [profileImage, setProfileImageState] = useState<OnboardingImageUpload | null>(
    null,
  );
  const [validId, setValidIdState] = useState<OnboardingImageUpload | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const galleryRef = useRef(gallery);
  galleryRef.current = gallery;
  const profileImageRef = useRef(profileImage);
  profileImageRef.current = profileImage;
  const validIdRef = useRef(validId);
  validIdRef.current = validId;

  useEffect(() => {
    return () => {
      revokeGalleryBlobUrls(galleryRef.current);
      revokeImageUpload(profileImageRef.current);
      revokeImageUpload(validIdRef.current);
    };
  }, []);

  const toggle = (list: string[], set: (next: string[]) => void, value: string) =>
    set(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);

  const setCategory = (next: (typeof ONBOARDING_CATEGORIES)[number]) => {
    setCategoryState(next);
    if (next !== "Band") {
      setMembers([]);
    }
  };

  const setProfileImage = (next: OnboardingImageUpload | null) => {
    setProfileImageState((current) => {
      if (current && current.previewUrl !== next?.previewUrl) {
        revokeImageUpload(current);
      }
      return next;
    });
  };

  const setValidId = (next: OnboardingImageUpload | null) => {
    setValidIdState((current) => {
      if (current && current.previewUrl !== next?.previewUrl) {
        revokeImageUpload(current);
      }
      return next;
    });
  };

  const personalValid =
    isPersonalDetailsValid({
      firstName,
      lastName,
      email,
      password,
      stageName,
      genres,
      bio,
      profileImage,
      validId,
    }) && (category !== "Band" || isBandValid(members));
  const pricingValid = isPricingValid(pricingTiers);
  const galleryValid = isGalleryValid(gallery);

  const submit = async () => {
    if (submitting || !profileImage || !validId) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const formData = buildRegisterFormData({
        firstName,
        lastName,
        email,
        password,
        stageName,
        category,
        genres,
        bio,
        members,
        pricingTiers,
        gallery,
        profileImage: profileImage.file,
        validId: validId.file,
      });
      await registerPerformerRequest(formData);
      setDone(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    step,
    setStep,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    stageName,
    setStageName,
    category,
    setCategory,
    genres,
    setGenres,
    bio,
    setBio,
    members,
    setMembers,
    pricingTiers,
    setPricingTiers,
    gallery,
    setGallery,
    profileImage,
    setProfileImage,
    validId,
    setValidId,
    submitting,
    submitError,
    done,
    toggle,
    personalValid,
    pricingValid,
    galleryValid,
    submit,
  };
}

export type PerformerOnboardingState = ReturnType<typeof usePerformerOnboardingForm>;
