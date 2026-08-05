import { notFound } from "next/navigation";
import BookingForm from "@/components/booking/BookingForm";
import { getPerformerById, performers } from "@/data/performers";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return performers.map((p) => ({ id: p.id }));
}

export default async function BookingPage({ params }: Props) {
  const { id } = await params;
  const performer = getPerformerById(id);

  if (!performer) {
    notFound();
  }

  return (
    <div className="bg-parchment px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-xl rounded-lg border border-stone bg-sand p-6 text-center shadow-sm sm:p-8">
        <h1 className="font-performer text-3xl font-medium text-espresso sm:text-4xl">
          You&apos;re almost there
        </h1>
        <p className="mt-2 text-espresso/70">
          Let&apos;s tell {performer.name} all about your event
        </p>
        <div className="mt-8 text-left">
          <BookingForm performer={performer} />
        </div>
      </div>
    </div>
  );
}
