"use client";
import React, { useId } from "react";

export type DesignSystemProviderProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * DesignSystemProvider - Wrapper que aplica o escopo do design system
 *
 * Uso básico:
 * ```tsx
 * import { DesignSystemProvider } from "@phsa.tec/design-system-react";
 * import "@phsa.tec/design-system-react/styles.css";
 *
 * <DesignSystemProvider>
 *   <App />
 * </DesignSystemProvider>
 * ```
 *
 * Customização via CSS Variables:
 * ```css
 * :root {
 *   --primary: 220 90% 50%;
 *   --radius: 0.25rem;
 * }
 * ```
 *
 * Customização avançada via Tailwind Preset:
 * ```js
 * // tailwind.config.js
 * module.exports = {
 *   presets: [require("@phsa.tec/design-system-react/tailwind-preset")],
 * }
 * ```
 */
export function DesignSystemProvider({
  children,
  className = "",
}: DesignSystemProviderProps) {
  const uniqueId = useId().replace(/:/g, "_");
  const scopeClass = `ds-${uniqueId}`;

  return (
    <div className={`ds ${scopeClass} ${className}`.trim()}>
      {children}
    </div>
  );
}
