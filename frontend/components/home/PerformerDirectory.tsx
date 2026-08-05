"use client";

import { useMemo } from "react";
import { categories, performers } from "@/data/performers";
import CategoryRow from "@/components/home/CategoryRow";

export default function PerformerDirectory() {
  const rows = useMemo(
    () =>
      categories
        .map((cat) => ({
          category: cat,
          title: `${cat}s`,
          performers: performers.filter((p) => p.category === cat),
        }))
        .filter((row) => row.performers.length > 0),
    [],
  );

  return (
    <section
      id="performers"
      className="bg-parchment px-6 py-10 font-performer sm:px-10 sm:py-14 lg:px-16"
    >
      <div className="mx-auto max-w-3xl pb-12 pt-4 text-center sm:pb-16">
        <h2 className="font-headline text-3xl text-espresso sm:text-4xl md:text-5xl">
          Meet our talented partners
        </h2>
        <p className="mt-4 text-base text-espresso/65 sm:text-lg">
          From intimate sets to festival stages, choose the right one for your
          event
        </p>
      </div>

      <div className="space-y-10">
        {rows.map((row, index) => (
          <div key={row.title}>
            {index > 0 && (
              <div
                className="mb-10 border-t border-stone"
                aria-hidden="true"
              />
            )}
            <CategoryRow
              title={row.title}
              category={row.category}
              performers={row.performers}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
