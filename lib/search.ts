import { budgetRanges } from "@/lib/performers";
import type { Performer } from "@/types/performer";
import type { FilterSelection, SortSelection } from "@/types/search";

export const PAGE_SIZES = [5, 10, 20] as const;
export type PageSize = (typeof PAGE_SIZES)[number];

export function budgetFromId(budgetId: string) {
  const range = budgetRanges.find((r) => r.id === budgetId) ?? budgetRanges[0];
  return {
    minPrice: range.min,
    maxPrice: range.max,
  };
}

export function sortPerformers(
  list: Performer[],
  sort: SortSelection,
): Performer[] {
  const sorted = [...list];
  const direction = sort.direction === "asc" ? 1 : -1;

  sorted.sort((a, b) => {
    if (sort.field === "name") {
      return (
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" }) *
        direction
      );
    }
    if (a.price !== b.price) {
      return (a.price - b.price) * direction;
    }
    return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
  });

  return sorted;
}

export function buildSearchPath(
  query: string,
  filters: FilterSelection,
): string {
  const params = new URLSearchParams();
  const q = query.trim();

  if (q) params.set("q", q);
  for (const cat of filters.categories) params.append("category", cat);
  for (const loc of filters.locations) params.append("location", loc);
  for (const genre of filters.genres) params.append("genre", genre);
  if (filters.budgetId && filters.budgetId !== "any") {
    params.set("budget", filters.budgetId);
  }

  const qs = params.toString();
  return qs ? `/search?${qs}` : "/search";
}

export function formatSearchHeading(
  query: string,
  filters: FilterSelection,
  count: number,
): string {
  const q = query.trim();
  if (q) {
    return `Displaying ${count} result${count === 1 ? "" : "s"} for "${q}"`;
  }

  if (countActiveFilters(filters) === 0) {
    return `Displaying all ${count} performers`;
  }

  if (filters.categories.length === 1) {
    const category = filters.categories[0];
    const label =
      category === "Other"
        ? "Other"
        : category === "DJ"
          ? "DJs"
          : `${category}s`;
    return `Displaying ${count} result${count === 1 ? "" : "s"} for ${label}`;
  }

  return `Displaying ${count} result${count === 1 ? "" : "s"}`;
}

export function countActiveFilters(filters: FilterSelection): number {
  return (
    filters.categories.length +
    filters.locations.length +
    filters.genres.length +
    (filters.budgetId !== "any" ? 1 : 0)
  );
}

export function toggleValue(list: string[], value: string): string[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

export function emptyFilterSelection(): FilterSelection {
  return {
    categories: [],
    locations: [],
    genres: [],
    budgetId: "any",
  };
}
