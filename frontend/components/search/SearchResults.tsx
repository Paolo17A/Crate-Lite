"use client";

import SearchPagination from "@/components/search/SearchPagination";
import SearchResultsGrid from "@/components/search/SearchResultsGrid";
import SearchToolbar from "@/components/search/SearchToolbar";
import { useCompactMenu } from "@/hooks/useCompactMenu";
import { usePagination } from "@/hooks/usePagination";
import { useSearchResults } from "@/hooks/useSearchResults";
import { countActiveFilters, formatSearchHeading } from "@/lib/search";

type Props = {
  initialQuery: string;
  initialCategories: string[];
  initialLocations: string[];
  initialGenres: string[];
  initialBudget: string;
};

export default function SearchResults({
  initialQuery,
  initialCategories,
  initialLocations,
  initialGenres,
  initialBudget,
}: Props) {
  const { isCompact, menuOpen, setMenuOpen, menuRef } = useCompactMenu();

  const { applied, sort, setSort, results, resetKey, handleApplyFilters } =
    useSearchResults({
      initialQuery,
      initialCategories,
      initialLocations,
      initialGenres,
      initialBudget,
    });

  const {
    page,
    pageSize,
    pageSizes,
    totalPages,
    pageItems,
    rangeStart,
    rangeEnd,
    setPageSize,
    goToPrevious,
    goToNext,
  } = usePagination({ items: results, resetKey });

  const heading = formatSearchHeading(
    initialQuery,
    applied.categories,
    results.length,
  );
  const appliedFilterCount = countActiveFilters(applied);

  return (
    <div className="flex w-full flex-1 flex-col bg-parchment px-6 py-8 font-performer sm:px-10 sm:py-10 lg:px-16">
      <div className="flex items-center justify-between gap-3">
        <h1 className="min-w-0 text-2xl font-medium text-espresso sm:text-3xl">
          {heading}
        </h1>

        <SearchToolbar
          isCompact={isCompact}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          menuRef={menuRef}
          applied={applied}
          appliedFilterCount={appliedFilterCount}
          sort={sort}
          onSortChange={setSort}
          onApplyFilters={handleApplyFilters}
          pageSize={pageSize}
          pageSizes={pageSizes}
          onPageSizeChange={setPageSize}
        />
      </div>

      {results.length === 0 ? (
        <SearchResultsGrid performers={[]} />
      ) : (
        <>
          <SearchResultsGrid performers={pageItems} />
          <SearchPagination
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            count={results.length}
            page={page}
            totalPages={totalPages}
            onPrevious={goToPrevious}
            onNext={goToNext}
          />
        </>
      )}
    </div>
  );
}
