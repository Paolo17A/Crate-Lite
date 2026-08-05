"use client";

import type { RefObject } from "react";
import SearchFilters from "@/components/search/SearchFilters";
import SearchSort from "@/components/search/SearchSort";
import type { PageSize } from "@/lib/search";
import type { FilterSelection, SortSelection } from "@/types/search";

type Props = {
  isCompact: boolean;
  menuOpen: boolean;
  setMenuOpen: (open: boolean | ((current: boolean) => boolean)) => void;
  menuRef: RefObject<HTMLDivElement | null>;
  applied: FilterSelection;
  appliedFilterCount: number;
  sort: SortSelection;
  onSortChange: (next: SortSelection) => void;
  onApplyFilters: (next: FilterSelection) => void;
  pageSize: PageSize;
  pageSizes: readonly PageSize[];
  onPageSizeChange: (size: PageSize) => void;
};

function PageSizeControl({
  pageSize,
  pageSizes,
  onPageSizeChange,
}: {
  pageSize: PageSize;
  pageSizes: readonly PageSize[];
  onPageSizeChange: (size: PageSize) => void;
}) {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-espresso">
      <span className="text-espresso/60">Show</span>
      <select
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value) as PageSize)}
        className="rounded border border-burnt-orange bg-sand px-3 py-2.5 text-sm text-espresso outline-none transition focus:border-burnt-orange focus:ring-2 focus:ring-burnt-orange/30"
      >
        {pageSizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      <span className="text-espresso/60">per page</span>
    </label>
  );
}

export default function SearchToolbar({
  isCompact,
  menuOpen,
  setMenuOpen,
  menuRef,
  applied,
  appliedFilterCount,
  sort,
  onSortChange,
  onApplyFilters,
  pageSize,
  pageSizes,
  onPageSizeChange,
}: Props) {
  const pageSizeControl = (
    <PageSizeControl
      pageSize={pageSize}
      pageSizes={pageSizes}
      onPageSizeChange={onPageSizeChange}
    />
  );

  if (!isCompact) {
    return (
      <div className="flex items-center gap-6">
        <SearchSort value={sort} onChange={onSortChange} />
        <SearchFilters applied={applied} onApply={onApplyFilters} />
        {pageSizeControl}
      </div>
    );
  }

  return (
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
        <div className="absolute right-0 z-30 mt-2 max-h-[min(80vh,40rem)] w-[min(100vw-2rem,22rem)] overflow-y-auto rounded-lg border border-stone bg-sand p-4 shadow-lg sm:p-5">
          <SearchSort value={sort} onChange={onSortChange} embedded />
          <div className="mt-4 border-t border-stone pt-4">
            <SearchFilters
              embedded
              applied={applied}
              onApply={onApplyFilters}
              onClose={() => setMenuOpen(false)}
            />
          </div>
          <div className="mt-4 border-t border-stone pt-4">
            {pageSizeControl}
          </div>
        </div>
      )}
    </div>
  );
}
