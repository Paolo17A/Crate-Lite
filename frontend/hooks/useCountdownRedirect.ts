"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useCountdownRedirect(seconds: number, href: string) {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(seconds);

  useEffect(() => {
    if (secondsLeft <= 0) {
      router.push(href);
      return;
    }

    const id = window.setTimeout(() => {
      setSecondsLeft((current) => current - 1);
    }, 1000);

    return () => window.clearTimeout(id);
  }, [secondsLeft, router, href]);

  return { secondsLeft };
}
