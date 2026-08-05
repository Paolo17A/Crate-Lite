"use client";

import type { Dispatch, SetStateAction } from "react";
import FilterChoiceRow from "@/components/ui/FilterChoiceRow";
import OrangeButton from "@/components/ui/OrangeButton";
import SandPanelShell from "@/components/ui/SandPanelShell";
import TextLink from "@/components/ui/TextLink";
import {
  allGenres,
  budgetRanges,
  categories,
  locations,
} from "@/lib/performers";
import { toggleValue } from "@/lib/search";
import type { FilterSelection } from "@/types/search";

export type FilterPanelBodyProps = {
  draft: FilterSelection;
  setDraft: Dispatch<SetStateAction<FilterSelection>>;
  draftCount: number;
  onClear: () => void;
  onCancel: () => void;
  onApply: () => void;
  budgetName: string;
  showTitle?: boolean;
  scrollable?: boolean;
};

export function FilterPanelBody({
  draft,
  setDraft,
  draftCount,
  onClear,
  onCancel,
  onApply,
  budgetName,
  showTitle = true,
  scrollable = true,
}: FilterPanelBodyProps) {
  return (
    <>
      {(showTitle || draftCount > 0) && (
        <div
          className={`mb-5 flex items-center gap-3 ${
            showTitle ? "justify-between" : "justify-end"
          }`}
        >
          {showTitle && (
            <p className="text-sm font-medium text-espresso">Filter by</p>
          )}
          {draftCount > 0 && (
            <TextLink label="Clear all" onClick={onClear} />
          )}
        </div>
      )}

      <div
        className={`space-y-6 pr-1 ${
          scrollable ? "max-h-[min(70vh,28rem)] overflow-y-auto" : ""
        }`}
      >
        <section>
          <h3 className="text-xs font-medium uppercase tracking-wide text-espresso/55">
            Budget
          </h3>
          <ul className="mt-3 space-y-2.5">
            {budgetRanges.map((range) => (
              <FilterChoiceRow
                key={range.id}
                type="radio"
                name={budgetName}
                label={range.label}
                checked={draft.budgetId === range.id}
                onChange={() =>
                  setDraft((current) => ({
                    ...current,
                    budgetId: range.id,
                  }))
                }
              />
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-xs font-medium uppercase tracking-wide text-espresso/55">
            Location
          </h3>
          <ul className="mt-3 space-y-2.5">
            {locations.map((location) => (
              <FilterChoiceRow
                key={location}
                type="checkbox"
                label={location}
                checked={draft.locations.includes(location)}
                onChange={() =>
                  setDraft((current) => ({
                    ...current,
                    locations: toggleValue(current.locations, location),
                  }))
                }
              />
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-xs font-medium uppercase tracking-wide text-espresso/55">
            Category
          </h3>
          <ul className="mt-3 space-y-2.5">
            {categories.map((category) => (
              <FilterChoiceRow
                key={category}
                type="checkbox"
                label={
                  category === "DJ"
                    ? "DJs"
                    : category === "Other"
                      ? "Other"
                      : `${category}s`
                }
                checked={draft.categories.includes(category)}
                onChange={() =>
                  setDraft((current) => ({
                    ...current,
                    categories: toggleValue(current.categories, category),
                  }))
                }
              />
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-xs font-medium uppercase tracking-wide text-espresso/55">
            Genre
          </h3>
          <ul className="mt-3 space-y-2.5">
            {allGenres.map((genre) => (
              <FilterChoiceRow
                key={genre}
                type="checkbox"
                label={genre}
                checked={draft.genres.includes(genre)}
                onChange={() =>
                  setDraft((current) => ({
                    ...current,
                    genres: toggleValue(current.genres, genre),
                  }))
                }
              />
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-5 flex gap-2 border-t border-stone pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded border border-stone px-4 py-2.5 text-sm font-medium text-espresso transition-colors hover:border-espresso/40"
        >
          Cancel
        </button>
        <OrangeButton
          label="Apply"
          onClick={onApply}
          className="flex-1 px-4 py-2.5 text-sm font-medium"
        />
      </div>
    </>
  );
}

type SearchFiltersDialogProps = FilterPanelBodyProps & {
  id: string;
};

export default function SearchFiltersDialog({
  id,
  ...bodyProps
}: SearchFiltersDialogProps) {
  return (
    <SandPanelShell
      id={id}
      role="dialog"
      aria-label="Search filters"
      className="w-[min(calc(100vw-3rem),22rem)] p-5 sm:p-6"
    >
      <FilterPanelBody {...bodyProps} />
    </SandPanelShell>
  );
}
