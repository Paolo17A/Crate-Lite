import PerformerCard from "@/components/shared/PerformerCard";
import type { Performer } from "@/types/performer";

type Props = {
  performers: Performer[];
};

const RELATED_COUNT = 5;

export default function RelatedPerformers({ performers }: Props) {
  const visible = performers.slice(0, RELATED_COUNT);

  if (visible.length === 0) return null;

  return (
    <section
      className="border-t border-stone py-10 sm:py-12"
      aria-label="Related performers"
    >
      <h2 className="font-headline text-2xl text-espresso sm:text-3xl">
        Related Performers
      </h2>
      <ul className="mt-6 flex flex-wrap justify-center gap-5 sm:gap-6">
        {visible.map((performer) => (
          <li key={performer.id} className="w-52.5 shrink-0 sm:w-57.5">
            <PerformerCard performer={performer} />
          </li>
        ))}
      </ul>
    </section>
  );
}
