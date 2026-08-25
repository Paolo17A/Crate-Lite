"use client";

import PerformerCard from "@/components/shared/PerformerCard";
import TextLink from "@/components/ui/TextLink";
import { useDragScroll } from "@/hooks/useDragScroll";
import type { Performer, PerformerCategory } from "@/types/performer";

type Props = {
  title: string;
  category: PerformerCategory;
  performers: Performer[];
};

export default function CategoryRow({ title, category, performers }: Props) {
  const { ref, dragging, centered } = useDragScroll<HTMLUListElement>([
    performers,
  ]);

  if (performers.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-center text-xl font-medium text-espresso sm:text-2xl">
        {title}
      </h2>
      <div className="relative">
        <ul
          ref={ref}
          className={`flex gap-5 overflow-x-auto pt-3 pb-6 scrollbar-thin select-none sm:gap-6 ${
            centered ? "justify-center" : "justify-start"
          } ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {performers.map((performer) => (
            <li
              key={performer.id}
              className="w-52.5 shrink-0 sm:w-57.5"
            >
              <PerformerCard performer={performer} />
            </li>
          ))}
        </ul>
      </div>
      <div className="text-center">
        <TextLink
          label="View All"
          href={`/search?category=${encodeURIComponent(category)}`}
          className="font-performer"
        />
      </div>
    </div>
  );
}
