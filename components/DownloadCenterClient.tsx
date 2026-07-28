"use client";

import { useState, useEffect } from "react";
import type { Release, Platform } from "@/lib/releases";
import { ProductCard } from "@/components/ProductCard";
import { PlatformPills, useDetectedPlatform } from "@/components/PlatformPills";

interface DownloadCenterClientProps {
  cocoaRelease: Release | undefined;
  shadowRelease: Release | undefined;
  osintAiRelease: Release | undefined;
}

export function DownloadCenterClient({
  cocoaRelease,
  shadowRelease,
  osintAiRelease,
}: DownloadCenterClientProps) {
  const detected = useDetectedPlatform();
  const [selected, setSelected] = useState<Platform | null>(null);
  const [autoDetected, setAutoDetected] = useState(false);

  // Auto-select detected OS on first mount, but allow manual override
  useEffect(() => {
    if (detected && !autoDetected) {
      setSelected(detected);
      setAutoDetected(true);
    }
  }, [detected, autoDetected]);

  const highlight = selected;

  return (
    <div className="dc-client-wrapper">
      {/* Platform filter pills */}
      <div className="dc-pills-row">
        <PlatformPills value={selected} onChange={setSelected} />
        {detected && selected !== null && (
          <span className="dc-os-hint" aria-live="polite">
            <i className="bi bi-cpu" aria-hidden="true" />
            Detected:{" "}
            <strong>
              {detected === "windows" ? "Windows" : detected === "macos" ? "macOS" : "Linux"}
            </strong>
          </span>
        )}
        {!detected && (
          <span className="dc-os-hint dc-os-hint--neutral" aria-live="polite">
            <i className="bi bi-info-circle" aria-hidden="true" />
            OS not auto-detected — both platforms always shown
          </span>
        )}
      </div>

      {/* Product cards — ALL always shown */}
      <div className="dc-cards-grid">
        <ProductCard
          productId="cocoa"
          release={cocoaRelease}
          highlightPlatform={highlight}
        />
        <ProductCard
          productId="shadow"
          release={shadowRelease}
          highlightPlatform={highlight}
        />
        <ProductCard
          productId="osint_ai"
          release={osintAiRelease}
          highlightPlatform={highlight}
        />
      </div>
    </div>
  );
}
