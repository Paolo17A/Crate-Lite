"use client";

import { useState } from "react";
import {
  isBandValid,
  isPersonalDetailsValid,
  isPricingValid,
} from "@/lib/performer-onboarding";
import {
  ONBOARDING_CATEGORIES,
  type BandMember,
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

  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const toggle = (list: string[], set: (next: string[]) => void, value: string) =>
    set(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);

  const toggleEventType = (eventType: string) => {
    setPricingTiers((current) =>
      current.some((tier) => tier.eventType === eventType)
        ? current.filter((tier) => tier.eventType !== eventType)
        : [...current, { eventType, price: 0 }],
    );
  };

  const setTierPrice = (eventType: string, price: number) => {
    setPricingTiers((current) =>
      current.map((tier) =>
        tier.eventType === eventType ? { ...tier, price } : tier,
      ),
    );
  };

  const setCategory = (next: (typeof ONBOARDING_CATEGORIES)[number]) => {
    setCategoryState(next);
    if (next !== "Band") {
      setMembers([]);
    }
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
    }) && (category !== "Band" || isBandValid(members));
  const pricingValid = isPricingValid(pricingTiers);

  const submit = () => {
    if (submitting) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
    }, 1200);
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
    submitting,
    done,
    toggle,
    toggleEventType,
    setTierPrice,
    personalValid,
    pricingValid,
    submit,
  };
}

export type PerformerOnboardingState = ReturnType<typeof usePerformerOnboardingForm>;
