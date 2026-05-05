import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PredictButtonProps } from "@/types";

export function PredictButton({ loading, onClick }: PredictButtonProps) {
  return (
    <Button
      className="btn-predict w-full"
      disabled={loading}
      onClick={onClick}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <p className="font-sans text-lg">Predicting…</p>
        </>
      ) : (
        <p className="font-sans text-xl">Predict Market Value</p>
      )}
    </Button>
  );
}