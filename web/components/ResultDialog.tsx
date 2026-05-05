"use client";

import { useState, useEffect } from "react";
import { CONFIDENCE_PCT, MODEL_R2 } from "@/constants/constants";
import type { ResultPanelProps } from "@/types";
import { usePriceAnimation } from "@/hooks/usePriceAnimation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ResultDialog({
  open,
  onClose,
  gbpPrice,
  inrPrice,
  gbpToInr,
  carModel,
  year,
  mileage,
}: ResultPanelProps & {
  open: boolean;
  onClose: () => void;
}) {
  const [currency, setCurrency] = useState<"INR" | "GBP">("INR");
  const [confVisible, setConfVisible] = useState(false);
  const { displayed, animate } = usePriceAnimation(1100);

  useEffect(() => {
    if (!open) return;

    animate(currency === "INR" ? inrPrice : gbpPrice);

    const t = setTimeout(() => setConfVisible(true), 80);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, inrPrice, gbpPrice, open]);

  const prefix = currency === "INR" ? "₹" : "£";

  const secondary =
    currency === "INR"
      ? `≈ £${gbpPrice.toLocaleString("en-GB")} · Rate: 1 GBP = ₹${gbpToInr.toFixed(2)}`
      : `≈ ₹${inrPrice.toLocaleString("en-IN")} · Rate: 1 GBP = ₹${gbpToInr.toFixed(2)}`;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl bg-background/80 backdrop-blur-xl border border-muted p-5">
        <DialogHeader>
          <DialogTitle className="text-center text-sm text-muted-foreground">
            Estimated Market Value
          </DialogTitle>
        </DialogHeader>

        {/* Currency Toggle */}
        <div className="flex justify-center mb-4">
          <div className="flex bg-muted rounded-lg p-1">
            <button
              className={`px-3 py-1 text-sm rounded-md transition ${
                currency === "INR"
                  ? "bg-background shadow text-foreground"
                  : "text-muted-foreground"
              }`}
              onClick={() => setCurrency("INR")}
            >
              ₹ INR
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-md transition ${
                currency === "GBP"
                  ? "bg-background shadow text-foreground"
                  : "text-muted-foreground"
              }`}
              onClick={() => setCurrency("GBP")}
            >
              £ GBP
            </button>
          </div>
        </div>

        {/* Price */}
        <div className="text-center">
          <div className="text-4xl font-bold tracking-tight">
            {prefix}
            {displayed.toLocaleString("en-IN")}
          </div>
          <p className="text-xs text-muted-foreground mt-1">{secondary}</p>
        </div>

        {/* Confidence */}
        <div className="mt-5">
          <div className="flex justify-between text-xs mb-2 text-muted-foreground">
            <span>Model Confidence</span>
            <span className="text-sky-500 font-semibold">
              R² = {MODEL_R2}
            </span>
          </div>

          <div className="h-2 rounded bg-muted overflow-hidden">
            <div
              className="h-full bg-sky-500 transition-all duration-700"
              style={{ width: confVisible ? `${CONFIDENCE_PCT}%` : "0%" }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-5">
          <div className="text-center border rounded-lg p-2">
            <p className="text-xs text-muted-foreground">Model</p>
            <p className="text-sm font-medium truncate">
              {carModel.trim() || "—"}
            </p>
          </div>
          <div className="text-center border rounded-lg p-2">
            <p className="text-xs text-muted-foreground">Year</p>
            <p className="text-sm font-medium">{year}</p>
          </div>
          <div className="text-center border rounded-lg p-2">
            <p className="text-xs text-muted-foreground">Mileage</p>
            <p className="text-sm font-medium">
              {mileage.toLocaleString()} mi
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-[11px] text-muted-foreground text-center mt-4">
          Historical Ford UK data · results are indicative only
        </p>
      </DialogContent>
    </Dialog>
  );
}