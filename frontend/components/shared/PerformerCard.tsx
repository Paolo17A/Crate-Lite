import Image from "next/image";
import Link from "next/link";
import { formatPeso } from "@/lib/format";
import type { Performer } from "@/types/performer";

type Props = {
  performer: Performer;
};

export default function PerformerCard({ performer }: Props) {
  return (
    <article className="instax-print group relative bg-[#faf7f2] transition-transform duration-300 hover:-translate-y-1.5">
      {/* Glossy paper sheen across the print */}
      <div
        className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(135deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.12)_28%,rgba(255,255,255,0)_48%,rgba(255,255,255,0.08)_72%,rgba(255,255,255,0.2)_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-20 mix-blend-soft-light opacity-40 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.7),transparent_55%)]"
        aria-hidden="true"
      />

      <Link
        href={`/performers/${performer.id}`}
        draggable={false}
        className="relative z-10 block"
      >
        <div className="p-2.5 pb-0">
          <div className="relative aspect-square overflow-hidden bg-espresso/10">
            <Image
              src={performer.photoUrl}
              alt={performer.name}
              fill
              sizes="220px"
              draggable={false}
              className="pointer-events-none object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/40 via-transparent to-black/10"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="px-3 pt-3 pb-3">
          <h2 className="truncate font-headline text-base text-espresso">
            {performer.name}
          </h2>
          <p className="mt-0.5 text-xs font-medium text-espresso/80">
            from {formatPeso(performer.price)}
          </p>
          <p className="mt-1 truncate text-[11px] text-espresso/55">
            {performer.genres.slice(0, 2).join(" · ")} · {performer.location}
          </p>
        </div>
      </Link>

      <div className="relative z-30 px-3 pb-3">
        <Link
          href={`/book/${performer.id}`}
          draggable={false}
          className="block rounded-xs bg-burnt-orange px-3 py-2 text-center text-xs font-medium uppercase tracking-wide text-sand transition-colors hover:bg-burnt-orange/90"
        >
          Book Now
        </Link>
      </div>
    </article>
  );
}
