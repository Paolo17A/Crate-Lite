import { chipClass, fieldClass, labelClass } from "@/components/onboarding/fieldStyles";
import type { PerformerOnboardingState } from "@/hooks/usePerformerOnboardingForm";
import { EVENT_TYPES } from "@/lib/booking";
import { formatPeso } from "@/lib/format";

export default function PricingTiersStep({
  form,
}: {
  form: PerformerOnboardingState;
}) {
  return (
    <div className="animate-fade-up space-y-6">
      <div>
        <span className={labelClass}>Event types you play (pick at least one)</span>
        <div className="flex flex-wrap gap-2">
          {EVENT_TYPES.map((eventType) => (
            <button
              key={eventType}
              type="button"
              onClick={() => form.toggleEventType(eventType)}
              className={chipClass(
                form.pricingTiers.some((tier) => tier.eventType === eventType),
              )}
            >
              {eventType}
            </button>
          ))}
        </div>
      </div>

      {form.pricingTiers.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2">
          {form.pricingTiers.map((tier) => (
            <div key={tier.eventType}>
              <label
                className={labelClass}
                htmlFor={`tier-price-${tier.eventType}`}
              >
                {tier.eventType} —{" "}
                <span className="text-burnt-orange">
                  {formatPeso(tier.price || 0)}
                </span>
              </label>
              <input
                id={`tier-price-${tier.eventType}`}
                type="number"
                min={1}
                step={1000}
                className={fieldClass}
                placeholder="Talent fee in PHP"
                value={tier.price || ""}
                onChange={(e) => {
                  const next = e.target.value === "" ? 0 : Number(e.target.value);
                  form.setTierPrice(
                    tier.eventType,
                    Number.isFinite(next) ? next : 0,
                  );
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
