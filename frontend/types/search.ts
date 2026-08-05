import type { PerformerCategory } from "@/types/performer";

export type PerformerSearchFilters = {
  query?: string;
  categories?: string[];
  locations?: string[];
  genres?: string[];
  minPrice?: number;
  maxPrice?: number;
};

export type FilterSelection = {
  categories: string[];
  locations: string[];
  genres: string[];
  budgetId: string;
};

export type SortField = "name" | "budget";
export type SortDirection = "asc" | "desc";

export type SortSelection = {
  field: SortField;
  direction: SortDirection;
};

export type BudgetRange = {
  id: string;
  label: string;
  min: number | undefined;
  max: number | undefined;
};
