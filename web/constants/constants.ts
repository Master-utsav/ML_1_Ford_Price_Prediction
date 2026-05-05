// ── Model data ───────────────────────────────────────────────────
export const POPULAR_MODELS = [
  { value: " Fiesta", label: "Fiesta" },
  { value: " Focus", label: "Focus" },
  { value: " Kuga", label: "Kuga" },
  { value: " Mustang", label: "Mustang" },
  { value: " Puma", label: "Puma" },
];

export const ALL_MODELS = [
  { value: " B-MAX", label: "B-MAX" },
  { value: " C-MAX", label: "C-MAX" },
  { value: " EcoSport", label: "EcoSport" },
  { value: " Edge", label: "Edge" },
  { value: " Escort", label: "Escort" },
  { value: " Fusion", label: "Fusion" },
  { value: " Galaxy", label: "Galaxy" },
  { value: " Grand C-MAX", label: "Grand C-MAX" },
  { value: " Grand Tourneo Connect", label: "Grand Tourneo Connect" },
  { value: " KA", label: "KA" },
  { value: " Ka+", label: "Ka+" },
  { value: " Mondeo", label: "Mondeo" },
  { value: " Ranger", label: "Ranger" },
  { value: " S-MAX", label: "S-MAX" },
  { value: " Streetka", label: "Streetka" },
  { value: " Tourneo Connect", label: "Tourneo Connect" },
  { value: " Tourneo Custom", label: "Tourneo Custom" },
  { value: " Transit Tourneo", label: "Transit Tourneo" },
  { value: "Focus", label: "Focus (alt)" },
];

export const TRANSMISSION_OPTIONS = [
  { value: "Manual", label: "Manual" },
  { value: "Automatic", label: "Automatic" },
  { value: "Semi-Auto", label: "Semi-Auto" },
];

export const FUEL_OPTIONS = [
  { value: "Petrol", label: "Petrol" },
  { value: "Diesel", label: "Diesel" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "Electric", label: "Electric" },
  { value: "Other", label: "Other" },
];

// ── Slider defaults / limits ──────────────────────────────────────
export const SLIDER_CONFIG = {
  year: { min: 2000, max: 2050, default: 2019 },
  mileage: { min: 0, max: 200000, default: 25000, step: 500 },
  engineSize: { min: 0.5, max: 5.0, default: 1.5, step: 0.1 },
  tax: { min: 0, max: 600, placeholder: "145" },
  mpg: { min: 1, max: 200, placeholder: "55.4", step: 0.1 },
} as const;

// ── Model R² ──────────────────────────────────────────────────────
export const MODEL_R2 = 0.84;
export const CONFIDENCE_PCT = 84;