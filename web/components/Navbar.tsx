"use client";

import { useState, useEffect} from "react";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MODEL_R2 } from "@/constants/constants";
import { HealthPopup } from "@/components/HealthPopUp";


export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showHealth, setShowHealth] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const isDark = theme === "dark";

  return (
    <>
      <nav className="bg-bg2/40 backdrop-blur-lg z-999  fixed top-0 w-full px-4 sm:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="logo-icon w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="3.5" fill="white" opacity="0.9" />
              <circle
                cx="9"
                cy="9"
                r="7"
                stroke="white"
                strokeWidth="1.5"
                opacity="0.45"
              />
              <path
                d="M9 2v2M9 14v2M2 9h2M14 9h2"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.6"
              />
            </svg>
          </div>
          <span className="brand-text">
            Price<span className="brand-accent">Oracle</span>
          </span>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 ">
          
            <div className="badge-live flex items-center gap-2 sm:px-3 sm:py-1.5 px-1 py-1 rounded-full text-xs font-semibold">
              <span className="live-dot w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              <span className="hidden sm:inline ">Model Live</span>
            </div>

            <div className="badge-r2 px-3 py-1.5 rounded-full text-xs font-bold">
              R² {MODEL_R2}
            </div>
        

          {/* Health check */}
          <Button
            variant="ghost"
            size="icon"
            className="nav-icon-btn text-text-hi"
            onClick={() => setShowHealth((p) => !p)}
            aria-label="Check model health"
            title="Model health"
          >
            <Activity size={16} />
          </Button>

          {/* Dark / light toggle — only after mount to avoid hydration mismatch */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              className="nav-icon-btn text-text-hi"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
              title={isDark ? "Dark mode" : "Light mode"}
            >
              {isDark ? <Moon size={16} /> : <Sun size={16} />}
            </Button>
          )}
        </div>
      </nav>

      <HealthPopup open={showHealth} onClose={() => setShowHealth(false)} />
    </>
  );
}
