"use client";

import { useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { chipClass, fieldClass, labelClass } from "@/components/onboarding/fieldStyles";
import { EVENT_TYPES } from "@/lib/booking";
import { formatPeso } from "@/lib/format";
import type { PricingTier } from "@/types/performer-onboarding";

export const EMPTY_PRICING_TIER: PricingTier = {
  eventType: "",
  price: 0,
};

const PRESET_EVENT_TYPES = new Set<string>(EVENT_TYPES);

type Props = {
  tiers: PricingTier[];
  onChange: (tiers: PricingTier[]) => void;
};

type FormValues = {
  tiers: PricingTier[];
};

function toTiers(value: FormValues["tiers"] | undefined): PricingTier[] {
  if (!value) {
    return [];
  }
  return value.map((tier) => {
    const price = Number(tier?.price);
    return {
      eventType: tier?.eventType ?? "",
      price: Number.isFinite(price) ? price : 0,
    };
  });
}

function sameTiers(a: PricingTier[], b: PricingTier[]): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

function isPresetEventType(eventType: string): boolean {
  return PRESET_EVENT_TYPES.has(eventType);
}

export default function PricingTierRepeater({ tiers, onChange }: Props) {
  const tiersRef = useRef(tiers);
  tiersRef.current = tiers;

  const { control, register, watch } = useForm<FormValues>({
    defaultValues: { tiers },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tiers",
  });
  const watchedTiers = watch("tiers") ?? [];

  useEffect(() => {
    const subscription = watch((data) => {
      const next = toTiers(data.tiers as PricingTier[] | undefined);
      if (!sameTiers(next, tiersRef.current)) {
        onChange(next);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  const togglePreset = (eventType: string) => {
    const index = watchedTiers.findIndex(
      (tier) => tier.eventType.trim().toLowerCase() === eventType.toLowerCase(),
    );
    if (index >= 0) {
      remove(index);
      return;
    }
    append({ eventType, price: 0 });
  };

  return (
    <div className="space-y-5">
      <div>
        <span className={labelClass}>Event types you play (pick at least one)</span>
        <div className="flex flex-wrap gap-2">
          {EVENT_TYPES.map((eventType) => (
            <button
              key={eventType}
              type="button"
              onClick={() => togglePreset(eventType)}
              className={chipClass(
                watchedTiers.some(
                  (tier) =>
                    tier.eventType.trim().toLowerCase() === eventType.toLowerCase(),
                ),
              )}
            >
              {eventType}
            </button>
          ))}
        </div>
      </div>

      {fields.length === 0 ? (
        <p className="rounded-xl border border-dashed border-stone bg-sand px-4 py-6 text-center text-sm text-espresso/55">
          No pricing yet — pick a preset or add a custom event type to continue.
        </p>
      ) : (
        <div className="space-y-4">
          {fields.map((field, index) => {
            const eventType = watchedTiers[index]?.eventType ?? field.eventType;
            const price = Number(watchedTiers[index]?.price);
            const preset = isPresetEventType(eventType);

            return (
              <div
                key={field.id}
                className="grid gap-4 rounded-xl border border-stone bg-sand p-4 sm:grid-cols-[1fr_1fr_auto]"
              >
                <div>
                  <label
                    className={labelClass}
                    htmlFor={`tier-event-${field.id}`}
                  >
                    Event type
                  </label>
                  {preset ? (
                    <p className={`${fieldClass} flex items-center`}>
                      {eventType}
                    </p>
                  ) : null}
                  <input
                    id={`tier-event-${field.id}`}
                    type={preset ? "hidden" : "text"}
                    className={preset ? undefined : fieldClass}
                    placeholder="Bar, Debut…"
                    {...register(`tiers.${index}.eventType`)}
                  />
                </div>
                <div>
                  <label
                    className={labelClass}
                    htmlFor={`tier-price-${field.id}`}
                  >
                    Rate —{" "}
                    <span className="text-burnt-orange">
                      {formatPeso(Number.isFinite(price) ? price : 0)}
                    </span>
                  </label>
                  <input
                    id={`tier-price-${field.id}`}
                    type="number"
                    min={1}
                    step={1000}
                    className={fieldClass}
                    placeholder="Talent fee in PHP"
                    {...register(`tiers.${index}.price`, { valueAsNumber: true })}
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="w-full rounded-full bg-burnt-orange px-4 py-2.5 text-sm font-semibold text-sand transition-colors hover:bg-burnt-orange/90 sm:w-auto"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <button
        type="button"
        onClick={() => append({ ...EMPTY_PRICING_TIER })}
        className="text-sm font-medium text-burnt-orange underline underline-offset-4 transition-opacity hover:opacity-80"
      >
        Add custom event type
      </button>
    </div>
  );
}
