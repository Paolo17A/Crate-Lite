"use client";

import { useEffect, useRef, useState } from "react";

export function useClampedText(deps: unknown[] = []) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [clamped, setClamped] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const check = () => {
      setClamped(el.scrollHeight > el.clientHeight + 1);
    };

    // Wait a frame so grid row-span height has settled
    const frame = requestAnimationFrame(check);
    const observer = new ResizeObserver(check);
    observer.observe(el);
    window.addEventListener("resize", check);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", check);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- caller-controlled deps
  }, deps);

  return { textRef, clamped };
}
