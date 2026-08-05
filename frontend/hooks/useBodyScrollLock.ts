"use client";

import { useEffect, useRef } from "react";

type Options = {
  onEscape?: () => void;
};

export function useBodyScrollLock(locked: boolean, options: Options = {}) {
  const { onEscape } = options;
  const onEscapeRef = useRef(onEscape);

  useEffect(() => {
    onEscapeRef.current = onEscape;
  }, [onEscape]);

  useEffect(() => {
    if (!locked) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onEscapeRef.current?.();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [locked]);
}
