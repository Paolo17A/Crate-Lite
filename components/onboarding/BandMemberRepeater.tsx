"use client";

import { useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { fieldClass, labelClass } from "@/components/onboarding/fieldStyles";
import type { BandMember } from "@/types/performer-onboarding";

export const EMPTY_BAND_MEMBER: BandMember = {
  name: "",
  instrument: "",
  role: "",
};

type Props = {
  members: BandMember[];
  onChange: (members: BandMember[]) => void;
};

type FormValues = {
  members: BandMember[];
};

function toMembers(value: FormValues["members"] | undefined): BandMember[] {
  if (!value) {
    return [];
  }
  return value.map((member) => ({
    name: member?.name ?? "",
    instrument: member?.instrument ?? "",
    role: member?.role ?? "",
  }));
}

function sameMembers(a: BandMember[], b: BandMember[]): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export default function BandMemberRepeater({ members, onChange }: Props) {
  const membersRef = useRef(members);
  membersRef.current = members;

  const { control, register, watch } = useForm<FormValues>({
    defaultValues: { members },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  useEffect(() => {
    const subscription = watch((data) => {
      const next = toMembers(data.members as BandMember[] | undefined);
      if (!sameMembers(next, membersRef.current)) {
        onChange(next);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  return (
    <div className="space-y-5">
      {fields.length === 0 ? (
        <p className="rounded-xl border border-dashed border-stone bg-sand px-4 py-6 text-center text-sm text-espresso/55">
          No members yet — add at least one band member to continue.
        </p>
      ) : (
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid gap-4 rounded-xl border border-stone bg-sand p-4 sm:grid-cols-[1fr_1fr_1fr_auto]"
            >
              <div>
                <label className={labelClass} htmlFor={`member-name-${field.id}`}>
                  Name
                </label>
                <input
                  id={`member-name-${field.id}`}
                  className={fieldClass}
                  placeholder="Full name"
                  {...register(`members.${index}.name`)}
                />
              </div>
              <div>
                <label
                  className={labelClass}
                  htmlFor={`member-instrument-${field.id}`}
                >
                  Instrument (optional)
                </label>
                <input
                  id={`member-instrument-${field.id}`}
                  className={fieldClass}
                  placeholder="Guitar, keys…"
                  {...register(`members.${index}.instrument`)}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor={`member-role-${field.id}`}>
                  Role (optional)
                </label>
                <input
                  id={`member-role-${field.id}`}
                  className={fieldClass}
                  placeholder="Vocalist, DJ…"
                  {...register(`members.${index}.role`)}
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
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => append({ ...EMPTY_BAND_MEMBER })}
        className="text-sm font-medium text-burnt-orange underline underline-offset-4 transition-opacity hover:opacity-80"
      >
        Add member
      </button>
    </div>
  );
}
