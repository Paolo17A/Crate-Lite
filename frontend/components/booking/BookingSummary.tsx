import Image from "next/image";
import TextLink from "@/components/ui/TextLink";
import { formatPeso } from "@/lib/format";
import type { Performer } from "@/types/performer";

type Props = {
  performer: Performer;
};

export default function BookingSummary({ performer }: Props) {
  const genres = performer.genres.slice(0, 3);

  return (
    <aside className="rounded-lg border border-stone bg-sand p-5 shadow-sm sm:p-6">
      <p className="text-xs font-medium uppercase tracking-wide text-espresso/55">
        Booking summary
      </p>

      <div className="mt-4 flex gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded border border-stone bg-stone/40 sm:h-24 sm:w-24">
          <Image
            src={performer.photoUrl}
            alt={performer.name}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="font-performer text-xl font-bold text-espresso sm:text-2xl">
            {performer.name}
          </h2>
          <p className="mt-1 text-sm text-espresso/60">
            {performer.category} · {performer.location}
          </p>
          <TextLink
            label="View Profile"
            href={`/performers/${performer.id}`}
            className="mt-2 inline-block"
          />
        </div>
      </div>

      {genres.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {genres.map((genre) => (
            <li
              key={genre}
              className="border border-stone px-2.5 py-1 text-xs text-espresso"
            >
              {genre}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 border-t border-stone pt-4">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-sm text-espresso/60">Talent Fee</span>
          <span className="text-xl font-medium text-espresso">
            {formatPeso(performer.price)}
          </span>
        </div>
      </div>
    </aside>
  );
}
