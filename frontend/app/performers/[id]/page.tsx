import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProfileMainPanels from "@/components/performer/ProfileMainPanels";
import RelatedPerformers from "@/components/performer/RelatedPerformers";
import {
  getPerformerById,
  getRelatedPerformers,
  performers,
} from "@/data/performers";
import { formatPeso } from "@/lib/format";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return performers.map((p) => ({ id: p.id }));
}

export default async function PerformerProfilePage({ params }: Props) {
  const { id } = await params;
  const performer = getPerformerById(id);

  if (!performer) {
    notFound();
  }

  const related = getRelatedPerformers(performer, 5);

  return (
    <article className="bg-parchment font-performer">
      {/* Full-bleed cover */}
      <div className="relative h-[30vh] w-full overflow-hidden bg-espresso landscape:h-[50vh]">
        <Image
          src={performer.coverUrl}
          alt={`${performer.name} cover`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-espresso/40 via-transparent to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:max-w-[min(90rem,calc(100%-5rem))] lg:px-10">
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
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
              <h1 className="mt-1 text-3xl font-medium text-espresso sm:text-4xl">
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

          <div className="w-full shrink-0 text-center sm:w-64 sm:text-right">
            <p className="text-3xl font-medium text-espresso">
              {formatPeso(performer.price)}
            </p>
            <Link
              href={`/book/${performer.id}`}
              className="mt-4 block w-full rounded-full bg-burnt-orange px-6 py-3.5 text-center text-base font-medium uppercase tracking-wide text-sand transition-colors hover:bg-burnt-orange/90"
            >
              Book Now
            </Link>
          </div>
        </div>

        <div className="py-8 sm:py-10">
          <ProfileMainPanels
            name={performer.name}
            biography={performer.biography}
            gallery={performer.gallery}
          />
        </div>

        <RelatedPerformers performers={related} />
      </div>
    </article>
  );
}
