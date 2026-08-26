import { fieldClass, labelClass } from "@/components/onboarding/fieldStyles";
import type { PerformerOnboardingState } from "@/hooks/usePerformerOnboardingForm";

export default function BandConfigurationStep({
  form,
}: {
  form: PerformerOnboardingState;
}) {
  return (
    <div className="animate-fade-up space-y-5">
      <p className="text-sm text-espresso/70">
        Add bandmates if you perform as a group. Solo acts can skip this step.
      </p>

      {form.members.length === 0 ? (
        <p className="rounded-xl border border-dashed border-stone bg-white/60 px-4 py-6 text-center text-sm text-espresso/55">
          No members yet — you&apos;ll be listed as a solo performer.
        </p>
      ) : (
        <div className="space-y-4">
          {form.members.map((member, index) => (
            <div
              key={index}
              className="grid gap-4 rounded-xl border border-stone bg-white p-4 sm:grid-cols-[1fr_1fr_auto]"
            >
              <div>
                <label
                  className={labelClass}
                  htmlFor={`member-name-${index}`}
                >
                  Name
                </label>
                <input
                  id={`member-name-${index}`}
                  className={fieldClass}
                  placeholder="Full name"
                  value={member.name}
                  onChange={(e) =>
                    form.updateMember(index, { name: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  className={labelClass}
                  htmlFor={`member-role-${index}`}
                >
                  Role (optional)
                </label>
                <input
                  id={`member-role-${index}`}
                  className={fieldClass}
                  placeholder="Vocalist, guitar…"
                  value={member.role}
                  onChange={(e) =>
                    form.updateMember(index, { role: e.target.value })
                  }
                />
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => form.removeMember(index)}
                  className="w-full rounded-full border border-stone px-4 py-2.5 text-sm text-espresso/70 transition-colors hover:border-burnt-orange hover:text-burnt-orange sm:w-auto"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={form.addMember}
        className="text-sm font-medium text-burnt-orange underline underline-offset-4 transition-opacity hover:opacity-80"
      >
        Add member
      </button>
    </div>
  );
}
