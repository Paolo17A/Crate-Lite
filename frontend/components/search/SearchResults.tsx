"use client";

import { useEffect, useMemo, useState } from "react";
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
  initialBudget,
}: Props) {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] =
    useState(initialCategories);
  const [selectedLocations, setSelectedLocations] = useState(initialLocations);
  const [budgetId, setBudgetId] = useState(initialBudget);
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZES)[number]>(10);
  const [page, setPage] = useState(1);

  const { minPrice, maxPrice } = budgetFromId(budgetId);

  const results = useMemo(
    () =>
      searchPerformers({
        query: initialQuery,
        categories: selectedCategories,
        locations: selectedLocations,
        minPrice,
        maxPrice,
      }),
    [
      initialQuery,
      selectedCategories,
      selectedLocations,
      minPrice,
      maxPrice,
    ],
  );

  const totalPages = Math.max(1, Math.ceil(results.length / pageSize));

  useEffect(() => {
    setPage(1);
  }, [
    initialQuery,
    selectedCategories,
    selectedLocations,
    budgetId,
    pageSize,
  ]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pageResults = useMemo(() => {
    const start = (page - 1) * pageSize;
    return results.slice(start, start + pageSize);
  }, [results, page, pageSize]);

  function syncUrl(next: {
    categories: string[];
    locations: string[];
    budgetId: string;
  }) {
    const params = new URLSearchParams();
    const q = initialQuery.trim();

    if (q) params.set("q", q);
    for (const cat of next.categories) params.append("category", cat);
    for (const loc of next.locations) params.append("location", loc);
    if (next.budgetId && next.budgetId !== "any") {
      params.set("budget", next.budgetId);
    }

    const qs = params.toString();
    router.replace(qs ? `/search?${qs}` : "/search", { scroll: false });
  }

  function handleApplyFilters(next: {
    categories: string[];
    locations: string[];
    budgetId: string;
  }) {
    setSelectedCategories(next.categories);
    setSelectedLocations(next.locations);
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

  return (
    <div className="flex w-full flex-1 flex-col bg-parchment px-6 py-8 font-performer sm:px-10 sm:py-10 lg:px-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-medium text-espresso sm:text-3xl">
          {heading}
        </h1>

        <div className="flex flex-wrap items-center gap-3 sm:gap-6">
          <SearchFilters
            applied={{
              categories: selectedCategories,
              locations: selectedLocations,
              budgetId,
            }}
            onApply={handleApplyFilters}
          />

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
        </div>
      </div>

      {results.length === 0 ? (
        <div className="flex flex-1 items-center justify-center py-24 sm:py-32">
          <p className="text-center text-2xl font-bold text-black sm:text-3xl md:text-4xl">
            No performers matched your filters.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
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
