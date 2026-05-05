"use client";

import { useState, useRef, useCallback } from "react";

export function usePriceAnimation(duration = 1000) {
  const [displayed, setDisplayed] = useState(0);
  const rafRef = useRef<number | null>(null);

  const animate = useCallback(
    (target: number) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const start = performance.now();

      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
        setDisplayed(Math.round(target * ease));
        if (progress < 1) rafRef.current = requestAnimationFrame(step);
      };

      rafRef.current = requestAnimationFrame(step);
    },
    [duration]
  );

  return { displayed, animate };
}