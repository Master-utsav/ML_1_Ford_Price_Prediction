import type { ExchangeRateBannerProps } from "@/types";

export function ExchangeRateBanner({ label, loading }: ExchangeRateBannerProps) {
  return (
    <div className="relative z-10 max-w-2xl mx-auto px-4 mb-6 fade-up delay-3">
      <div className="rate-banner flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs">
        {loading ? (
          <span className="rate-dot animate-pulse" />
        ) : (
          <svg width="12" height="12" fill="none" viewBox="0 0 12 12" className="text-sky shrink-0">
            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M6 5v4M6 3.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        )}
        <span className="rate-label">{label}</span>
      </div>
    </div>
  );
}