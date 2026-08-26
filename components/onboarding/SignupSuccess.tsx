import Link from "next/link";

export default function SignupSuccess({ stageName }: { stageName: string }) {
  return (
    <div className="animate-fade-up py-12 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-burnt-orange/15">
        <span className="text-3xl text-burnt-orange" aria-hidden>
          ✓
        </span>
      </div>
      <h1 className="mt-6 font-headline text-4xl text-espresso">
        Welcome to Crate, {stageName}.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-espresso/70">
        Your profile has been submitted for verification. Our team reviews every
        performer — expect a decision within 2–3 business days. Once approved,
        your profile goes live in the marketplace and you can start receiving
        bookings.
      </p>
      <div className="mx-auto mt-8 flex w-fit max-w-md items-center gap-3 rounded-2xl border border-stone bg-sand px-5 py-3.5 text-left text-xs text-espresso/55">
        Verified performers get the badge, priority placement, and guaranteed
        payouts within 24 hours of every performance.
      </div>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="rounded-full bg-burnt-orange px-7 py-3 text-sm font-semibold text-sand transition-colors hover:bg-burnt-orange/90"
        >
          Back to home
        </Link>
        <Link
          href="/search"
          className="rounded-full border border-stone px-7 py-3 text-sm font-semibold text-espresso transition-colors hover:border-burnt-orange"
        >
          Browse the marketplace
        </Link>
      </div>
    </div>
  );
}
