"use client";

import { Suspense, useEffect, useState } from "react";
import CrateLogo from "@/components/shared/CrateLogo";
import SearchBar from "@/components/shared/SearchBar";

/** Set `durationSeconds` per GIF — how long it stays on screen before switching. */
const BACKGROUNDS = [
  { src: "/maroon5.gif", durationSeconds: 5 },
  { src: "/piano.gif", durationSeconds: 8 },
  { src: "/ed sheeran.gif", durationSeconds: 6 },
] as const;

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const durationMs = BACKGROUNDS[index].durationSeconds * 1000;
    const id = setTimeout(() => {
      setIndex((current) => (current + 1) % BACKGROUNDS.length);
    }, durationMs);
    return () => clearTimeout(id);
  }, [index]);

  return (
    <section
      id="home-hero"
      className="relative flex h-dvh min-h-screen items-end justify-center overflow-hidden bg-espresso text-sand"
    >
      {BACKGROUNDS.map((bg, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={bg.src}
          src={bg.src}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-espresso/55" />

      <div className="relative z-10 mx-auto mb-[8vh] flex w-full max-w-3xl flex-col items-center px-4 pb-16 text-center sm:px-6 sm:pb-20">
        <div className="mb-12 rounded-2xl bg-parchment px-3 py-2 sm:mb-16 sm:px-4 sm:py-2.5">
          <CrateLogo
            priority
            link={false}
            className="[&_img]:h-32! sm:[&_img]:h-40! md:[&_img]:h-48!"
          />
        </div>

        <p className="max-w-2xl font-headline text-4xl text-sand sm:text-5xl md:text-6xl">
          Your right performer is just one click away
        </p>

        <div className="mt-10 w-full">
          <Suspense fallback={null}>
            <SearchBar id="hero-search" />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
