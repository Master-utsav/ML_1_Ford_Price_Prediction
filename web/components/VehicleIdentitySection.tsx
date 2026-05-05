import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { POPULAR_MODELS, ALL_MODELS, TRANSMISSION_OPTIONS, FUEL_OPTIONS } from "@/constants/constants";
import type { VehicleIdentitySectionProps } from "@/types";


export function VehicleIdentitySection({ form, setField }: VehicleIdentitySectionProps) {
  return (
    <section>
      <div className="step-pill">
        <span className="step-num">1</span> Vehicle Identity
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {/* Model — full width */}
        <div className="sm:col-span-2">
          <label className="field-label">Ford Model</label>
          <Select value={form.carModel} onValueChange={(v) => setField("carModel", v)}>
            <SelectTrigger className="oracle-select-trigger">
              <SelectValue placeholder="Select model…" />
            </SelectTrigger>
            <SelectContent className="oracle-select-content">
              <SelectGroup>
                <SelectLabel className="select-group-label">Popular</SelectLabel>
                {POPULAR_MODELS.map((m) => (
                  <SelectItem key={m.value} value={m.value} className="oracle-select-item">
                    {m.label}
                  </SelectItem>
                ))}
              </SelectGroup>
              <SelectGroup>
                <SelectLabel className="select-group-label">All Models</SelectLabel>
                {ALL_MODELS.map((m) => (
                  <SelectItem key={m.value} value={m.value} className="oracle-select-item">
                    {m.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Transmission */}
        <div>
          <label className="field-label">Transmission</label>
          <Select value={form.transmission} onValueChange={(v) => setField("transmission", v)}>
            <SelectTrigger className="oracle-select-trigger">
              <SelectValue placeholder="Select…" />
            </SelectTrigger>
            <SelectContent className="oracle-select-content">
              {TRANSMISSION_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value} className="oracle-select-item">
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Fuel */}
        <div>
          <label className="field-label">Fuel Type</label>
          <Select value={form.fuelType} onValueChange={(v) => setField("fuelType", v)}>
            <SelectTrigger className="oracle-select-trigger">
              <SelectValue placeholder="Select…" />
            </SelectTrigger>
            <SelectContent className="oracle-select-content">
              {FUEL_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value} className="oracle-select-item">
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
}