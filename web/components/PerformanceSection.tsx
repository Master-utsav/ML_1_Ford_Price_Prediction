import { Input } from "@/components/ui/input";
import { StyledSlider } from "@/components/StyledSlider";
import { SLIDER_CONFIG } from "@/constants/constants";
import type { PerformanceSectionProps } from "@/types";

export function PerformanceSection({
  year,
  mileage,
  engineSize,
  form,
  onYearChange,
  onMileageChange,
  onEngineSizeChange,
  setField,
}: PerformanceSectionProps) {
  return (
    <section>
      <div className="step-pill">
        <span className="step-num">2</span> Performance &amp; Usage
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        {/* Year */}
        <StyledSlider
          id="year"
          label="Year of Manufacture"
          value={year}
          min={SLIDER_CONFIG.year.min}
          max={SLIDER_CONFIG.year.max}
          display={String(year)}
          onValueChange={onYearChange}
          rangeMin="2000"
          rangeMax="2050"
        />

        {/* Mileage with mini-num */}
        <StyledSlider
          id="mileage"
          label="Mileage (miles)"
          value={mileage}
          min={SLIDER_CONFIG.mileage.min}
          max={SLIDER_CONFIG.mileage.max}
          step={SLIDER_CONFIG.mileage.step}
          display={mileage.toLocaleString()}
          onValueChange={onMileageChange}
          rangeMin="0"
          rangeMax="200,000 mi"
          rightSlot={
            <Input
              type="number"
              className="mini-num"
              value={mileage}
              min={0}
              max={200000}
              onChange={(e) => {
                const v = Math.max(0, Math.min(200000, Number(e.target.value)));
                onMileageChange(v);
              }}
            />
          }
        />

        {/* Tax + MPG row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="field-label">Road Tax (£/yr)</label>
            <Input
              type="number"
              className="oracle-input"
              placeholder={SLIDER_CONFIG.tax.placeholder}
              value={form.tax}
              min={0}
              max={600}
              onChange={(e) => setField("tax", e.target.value)}
            />
          </div>
          <div>
            <label className="field-label">MPG</label>
            <Input
              type="number"
              className="oracle-input"
              placeholder={SLIDER_CONFIG.mpg.placeholder}
              step={0.1}
              value={form.mpg}
              min={1}
              max={200}
              onChange={(e) => setField("mpg", e.target.value)}
            />
          </div>
        </div>

        {/* Engine size */}
        <StyledSlider
          id="engineSize"
          label="Engine Size (litres)"
          value={engineSize}
          min={SLIDER_CONFIG.engineSize.min}
          max={SLIDER_CONFIG.engineSize.max}
          step={SLIDER_CONFIG.engineSize.step}
          display={engineSize.toFixed(1) + " L"}
          onValueChange={onEngineSizeChange}
          rangeMin="0.5 L"
          rangeMax="5.0 L"
        />
      </div>
    </section>
  );
}