import { Slider } from "@/components/ui/slider";
import type { StyledSliderProps } from "@/types";

export function StyledSlider({
  label,
  value,
  min,
  max,
  step = 1,
  display,
  onValueChange,
  rangeMin,
  rangeMax,
  rightSlot,
}: StyledSliderProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="field-label mb-0">{label}</label>
        {rightSlot ?? (
          <span className="slider-val">{display}</span>
        )}
      </div>

      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([v]) => onValueChange(v)}
        className="oracle-slider"
      />

      <div className="flex justify-between text-xs mt-2 muted-text">
        <span>{rangeMin ?? min}</span>
        <span>{rangeMax ?? max}</span>
      </div>
    </div>
  );
}