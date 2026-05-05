/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { MODEL_R2 } from "@/constants/constants";
import { HealthData, MlServiceHealth } from "@/types";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  RefreshCw,
  Activity,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function HealthPopup({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);

  const doFetch = async () => {
    setLoading(true);
    setHealth(null);

    try {
      const { data } = await axios.get<HealthData>("/api/model/health");
      if (data) setHealth(data);
      else throw new Error("No data");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setHealth({
        success: false,
          node: "ok",
        ml_service: "unreachable",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open) return;

    const timeoutId = window.setTimeout(() => {
      void doFetch();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [open]);

  const mlOk =
    health?.success &&
    health.ml_service !== "unreachable" &&
    typeof health.ml_service === "object" &&
    (health.ml_service as MlServiceHealth).status === "ok";

  const mlData =
    health?.ml_service !== "unreachable" &&
    typeof health?.ml_service === "object"
      ? (health.ml_service as MlServiceHealth)
      : null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl bg-background/80 backdrop-blur-xl border border-muted p-4">
        {/* Header */}
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-sm">
            <Activity size={16} className="text-sky-500" />
            System Health
          </DialogTitle>
        </DialogHeader>

        {/* Body */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 size={16} className="animate-spin text-sky-500" />
              Checking services…
            </div>
          ) : (
            <>
              {/* Node API */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={14} className="text-green-500" />
                  Next.js API
                </div>
                <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">
                  Operational
                </span>
              </div>

              {/* ML Service */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  {mlOk ? (
                    <CheckCircle2 size={14} className="text-green-500" />
                  ) : (
                    <XCircle size={14} className="text-red-500" />
                  )}
                  ML Service
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    mlOk
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {mlOk ? "Operational" : "Unreachable"}
                </span>
              </div>

              {/* Details */}
              {mlData && (
                <div className="rounded-lg border p-3 text-xs space-y-2">
                  {mlData.model && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Model</span>
                      <span>{mlData.model}</span>
                    </div>
                  )}
                  {mlData.version && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Version</span>
                      <span>{mlData.version}</span>
                    </div>
                  )}
                  {mlData.uptime !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Uptime</span>
                      <span>{mlData.uptime}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold text-sky-500">
                    <span>R² Score</span>
                    <span>{MODEL_R2}</span>
                  </div>
                </div>
              )}

              {!health?.success && (
                <p className="text-xs text-red-500">
                  ML service unreachable. Ensure backend is running.
                </p>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-muted-foreground">
            {loading
              ? "Fetching…"
              : `Checked at ${new Date().toLocaleTimeString()}`}
          </span>

          <Button size="sm" onClick={doFetch} disabled={loading}>
            {loading ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <>
                <RefreshCw size={12} className="mr-1" />
                Refresh
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}