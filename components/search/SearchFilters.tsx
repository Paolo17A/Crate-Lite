"use client";

import { useId } from "react";
import SearchFiltersDialog, {
  FilterPanelBody,
} from "@/components/search/SearchFiltersDialog";
import OrangeButton from "@/components/ui/OrangeButton";
import { useDismissiblePanel } from "@/hooks/useDismissiblePanel";
import { useFilterDraft } from "@/hooks/useFilterDraft";
import type { FilterSelection } from "@/types/search";

export type { FilterSelection };

type Props = {
  applied: FilterSelection;
  onApply: (next: FilterSelection) => void;
  /** Render panel content inline (no Filters button). */
  embedded?: boolean;
  onClose?: () => void;
};

export default function SearchFilters({
  applied,
  onApply,
  embedded = false,
  onClose,
}: Props) {
  const { open, setOpen, rootRef } = useDismissiblePanel(!embedded);
  const {
    draft,
    setDraft,
    appliedCount,
    draftCount,
    openPanel,
    handleApply,
    handleCancel,
    handleClearDraft,
  } = useFilterDraft({
    applied,
    onApply,
    onClose,
    open,
    setOpen,
  });
  const panelId = useId();
  const budgetName = useId();

  if (embedded) {
    return (
      <div className="font-performer">
        <FilterPanelBody
          draft={draft}
          setDraft={setDraft}
          draftCount={draftCount}
          onClear={handleClearDraft}
          onCancel={handleCancel}
          onApply={handleApply}
          budgetName={`${budgetName}-embedded`}
          showTitle={false}
          scrollable={false}
        />
      </div>
    );
  }

  return (
    <div ref={rootRef} className="relative font-performer">
      <OrangeButton
        label="Filters"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={openPanel}
        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium"
      >
        {appliedCount > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-sand px-1.5 text-xs font-medium text-burnt-orange">
            {appliedCount}
          </span>
        )}
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
        <SearchFiltersDialog
          id={panelId}
          draft={draft}
          setDraft={setDraft}
          draftCount={draftCount}
          onClear={handleClearDraft}
          onCancel={handleCancel}
          onApply={handleApply}
          budgetName={`${budgetName}-dropdown`}
        />
      )}
    </div>
  );
}
