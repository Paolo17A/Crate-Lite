"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  id: string;
  compact?: boolean;
};

export default function SearchBar({ id, compact = false }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(urlQuery);

  useEffect(() => {
    setQuery(urlQuery);
  }, [urlQuery]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = query.trim();
    if (!q) {
      router.push("/search");
      return;
    }
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <form className="relative w-full" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor={id}>
        Search performers
      </label>
      <input
        id={id}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search performers by name…"
        className={
          compact
            ? "w-full rounded border border-stone bg-white py-2.5 pl-5 pr-14 text-base text-espresso outline-none transition placeholder:text-espresso/50 focus:border-burnt-orange focus:ring-2 focus:ring-burnt-orange/30"
            : "w-full rounded border border-burnt-orange/40 bg-burnt-orange/50 py-4 pl-8 pr-20 text-lg text-sand shadow-[0_12px_40px_rgba(43,38,35,0.35)] outline-none transition placeholder:text-sand/80 focus:border-burnt-orange focus:ring-2 focus:ring-burnt-orange/50 sm:py-5 sm:pl-10 sm:pr-24 sm:text-xl"
        }
      />
      <button
        type="submit"
        aria-label="Search"
        className={
          compact
            ? "absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-2.5 pl-2 text-espresso transition-opacity hover:opacity-70"
            : "absolute top-1/2 right-4 flex -translate-y-1/2 items-center gap-3 pl-3 text-sand transition-opacity hover:opacity-80 sm:right-6"
        }
      >
        <span
          className={
            compact
              ? "h-5 w-px bg-stone"
              : "h-6 w-px bg-sand/80 sm:h-7"
          }
          aria-hidden="true"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={compact ? "h-5 w-5" : "h-6 w-6 sm:h-7 sm:w-7"}
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </button>
    </form>
  );
}
