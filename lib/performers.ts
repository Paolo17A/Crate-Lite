import { performers } from "@/data/performers";
import type { Performer } from "@/types/performer";
import type { BudgetRange, PerformerSearchFilters } from "@/types/search";

export function getPerformerById(id: string): Performer | undefined {
  return performers.find((p) => p.id === id);
}

export function getRelatedPerformers(
  performer: Performer,
  limit = 4,
): Performer[] {
  const genreSet = new Set(performer.genres);

  const ranked = performers
    .filter((p) => p.id !== performer.id)
    .map((p) => {
      let score = 0;
      if (p.category === performer.category) score += 3;
      if (p.location === performer.location) score += 1;
      for (const genre of p.genres) {
        if (genreSet.has(genre)) score += 2;
      }
      return { performer: p, score };
    })
    .sort((a, b) => b.score - a.score);

  return ranked.slice(0, limit).map(({ performer: p }) => p);
}

export function searchPerformers({
  query = "",
  categories = [],
  locations = [],
  genres = [],
  minPrice,
  maxPrice,
}: PerformerSearchFilters = {}) {
  const q = query.trim().toLowerCase();
  const cats = categories.map((c) => c.trim()).filter(Boolean);
  const locs = locations.map((l) => l.trim()).filter(Boolean);
  const gens = genres.map((g) => g.trim()).filter(Boolean);

  return performers.filter((p) => {
    if (cats.length > 0 && !cats.includes(p.category)) return false;
    if (locs.length > 0 && !locs.includes(p.location)) return false;
    if (gens.length > 0 && !gens.some((g) => p.genres.includes(g))) return false;
    if (minPrice !== undefined && p.price < minPrice) return false;
    if (maxPrice !== undefined && p.price > maxPrice) return false;

    if (!q) return true;

    const haystack = [p.name, p.category, p.location, ...p.genres]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q) || p.name.toLowerCase().includes(q);
  });
}

export const categories = ["Musician", "Band", "DJ", "Other"] as const;

export const locations = [
  "Metro Manila",
  "Palawan",
  "Cebu",
  "Davao",
  "Others",
] as const;

export const budgetRanges = [
  { id: "any", label: "Any budget", min: undefined, max: undefined },
  { id: "under-75k", label: "Under ₱75,000", min: undefined, max: 75000 },
  {
    id: "75-150k",
    label: "₱75,000 – ₱150,000",
    min: 75000,
    max: 150000,
  },
  {
    id: "150-300k",
    label: "₱150,000 – ₱300,000",
    min: 150000,
    max: 300000,
  },
  { id: "300k-plus", label: "₱300,000+", min: 300000, max: undefined },
] as const satisfies readonly BudgetRange[];

export const allGenres = Array.from(
  new Set(performers.flatMap((p) => p.genres)),
).sort();
