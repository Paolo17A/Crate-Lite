import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-3xl font-medium text-espresso">Performer not found</h1>
      <p className="mt-3 text-espresso/70">
        That profile isn&apos;t in our catalog.
      </p>
      <Link
        href="/"
        className="mt-8 bg-burnt-orange px-6 py-3 text-sm font-medium uppercase tracking-wide text-sand transition-colors hover:bg-burnt-orange/90"
      >
        Back to home
      </Link>
    </div>
  );
}
