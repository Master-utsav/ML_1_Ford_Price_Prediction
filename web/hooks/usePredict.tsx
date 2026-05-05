"use client";

import type { FormState, PredictResult } from "../types";
import { useState } from "react";
import axios from "axios";

export function usePredict(
  year: number,
  mileage: number,
  engineSize: number,
  gbpToInr: number
) {
  const [form, setForm] = useState<FormState>({
    carModel: "",
    transmission: "",
    fuelType: "",
    tax: "",
    mpg: "",
  });

  const [result, setResult] = useState<PredictResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const setField = (field: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const predict = async (): Promise<void> => {
    const tax = parseFloat(form.tax);
    const mpg = parseFloat(form.mpg);

    if (!form.carModel) return setError("Please select a Ford model.");
    if (!form.transmission) return setError("Please select a transmission type.");
    if (!form.fuelType) return setError("Please select a fuel type.");
    if (isNaN(tax) || tax < 0) return setError("Invalid tax value.");
    if (isNaN(mpg) || mpg <= 0) return setError("Invalid MPG value.");

    setError(null);
    setResult(null);
    setLoading(true);

    try {
      const { data } = await axios.post("/api/model/predict", {
        model: form.carModel,
        year,
        transmission: form.transmission,
        fuelType: form.fuelType,
        mileage,
        tax,
        mpg,
        engineSize,
      });

      if (!data.success) throw new Error(data.error);

      const gbpPrice = Math.abs(Math.round(data.predicted_price));
      const inrPrice = Math.abs(Math.round(gbpPrice * gbpToInr));

      setResult({ gbpPrice, inrPrice });
      setDialogOpen(true);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.message?.includes("Network")) {
        setError("Cannot reach API.");
      } else {
        setError(err.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return { form, setField, result, loading, error, setError, predict, dialogOpen, setDialogOpen };
}