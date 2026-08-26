import type { PerformerOnboardingState } from "@/hooks/usePerformerOnboardingForm";
import { formatPeso } from "@/lib/format";

export default function ReviewStep({
  form,
}: {
  form: PerformerOnboardingState;
}) {
  const displayName = form.stageName.trim() || `${form.firstName} ${form.lastName}`.trim();
  const membersLabel =
    form.members.length === 0
      ? "Solo performer"
      : form.members
          .map((member) =>
            member.role.trim()
              ? `${member.name} (${member.role})`
              : member.name,
          )
          .join(", ");
  const tiersLabel = form.pricingTiers
    .map((tier) => `${tier.eventType}: ${formatPeso(tier.price)}`)
    .join(" · ");

  return (
    <div className="animate-fade-up overflow-hidden rounded-2xl border border-stone bg-sand">
      <div className="flex items-center gap-4 border-b border-stone/80 p-5">
        <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-burnt-orange font-headline text-2xl text-sand">
          {displayName.charAt(0).toUpperCase() || "?"}
        </span>
        <div>
          <p className="font-semibold text-espresso">{displayName}</p>
          <p className="text-xs text-espresso/55">
            {form.category} · {form.firstName} {form.lastName}
          </p>
          <p className="mt-1 text-xs text-burnt-orange">
            {form.pricingTiers[0]
              ? `${formatPeso(form.pricingTiers[0].price)} starting`
              : "No pricing yet"}
          </p>
        </div>
      </div>
      <dl className="grid gap-x-8 gap-y-3 p-5 text-sm sm:grid-cols-2">
        {[
          ["Email", form.email],
          ["Genres", form.genres.join(", ")],
          ["Band", membersLabel],
          ["Pricing", tiersLabel],
        ].map(([label, value]) => (
          <div key={label} className="border-b border-stone/60 pb-2">
            <dt className="text-xs uppercase tracking-wide text-espresso/55">
              {label}
            </dt>
            <dd className="mt-1 text-espresso">{value}</dd>
          </div>
        ))}
        <div className="sm:col-span-2">
          <dt className="text-xs uppercase tracking-wide text-espresso/55">
            Bio
          </dt>
          <dd className="mt-1 leading-relaxed text-espresso/80">{form.bio}</dd>
        </div>
      </dl>
      <p className="border-t border-stone/80 p-5 text-xs text-espresso/55">
        By submitting, you agree to Crate&rsquo;s performer terms: a 12% service
        fee per booking, payouts within 24 hours of completed performances, and
        identity verification before your profile goes live.
      </p>
    </div>
  );
}
