"use client";

import { useState } from "react";
import BiographyDialog from "@/components/performer/BiographyDialog";
import TextLink from "@/components/ui/TextLink";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useClampedText } from "@/hooks/useClampedText";

type Props = {
  name: string;
  biography: string;
  /** Fill parent height (desktop span over videos/genres) and only show more when overflowing. */
  fillAvailable?: boolean;
};

export default function PerformerBiography({
  name,
  biography,
  fillAvailable = false,
}: Props) {
  const { textRef, clamped } = useClampedText([biography, fillAvailable]);
  const [open, setOpen] = useState(false);

  useBodyScrollLock(open, { onEscape: () => setOpen(false) });

  return (
    <>
      <section
        className={`flex flex-col ${fillAvailable ? "h-full min-h-0" : ""}`}
      >
        <h2 className="shrink-0 text-2xl font-medium text-espresso">
          Biography
        </h2>
        <p
          ref={textRef}
          className={`mt-4 text-justify leading-relaxed text-espresso/80 ${
            fillAvailable
              ? "min-h-0 flex-1 overflow-hidden max-lg:line-clamp-3 max-lg:flex-none"
              : "line-clamp-3"
          }`}
        >
          {biography}
        </p>
        {clamped && (
          <TextLink
            label="Show more"
            onClick={() => setOpen(true)}
            className="mt-3 shrink-0"
          />
        )}
      </section>

      <BiographyDialog
        open={open}
        name={name}
        biography={biography}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
