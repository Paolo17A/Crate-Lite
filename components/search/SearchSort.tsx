"use client";

import { useId } from "react";
import SearchSortDialog, {
  SortPanelBody,
  sortFieldLabel,
} from "@/components/search/SearchSortDialog";
import OrangeButton from "@/components/ui/OrangeButton";
import { useDismissiblePanel } from "@/hooks/useDismissiblePanel";
import type {
  SortDirection,
  SortField,
  SortSelection,
} from "@/types/search";

export type { SortDirection, SortField, SortSelection };

type Props = {
  value: SortSelection;
  onChange: (next: SortSelection) => void;
  /** Render panel content inline (no Sort button). */
  embedded?: boolean;
};

export default function SearchSort({
  value,
  onChange,
  embedded = false,
}: Props) {
  const { open, setOpen, rootRef } = useDismissiblePanel(!embedded);
  const panelId = useId();
  const fieldName = useId();
  const directionName = useId();
  const fieldLabel = sortFieldLabel(value.field);
  const directionLabel =
    value.direction === "asc" ? "Increasing" : "Decreasing";

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
      <OrangeButton
        label="Sort by"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`Sort by ${fieldLabel}, ${directionLabel}`}
        onClick={() => setOpen((current) => !current)}
        className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap px-4 py-2.5 text-sm font-medium"
      >
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
      </OrangeButton>

      {open && (
        <SearchSortDialog
          id={panelId}
          value={value}
          onChange={onChange}
          fieldName={`${fieldName}-dropdown`}
          directionName={`${directionName}-dropdown`}
        />
      )}
    </div>
  );
}
