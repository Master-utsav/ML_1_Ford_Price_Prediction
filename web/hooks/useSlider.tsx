"use client";
import { useState, useCallback } from "react";

interface SliderState {
  value: number;
  fillPct: number;
  onChange: (v: number) => void;
}

export function useSlider(
  initial: number,
  min: number,
  max: number
): SliderState {
  const clamp = (v: number) => Math.max(min, Math.min(max, v));
  const pct = (v: number) => ((v - min) / (max - min)) * 100;

  const [value, setValue] = useState(clamp(initial));

  const onChange = useCallback(
    (v: number) => setValue(clamp(v)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [min, max]
  );

  return { value, fillPct: pct(value), onChange };
}