import Link from "next/link";

export default function BookingPerformerNotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-3xl font-medium text-espresso">Performer not found</h1>
      <p className="mt-3 text-espresso/70">
        We can&apos;t start a booking for that profile — it isn&apos;t in our
        catalog.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/search"
          className="rounded bg-burnt-orange px-6 py-3 text-sm font-medium uppercase tracking-wide text-sand transition-colors hover:bg-burnt-orange/90"
        >
          Browse performers
        </Link>
        <Link
          href="/"
          className="rounded border border-burnt-orange px-6 py-3 text-sm font-medium uppercase tracking-wide text-burnt-orange transition-colors hover:bg-burnt-orange/10"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
