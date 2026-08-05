"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { searchPerformers } from "@/lib/performers";
import {
  budgetFromId,
  buildSearchPath,
  sortPerformers,
} from "@/lib/search";
import type { FilterSelection, SortSelection } from "@/types/search";

type Args = {
  initialQuery: string;
  initialCategories: string[];
  initialLocations: string[];
  initialGenres: string[];
  initialBudget: string;
};

export function useSearchResults({
  initialQuery,
  initialCategories,
  initialLocations,
  initialGenres,
  initialBudget,
}: Args) {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] =
    useState(initialCategories);
  const [selectedLocations, setSelectedLocations] = useState(initialLocations);
  const [selectedGenres, setSelectedGenres] = useState(initialGenres);
  const [budgetId, setBudgetId] = useState(initialBudget);
  const [sort, setSort] = useState<SortSelection>({
    field: "name",
    direction: "asc",
  });

  const applied: FilterSelection = useMemo(
    () => ({
      categories: selectedCategories,
      locations: selectedLocations,
      genres: selectedGenres,
      budgetId,
    }),
    [selectedCategories, selectedLocations, selectedGenres, budgetId],
  );

  const { minPrice, maxPrice } = budgetFromId(budgetId);

  const results = useMemo(() => {
    const matched = searchPerformers({
      query: initialQuery,
      categories: selectedCategories,
      locations: selectedLocations,
      genres: selectedGenres,
      minPrice,
      maxPrice,
    });
    return sortPerformers(matched, sort);
  }, [
    initialQuery,
    selectedCategories,
    selectedLocations,
    selectedGenres,
    minPrice,
    maxPrice,
    sort,
  ]);

  const resetKey = useMemo(
    () =>
      JSON.stringify({
        q: initialQuery,
        applied,
        sort,
      }),
    [initialQuery, applied, sort],
  );

  const handleApplyFilters = useCallback(
    (next: FilterSelection) => {
      setSelectedCategories(next.categories);
      setSelectedLocations(next.locations);
      setSelectedGenres(next.genres);
      setBudgetId(next.budgetId);
      router.replace(buildSearchPath(initialQuery, next), { scroll: false });
    },
    [initialQuery, router],
  );

  return {
    applied,
    sort,
    setSort,
    results,
    resetKey,
    handleApplyFilters,
  };
}
