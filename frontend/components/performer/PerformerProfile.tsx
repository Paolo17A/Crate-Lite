import Image from "next/image";
import type { Performer } from "@/types/performer";

type Props = {
  performer: Performer;
};

export default function PerformerProfile({ performer }: Props) {
  return (
    <div className="flex min-w-0 flex-1 items-start gap-4 sm:gap-5">
      {performer.photoUrl !== performer.coverUrl && (
        <div className="relative mt-1 h-16 w-16 shrink-0 overflow-hidden rounded-full border border-stone bg-stone/40 sm:h-20 sm:w-20">
          <Image
            src={performer.photoUrl}
            alt={`${performer.name} profile`}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
      )}
      <div className="min-w-0">
        <p className="text-sm uppercase tracking-wide text-espresso/55">
          {performer.category} · {performer.location}
        </p>
        <h1 className="mt-1 font-performer text-3xl font-bold text-espresso sm:text-4xl">
          {performer.name}
        </h1>
        <ul className="mt-3 flex flex-wrap gap-2">
          {performer.genres.map((genre) => (
            <li
              key={genre}
              className="border border-stone px-3 py-1 text-sm text-espresso"
            >
              {genre}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
