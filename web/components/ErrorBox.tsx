"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import type { ErrorBoxProps } from "@/types";

export function ErrorBox({ message, onDismiss }: ErrorBoxProps) {
  useEffect(() => {
    if (!message) return;
    toast.error(message, {
      duration: 5000,
      onDismiss,
      onAutoClose: onDismiss,
      style: {
        background: "rgba(239,68,68,0.08)",
        border: "1px solid rgba(239,68,68,0.25)",
        color: "#fca5a5",
      },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return null; // rendering is handled by <Toaster />
}