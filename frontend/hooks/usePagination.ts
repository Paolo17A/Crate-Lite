"use client";

import { useCallback, useMemo, useState } from "react";
import { PAGE_SIZES, type PageSize } from "@/lib/search";

type Args<T> = {
  items: T[];
  /** When this changes, page resets to 1 (no effect). */
  resetKey: string;
};

export function usePagination<T>({ items, resetKey }: Args<T>) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSizeState] = useState<PageSize>(10);
  const [prevResetKey, setPrevResetKey] = useState(resetKey);

  if (resetKey !== prevResetKey) {
    setPrevResetKey(resetKey);
    setPage(1);
  }

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, currentPage, pageSize]);

  const rangeStart = items.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, items.length);

  const setPageSize = useCallback((size: PageSize) => {
    setPageSizeState(size);
    setPage(1);
  }, []);

  const goToPrevious = useCallback(() => {
    setPage((p) => Math.max(1, Math.min(p, totalPages) - 1));
  }, [totalPages]);

  const goToNext = useCallback(() => {
    setPage((p) => Math.min(totalPages, Math.min(p, totalPages) + 1));
  }, [totalPages]);

  return {
    page: currentPage,
    pageSize,
    pageSizes: PAGE_SIZES,
    totalPages,
    pageItems,
    rangeStart,
    rangeEnd,
    setPageSize,
    goToPrevious,
    goToNext,
  };
}
