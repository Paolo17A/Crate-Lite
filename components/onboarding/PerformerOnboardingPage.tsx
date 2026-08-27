"use client";

import Link from "next/link";
import FormStepper from "@/components/onboarding/FormStepper";
import SignupSuccess from "@/components/onboarding/SignupSuccess";
import PersonalDetailsStep from "@/components/onboarding/steps/PersonalDetailsStep";
import PricingTiersStep from "@/components/onboarding/steps/PricingTiersStep";
import ReviewStep from "@/components/onboarding/steps/ReviewStep";
import {
  onboardingSteps,
  usePerformerOnboardingForm,
} from "@/hooks/usePerformerOnboardingForm";

const pillOutline =
  "flex items-center gap-2 rounded-full border border-stone px-6 py-2.5 text-sm text-espresso/70 transition-colors hover:border-espresso hover:text-espresso disabled:opacity-40";
const pillFilled =
  "flex items-center gap-2 rounded-full bg-burnt-orange px-8 py-2.5 text-sm font-semibold text-sand transition-colors hover:bg-burnt-orange/90 disabled:cursor-not-allowed disabled:opacity-40";

export default function PerformerOnboardingPage() {
  const form = usePerformerOnboardingForm();
  const { step, setStep, done, stageName, submitting, submit } = form;

  if (done) return <SignupSuccess stageName={stageName} />;

  const canContinue =
    (step === 0 && form.personalValid) ||
    (step === 1 && form.pricingValid) ||
    step === 2;

  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-burnt-orange">
        Become a performer
      </p>
      <h1 className="mt-2 font-headline text-4xl text-espresso">
        Your profile sells you while you sleep.
      </h1>

      <FormStepper steps={onboardingSteps} step={step} className="mt-8" />

      <div className="mt-10">
        {step === 0 && <PersonalDetailsStep form={form} />}
        {step === 1 && <PricingTiersStep form={form} />}
        {step === 2 && <ReviewStep form={form} />}
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-stone/60 pt-6">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            disabled={submitting}
            className={pillOutline}
          >
            <span aria-hidden="true">←</span> Back
          </button>
        ) : (
          <Link href="/" className={pillOutline}>
            <span aria-hidden="true">←</span> Cancel
          </Link>
        )}
        <button
          type="button"
          onClick={() => (step === 2 ? submit() : setStep(step + 1))}
          disabled={!canContinue || submitting}
          className={pillFilled}
        >
          {step === 2
            ? submitting
              ? "Submitting..."
              : "Submit for verification"
            : "Continue"}
        </button>
      </div>
    </>
  );
}
