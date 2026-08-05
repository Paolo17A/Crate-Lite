import SearchResults from "@/components/search/SearchResults";
import { budgetRanges } from "@/data/performers";

type Props = {
  searchParams: Promise<{
    q?: string;
    category?: string | string[];
    location?: string | string[];
    genre?: string | string[];
    budget?: string;
  }>;
};

function toArray(value?: string | string[]) {
  if (!value) return [];
  return (Array.isArray(value) ? value : [value])
    .flatMap((item) => item.split(","))
    .map((item) => item.trim())
    .filter(Boolean);
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const q = params.q ?? "";
  const categories = toArray(params.category);
  const locations = toArray(params.location);
  const genres = toArray(params.genre);
  const budget =
    budgetRanges.some((range) => range.id === params.budget) && params.budget
      ? params.budget
      : "any";

  return (
    <div className="flex min-h-full flex-1 flex-col bg-parchment">
      <SearchResults
        key={`${q}-${categories.join(",")}-${locations.join(",")}-${genres.join(",")}-${budget}`}
        initialQuery={q}
        initialCategories={categories}
        initialLocations={locations}
        initialGenres={genres}
        initialBudget={budget}
      />
    </div>
  );
}
