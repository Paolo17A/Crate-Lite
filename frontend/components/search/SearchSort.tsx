"use client";

import { useEffect, useId, useRef, useState } from "react";

export type SortField = "name" | "budget";
export type SortDirection = "asc" | "desc";

export type SortSelection = {
  field: SortField;
  direction: SortDirection;
};

type Props = {
  value: SortSelection;
  onChange: (next: SortSelection) => void;
  /** Render panel content inline (no Sort button). */
  embedded?: boolean;
};

const fields: { id: SortField; label: string }[] = [
  { id: "name", label: "Name" },
  { id: "budget", label: "Budget" },
];

const directions: { id: SortDirection; label: string }[] = [
  { id: "asc", label: "Increasing" },
  { id: "desc", label: "Decreasing" },
];

function SortPanelBody({
  value,
  onChange,
  fieldName,
  directionName,
}: {
  value: SortSelection;
  onChange: (next: SortSelection) => void;
  fieldName: string;
  directionName: string;
}) {
  return (
    <div className="space-y-5">
      <section>
        <h3 className="text-xs font-medium uppercase tracking-wide text-espresso/55">
          Sort by
        </h3>
        <ul className="mt-3 space-y-2.5">
          {fields.map((field) => (
            <li key={field.id}>
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-espresso">
                <input
                  type="radio"
                  name={fieldName}
                  checked={value.field === field.id}
                  onChange={() => onChange({ ...value, field: field.id })}
                  className="h-4 w-4 accent-burnt-orange"
                />
                <span>{field.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-xs font-medium uppercase tracking-wide text-espresso/55">
          Order
        </h3>
        <ul className="mt-3 space-y-2.5">
          {directions.map((direction) => (
            <li key={direction.id}>
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-espresso">
                <input
                  type="radio"
                  name={directionName}
                  checked={value.direction === direction.id}
                  onChange={() =>
                    onChange({ ...value, direction: direction.id })
                  }
                  className="h-4 w-4 accent-burnt-orange"
                />
                <span>{direction.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default function SearchSort({
  value,
  onChange,
  embedded = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const fieldName = useId();
  const directionName = useId();
  const fieldLabel =
    fields.find((item) => item.id === value.field)?.label ?? "Name";
  const directionLabel =
    value.direction === "asc" ? "Increasing" : "Decreasing";

  useEffect(() => {
    if (embedded || !open) return;

    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [embedded, open]);

  if (embedded) {
    return (
      <div className="font-performer">
        <SortPanelBody
          value={value}
          onChange={onChange}
          fieldName={`${fieldName}-embedded`}
          directionName={`${directionName}-embedded`}
        />
      </div>
    );
  }

  return (
    <div ref={rootRef} className="relative font-performer">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`Sort by ${fieldLabel}, ${directionLabel}`}
        onClick={() => setOpen((current) => !current)}
        className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded bg-burnt-orange px-4 py-2.5 text-sm font-medium text-sand transition-colors hover:bg-burnt-orange/90"
      >
        Sort by
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Sort results"
          className="absolute right-0 z-30 mt-2 w-[min(calc(100vw-3rem),16rem)] rounded-lg border border-stone bg-sand p-5 shadow-lg"
        >
          <SortPanelBody
            value={value}
            onChange={(next) => {
              onChange(next);
            }}
            fieldName={`${fieldName}-dropdown`}
            directionName={`${directionName}-dropdown`}
          />
        </div>
      )}
    </div>
  );
}
