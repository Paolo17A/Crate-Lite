import type { Metadata } from "next";
import PerformerOnboardingPage from "@/components/onboarding/PerformerOnboardingPage";

export const metadata: Metadata = {
  title: "Become a Performer — Crate",
};

export default function PerformerOnboardingRoute() {
  return (
    <div className="bg-parchment px-5 py-12">
      <div className="mx-auto max-w-3xl">
        <PerformerOnboardingPage />
      </div>
    </div>
  );
}
