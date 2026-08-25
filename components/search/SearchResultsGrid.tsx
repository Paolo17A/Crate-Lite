import PerformerCard from "@/components/shared/PerformerCard";
import type { Performer } from "@/types/performer";

type Props = {
  performers: Performer[];
};

export default function SearchResultsGrid({ performers }: Props) {
  if (performers.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center py-24 sm:py-32">
        <p className="text-center text-2xl font-bold text-black sm:text-3xl md:text-4xl">
          No performers matched your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5">
      {performers.map((performer) => (
        <div
          key={performer.id}
          className="min-w-0 w-full max-w-57.5 justify-self-center"
        >
          <PerformerCard performer={performer} />
        </div>
      ))}
    </div>
  );
}
