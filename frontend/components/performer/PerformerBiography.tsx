"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

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
  const textRef = useRef<HTMLParagraphElement>(null);
  const [clamped, setClamped] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const check = () => {
      setClamped(el.scrollHeight > el.clientHeight + 1);
    };

    // Wait a frame so grid row-span height has settled
    const frame = requestAnimationFrame(check);
    const observer = new ResizeObserver(check);
    observer.observe(el);
    window.addEventListener("resize", check);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", check);
    };
  }, [biography, fillAvailable]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

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
          className={`mt-4 leading-relaxed text-espresso/80 ${
            fillAvailable
              ? "min-h-0 flex-1 overflow-hidden max-lg:line-clamp-3 max-lg:flex-none"
              : "line-clamp-3"
          }`}
        >
          {biography}
        </p>
        {clamped && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-3 shrink-0 text-sm font-medium text-burnt-orange underline underline-offset-4 transition-opacity hover:opacity-80"
          >
            Show more
          </button>
        )}
      </section>

      {mounted &&
        open &&
        createPortal(
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-espresso/80 p-4"
            role="dialog"
            aria-modal="true"
            aria-label={`${name} biography`}
            onClick={() => setOpen(false)}
          >
            <div
              className="relative max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-espresso bg-sand p-6 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute top-4 right-4 text-sm text-espresso/60 transition-colors hover:text-espresso"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
              <h2 className="pr-12 text-2xl font-medium text-espresso">
                Biography
              </h2>
              <p className="mt-4 leading-relaxed whitespace-pre-wrap text-espresso/80">
                {biography}
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
