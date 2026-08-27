"use client";

import { fieldClass, labelClass } from "@/components/onboarding/fieldStyles";
import {
  PROFILE_IMAGE_ACCEPT,
  PROFILE_IMAGE_TYPES,
} from "@/lib/performer-onboarding";
import type { OnboardingImageUpload } from "@/types/performer-onboarding";

type Props = {
  id: string;
  label: string;
  hint: string;
  value: OnboardingImageUpload | null;
  onChange: (next: OnboardingImageUpload | null) => void;
};

function isAllowedImage(file: File): boolean {
  return PROFILE_IMAGE_TYPES.has(file.type) || /\.(jpe?g|png)$/i.test(file.name);
}

export default function OnboardingImageField({
  id,
  label,
  hint,
  value,
  onChange,
}: Props) {
  return (
    <div>
      <label className={labelClass} htmlFor={id}>
        {label}
      </label>
      <div className="flex items-center gap-3">
        <span className="flex h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-stone bg-sand">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value.previewUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="m-auto text-[10px] uppercase tracking-wide text-espresso/40">
              Preview
            </span>
          )}
        </span>
        <div className="min-w-0 flex-1">
          <input
            id={id}
            type="file"
            accept={PROFILE_IMAGE_ACCEPT}
            className={`${fieldClass} cursor-pointer file:mr-3 file:rounded-full file:border-0 file:bg-burnt-orange file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-sand`}
            onChange={(event) => {
              const file = event.target.files?.[0];
              event.target.value = "";
              if (!file) return;
              if (!isAllowedImage(file)) return;
              onChange({ file, previewUrl: URL.createObjectURL(file) });
            }}
          />
          <p className="mt-1 text-[11px] text-espresso/55">
            {value ? value.file.name : hint}
          </p>
        </div>
      </div>
    </div>
  );
}
