"use client";

import { useEffect, useId, useRef, useState, type Dispatch, type SetStateAction } from "react";
import {
  allGenres,
  budgetRanges,
  categories,
  locations,
} from "@/lib/performers";
import type { FilterSelection } from "@/types/search";

export type { FilterSelection };

type Props = {
  applied: FilterSelection;
  onApply: (next: FilterSelection) => void;
  /** Render panel content inline (no Filters button). */
  embedded?: boolean;
  onClose?: () => void;
};

function toggleValue(list: string[], value: string) {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

function countActive(filters: FilterSelection) {
  return (
    filters.categories.length +
    filters.locations.length +
    filters.genres.length +
    (filters.budgetId !== "any" ? 1 : 0)
  );
}

function FilterPanelBody({
  draft,
  setDraft,
  draftCount,
  onClear,
  onCancel,
  onApply,
  budgetName,
  showTitle = true,
  scrollable = true,
}: {
  draft: FilterSelection;
  setDraft: Dispatch<SetStateAction<FilterSelection>>;
  draftCount: number;
  onClear: () => void;
  onCancel: () => void;
  onApply: () => void;
  budgetName: string;
  showTitle?: boolean;
  scrollable?: boolean;
}) {
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
            <button
              type="button"
              onClick={onClear}
              className="text-sm font-medium text-burnt-orange underline underline-offset-4 transition-opacity hover:opacity-80"
            >
              Clear all
            </button>
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
              <li key={range.id}>
                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-espresso">
                  <input
                    type="radio"
                    name={budgetName}
                    checked={draft.budgetId === range.id}
                    onChange={() =>
                      setDraft((current) => ({
                        ...current,
                        budgetId: range.id,
                      }))
                    }
                    className="h-4 w-4 accent-burnt-orange"
                  />
                  <span>{range.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-xs font-medium uppercase tracking-wide text-espresso/55">
            Location
          </h3>
          <ul className="mt-3 space-y-2.5">
            {locations.map((location) => {
              const checked = draft.locations.includes(location);
              return (
                <li key={location}>
                  <label className="flex cursor-pointer items-center gap-2.5 text-sm text-espresso">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        setDraft((current) => ({
                          ...current,
                          locations: toggleValue(current.locations, location),
                        }))
                      }
                      className="h-4 w-4 accent-burnt-orange"
                    />
                    <span>{location}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </section>

        <section>
          <h3 className="text-xs font-medium uppercase tracking-wide text-espresso/55">
            Category
          </h3>
          <ul className="mt-3 space-y-2.5">
            {categories.map((category) => {
              const checked = draft.categories.includes(category);
              return (
                <li key={category}>
                  <label className="flex cursor-pointer items-center gap-2.5 text-sm text-espresso">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        setDraft((current) => ({
                          ...current,
                          categories: toggleValue(current.categories, category),
                        }))
                      }
                      className="h-4 w-4 accent-burnt-orange"
                    />
                    <span>
                      {category === "DJ"
                        ? "DJs"
                        : category === "Other"
                          ? "Other"
                          : `${category}s`}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </section>

        <section>
          <h3 className="text-xs font-medium uppercase tracking-wide text-espresso/55">
            Genre
          </h3>
          <ul className="mt-3 space-y-2.5">
            {allGenres.map((genre) => {
              const checked = draft.genres.includes(genre);
              return (
                <li key={genre}>
                  <label className="flex cursor-pointer items-center gap-2.5 text-sm text-espresso">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        setDraft((current) => ({
                          ...current,
                          genres: toggleValue(current.genres, genre),
                        }))
                      }
                      className="h-4 w-4 accent-burnt-orange"
                    />
                    <span>{genre}</span>
                  </label>
                </li>
              );
            })}
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
        <button
          type="button"
          onClick={onApply}
          className="flex-1 rounded bg-burnt-orange px-4 py-2.5 text-sm font-medium text-sand transition-colors hover:bg-burnt-orange/90"
        >
          Apply
        </button>
      </div>
    </>
  );
}

export default function SearchFilters({
  applied,
  onApply,
  embedded = false,
  onClose,
}: Props) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<FilterSelection>(applied);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const budgetName = useId();

  const appliedCount = countActive(applied);
  const draftCount = countActive(draft);

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

  function handleApply() {
    onApply(draft);
    setOpen(false);
    onClose?.();
  }

  function handleCancel() {
    setDraft(applied);
    setOpen(false);
    onClose?.();
  }

  function handleClearDraft() {
    setDraft({
      categories: [],
      locations: [],
      genres: [],
      budgetId: "any",
    });
  }

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
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          if (!open) setDraft(applied);
          setOpen((value) => !value);
        }}
        className="inline-flex items-center gap-2 rounded bg-burnt-orange px-4 py-2.5 text-sm font-medium text-sand transition-colors hover:bg-burnt-orange/90"
      >
        Filters
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
      </button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Search filters"
          className="absolute right-0 z-30 mt-2 w-[min(calc(100vw-3rem),22rem)] rounded-lg border border-stone bg-sand p-5 shadow-lg sm:p-6"
        >
          <FilterPanelBody
            draft={draft}
            setDraft={setDraft}
            draftCount={draftCount}
            onClear={handleClearDraft}
            onCancel={handleCancel}
            onApply={handleApply}
            budgetName={`${budgetName}-dropdown`}
          />
        </div>
      )}
    </div>
  );
}
