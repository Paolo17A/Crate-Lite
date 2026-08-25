import { notFound } from "next/navigation";
import BookPerformer from "@/components/performer/BookPerformer";
import CoverBanner from "@/components/performer/CoverBanner";
import PerformerProfile from "@/components/performer/PerformerProfile";
import ProfileMainPanels from "@/components/performer/ProfileMainPanels";
import RelatedPerformers from "@/components/performer/RelatedPerformers";
import { performers } from "@/data/performers";
import {
  getPerformerById,
  getRelatedPerformers,
} from "@/lib/performers";

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
      <CoverBanner name={performer.name} coverUrl={performer.coverUrl} />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:max-w-[min(90rem,calc(100%-5rem))] lg:px-10">
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          <PerformerProfile performer={performer} />
          <BookPerformer performer={performer} />
        </div>
        <ProfileMainPanels
          name={performer.name}
          biography={performer.biography}
          gallery={performer.gallery}
        />
        <RelatedPerformers performers={related} />
      </div>
    </article>
  );
}
