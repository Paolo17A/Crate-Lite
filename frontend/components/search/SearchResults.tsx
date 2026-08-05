"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import PerformerCard from "@/components/shared/PerformerCard";
import SearchFilters from "@/components/search/SearchFilters";
import {
  budgetRanges,
  searchPerformers,
} from "@/data/performers";

type Props = {
  initialQuery: string;
  initialCategories: string[];
  initialLocations: string[];
  initialGenres: string[];
  initialBudget: string;
};

const PAGE_SIZES = [5, 10, 20] as const;

function budgetFromId(budgetId: string) {
  const range = budgetRanges.find((r) => r.id === budgetId) ?? budgetRanges[0];
  return {
    minPrice: range.min,
    maxPrice: range.max,
  };
}

export default function SearchResults({
  initialQuery,
  initialCategories,
  initialLocations,
  initialGenres,
  initialBudget,
}: Props) {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] =
    useState(initialCategories);
  const [selectedLocations, setSelectedLocations] = useState(initialLocations);
  const [selectedGenres, setSelectedGenres] = useState(initialGenres);
  const [budgetId, setBudgetId] = useState(initialBudget);
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZES)[number]>(10);
  const [page, setPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { minPrice, maxPrice } = budgetFromId(budgetId);

  const results = useMemo(
    () =>
      searchPerformers({
        query: initialQuery,
        categories: selectedCategories,
        locations: selectedLocations,
        genres: selectedGenres,
        minPrice,
        maxPrice,
      }),
    [
      initialQuery,
      selectedCategories,
      selectedLocations,
      selectedGenres,
      minPrice,
      maxPrice,
    ],
  );

  const totalPages = Math.max(1, Math.ceil(results.length / pageSize));

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const sync = () => {
      setIsCompact(media.matches);
      if (!media.matches) setMenuOpen(false);
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [
    initialQuery,
    selectedCategories,
    selectedLocations,
    selectedGenres,
    budgetId,
    pageSize,
  ]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const pageResults = useMemo(() => {
    const start = (page - 1) * pageSize;
    return results.slice(start, start + pageSize);
  }, [results, page, pageSize]);

  function syncUrl(next: {
    categories: string[];
    locations: string[];
    genres: string[];
    budgetId: string;
  }) {
    const params = new URLSearchParams();
    const q = initialQuery.trim();

    if (q) params.set("q", q);
    for (const cat of next.categories) params.append("category", cat);
    for (const loc of next.locations) params.append("location", loc);
    for (const genre of next.genres) params.append("genre", genre);
    if (next.budgetId && next.budgetId !== "any") {
      params.set("budget", next.budgetId);
    }

    const qs = params.toString();
    router.replace(qs ? `/search?${qs}` : "/search", { scroll: false });
  }

  function handleApplyFilters(next: {
    categories: string[];
    locations: string[];
    genres: string[];
    budgetId: string;
  }) {
    setSelectedCategories(next.categories);
    setSelectedLocations(next.locations);
    setSelectedGenres(next.genres);
    setBudgetId(next.budgetId);
    syncUrl(next);
  }

  const q = initialQuery.trim();
  const count = results.length;
  const heading = q
    ? `Displaying ${count} result${count === 1 ? "" : "s"} for "${q}"`
    : selectedCategories.length === 1
      ? `Displaying ${count} result${count === 1 ? "" : "s"} for ${
          selectedCategories[0] === "Other"
            ? "Other"
            : selectedCategories[0] === "DJ"
              ? "DJs"
              : `${selectedCategories[0]}s`
        }`
      : `Displaying ${count} result${count === 1 ? "" : "s"}`;

  const rangeStart = count === 0 ? 0 : (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, count);
  const appliedFilterCount =
    selectedCategories.length +
    selectedLocations.length +
    selectedGenres.length +
    (budgetId !== "any" ? 1 : 0);

  const pageSizeControl = (
    <label className="inline-flex items-center gap-2 text-sm text-espresso">
      <span className="text-espresso/60">Show</span>
      <select
        value={pageSize}
        onChange={(e) =>
          setPageSize(Number(e.target.value) as (typeof PAGE_SIZES)[number])
        }
        className="rounded border border-burnt-orange bg-sand px-3 py-2.5 text-sm text-espresso outline-none transition focus:border-burnt-orange focus:ring-2 focus:ring-burnt-orange/30"
      >
        {PAGE_SIZES.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      <span className="text-espresso/60">per page</span>
    </label>
  );

  const filtersControl = (
    <SearchFilters
      applied={{
        categories: selectedCategories,
        locations: selectedLocations,
        genres: selectedGenres,
        budgetId,
      }}
      onApply={handleApplyFilters}
    />
  );

  const embeddedFilters = (
    <SearchFilters
      embedded
      applied={{
        categories: selectedCategories,
        locations: selectedLocations,
        genres: selectedGenres,
        budgetId,
      }}
      onApply={handleApplyFilters}
      onClose={() => setMenuOpen(false)}
    />
  );

  return (
    <div className="flex w-full flex-1 flex-col bg-parchment px-6 py-8 font-performer sm:px-10 sm:py-10 lg:px-16">
      <div className="flex items-center justify-between gap-3">
        <h1 className="min-w-0 text-2xl font-medium text-espresso sm:text-3xl">
          {heading}
        </h1>

        {!isCompact ? (
          <div className="flex items-center gap-6">
            {filtersControl}
            {pageSizeControl}
          </div>
        ) : (
          <div ref={menuRef} className="relative shrink-0">
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-label="Open search options"
              onClick={() => setMenuOpen((open) => !open)}
              className="relative flex h-10 w-10 items-center justify-center rounded border border-burnt-orange bg-burnt-orange text-sand transition-colors hover:bg-burnt-orange/90"
            >
              <span className="sr-only">Menu</span>
              <span className="flex flex-col gap-1.5" aria-hidden="true">
                <span className="block h-0.5 w-5 rounded-full bg-sand" />
                <span className="block h-0.5 w-5 rounded-full bg-sand" />
                <span className="block h-0.5 w-5 rounded-full bg-sand" />
              </span>
              {appliedFilterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-sand px-1 text-xs font-medium text-burnt-orange">
                  {appliedFilterCount}
                </span>
              )}
            </button>

            {menuOpen && (
              <div className="absolute right-0 z-30 mt-2 w-[min(100vw-2rem,22rem)] rounded-lg border border-stone bg-sand p-4 shadow-lg sm:p-5">
                {embeddedFilters}
                <div className="mt-4 border-t border-stone pt-4">
                  {pageSizeControl}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {results.length === 0 ? (
        <div className="flex flex-1 items-center justify-center py-24 sm:py-32">
          <p className="text-center text-2xl font-bold text-black sm:text-3xl md:text-4xl">
            No performers matched your filters.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5">
            {pageResults.map((performer) => (
              <div key={performer.id} className="min-w-0 w-full max-w-[230px] justify-self-center">
                <PerformerCard performer={performer} />
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-stone pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-espresso/60">
              Showing {rangeStart}–{rangeEnd} of {count}
            </p>

            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="rounded bg-burnt-orange px-4 py-2 text-sm font-medium text-sand transition hover:bg-burnt-orange/90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="px-2 text-sm text-espresso">
                  Page {page} of {totalPages}
                </span>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="rounded bg-burnt-orange px-4 py-2 text-sm font-medium text-sand transition hover:bg-burnt-orange/90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
