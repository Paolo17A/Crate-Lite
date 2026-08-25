"use client";

import { createPortal } from "react-dom";
import { useIsClient } from "@/hooks/useIsClient";

type Props = {
  open: boolean;
  name: string;
  biography: string;
  onClose: () => void;
};

export default function BiographyDialog({
  open,
  name,
  biography,
  onClose,
}: Props) {
  const mounted = useIsClient();

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-200 flex items-center justify-center bg-espresso/80 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${name} biography`}
      onClick={onClose}
    >
      <div
        className="relative max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-espresso bg-sand p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute top-4 right-4 text-sm text-espresso/60 transition-colors hover:text-espresso"
          onClick={onClose}
        >
          Close
        </button>
        <h2 className="pr-12 text-2xl font-medium text-espresso">Biography</h2>
        <p className="mt-4 text-justify leading-relaxed whitespace-pre-wrap text-espresso/80">
          {biography}
        </p>
      </div>
    </div>,
    document.body,
  );
}
