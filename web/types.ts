export interface ExchangeRateBannerProps {
  label: string;
  loading: boolean;
}

export interface StyledSliderProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  display: string; // formatted display string
  onValueChange: (v: number) => void;
  rangeMin?: string;
  rangeMax?: string;
  rightSlot?: React.ReactNode; // e.g. mini number input
}


export interface FormState {
  carModel: string;
  transmission: string;
  fuelType: string;
  tax: string;
  mpg: string;
}

export interface PredictResult {
  gbpPrice: number;
  inrPrice: number;
}

export interface VehicleIdentitySectionProps {
  form: FormState;
  setField: (field: keyof FormState, value: string) => void;
}

export interface PerformanceSectionProps {
  year: number;
  mileage: number;
  engineSize: number;
  form: FormState;
  onYearChange: (v: number) => void;
  onMileageChange: (v: number) => void;
  onEngineSizeChange: (v: number) => void;
  setField: (field: keyof FormState, value: string) => void;
}

export interface PredictButtonProps {
  loading: boolean;
  onClick: () => void;
}   

export interface ErrorBoxProps {
    message: string | null;
    onDismiss: () => void;
}

export interface ResultPanelProps {
    gbpPrice: number;
    inrPrice: number;
    gbpToInr: number;
    carModel: string;
    year: number;
    mileage: number;
}
  

export interface MlServiceHealth {
  status?: string;
  model?: string;
  version?: string;
  uptime?: string | number;
  [key: string]: unknown;
}

export interface HealthData {
  success: boolean;
  node: string;
  ml_service: MlServiceHealth | "unreachable";
}