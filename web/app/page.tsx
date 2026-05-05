"use client";

import React from "react";

import { useEffect } from "react";
import { Toaster } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

import { BackgroundOrbs } from "@/components/BackgroundOrbs";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ExchangeRateBanner } from "@/components/ExchangeRateBanner";
import { VehicleIdentitySection } from "@/components/VehicleIdentitySection";
import { PerformanceSection } from "@/components/PerformanceSection";
import { PredictButton } from "@/components/PredictButton";
import { ErrorBox } from "@/components/ErrorBox";
import { ResultDialog } from "@/components/ResultDialog";

import { useExchangeRate } from "@/hooks/useExchangeRate";
import { useSlider } from "@/hooks/useSlider";
import { usePredict } from "@/hooks/usePredict";
import { SLIDER_CONFIG } from "@/constants/constants";

export default function PredictPage() {
  const { rate, label, loading: rateLoading } = useExchangeRate();

  const yearSlider = useSlider(
    SLIDER_CONFIG.year.default,
    SLIDER_CONFIG.year.min,
    SLIDER_CONFIG.year.max
  );
  const mileageSlider = useSlider(
    SLIDER_CONFIG.mileage.default,
    SLIDER_CONFIG.mileage.min,
    SLIDER_CONFIG.mileage.max
  );
  const engineSlider = useSlider(
    SLIDER_CONFIG.engineSize.default,
    SLIDER_CONFIG.engineSize.min,
    SLIDER_CONFIG.engineSize.max
  );

  const {
    form,
    setField,
    result,
    loading,
    error,
    setError,
    predict,
    dialogOpen,
    setDialogOpen,
  } = usePredict(
    yearSlider.value,
    mileageSlider.value,
    engineSlider.value,
    rate
  );

  // Enter key shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter" && (e.target as HTMLElement).tagName !== "SELECT")
        predict();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [predict]);

  return (
    <div className="relative min-h-screen">
      <BackgroundOrbs />
      <Toaster position="top-center" richColors />

      <Navbar />

      <Hero />

      <ExchangeRateBanner label={label} loading={rateLoading} />

      <div className="relative max-w-2xl mx-auto px-4 pb-24 fade-up delay-3">
        <div className="card p-6 sm:p-8">
          <VehicleIdentitySection form={form} setField={setField} />

          <div className="divider mb-8" />

          <PerformanceSection
            year={yearSlider.value}
            mileage={mileageSlider.value}
            engineSize={engineSlider.value}
            form={form}
            onYearChange={yearSlider.onChange}
            onMileageChange={mileageSlider.onChange}
            onEngineSizeChange={engineSlider.onChange}
            setField={setField}
          />

          {/* Error toasts */}
          <ErrorBox message={error} onDismiss={() => setError(null)} />

          {/* Loading skeleton */}
          {loading && (
            <div className="mb-4 space-y-2">
              <Skeleton className="h-2 w-full oracle-skeleton" />
              <Skeleton className="h-2 w-3/4 oracle-skeleton" />
            </div>
          )}

          <PredictButton loading={loading} onClick={predict} />

          {result && (
            <ResultDialog
              open={dialogOpen}
              onClose={() => setDialogOpen(false)}
              gbpPrice={result.gbpPrice}
              inrPrice={result.inrPrice}
              gbpToInr={rate}
              carModel={form.carModel}
              year={yearSlider.value}
              mileage={mileageSlider.value}
            />
          )}
        </div>

        <p className="text-center text-xs mt-6 disclaimer-text">
          Ford Price Oracle · ML v1.0 · Estimates only
        </p>
      </div>
    </div>
  );
}
