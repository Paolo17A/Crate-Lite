import PricingTierRepeater from "@/components/onboarding/PricingTierRepeater";
import type { PerformerOnboardingState } from "@/hooks/usePerformerOnboardingForm";

export default function PricingTiersStep({
  form,
}: {
  form: PerformerOnboardingState;
}) {
  return (
    <div className="animate-fade-up">
      <PricingTierRepeater
        tiers={form.pricingTiers}
        onChange={form.setPricingTiers}
      />
    </div>
  );
}
