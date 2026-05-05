"use client";

import { useState, useEffect } from "react";

interface ExchangeState {
  rate: number;
  label: string;
  loading: boolean;
}

export function useExchangeRate(): ExchangeState {
  const [state, setState] = useState<ExchangeState>({
    rate: Number(process.env.NEXT_PUBLIC_FALLBACK_RATE!) || 107,
    label: "Fetching live GBP → INR exchange rate…",
    loading: true,
  });

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_EXCHANGE_API!, { signal: controller.signal });
        const data = await res.json();
        const rate: number = data?.rates?.INR;
        if (rate && rate > 0) {
          setState({
            rate,
            label: `Live rate: 1 GBP = ₹${rate.toFixed(2)} INR  ·  Updated just now`,
            loading: false,
          });
        } else throw new Error("no rate");
      } catch {
        setState({
          rate:  Number(process.env.NEXT_PUBLIC_FALLBACK_RATE!) || 107,
          label: `Using fallback rate: 1 GBP ≈ ₹${Number(process.env.NEXT_PUBLIC_FALLBACK_RATE!) || 107} INR  ·  (live fetch failed)`,
          loading: false,
        });
      }
    })();
    return () => controller.abort();
  }, []);

  return state;
}