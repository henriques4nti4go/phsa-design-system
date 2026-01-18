"use client";
import React, { useId } from "react";

export type DesignSystemProviderProps = {
  children: React.ReactNode;
  className?: string;
};

export function DesignSystemProvider({
  children,
  className = "",
}: DesignSystemProviderProps) {
  const uniqueId = useId().replace(/:/g, "_");
  const scopeClass = `ds-${uniqueId}`;

  // CSS deve ser importado manualmente pelo consumidor:
  // import "@phsa.tec/design-system-react/styles";

  return (
    <div className={`ds ${scopeClass} ${className}`.trim()}>
      {children}
    </div>
  );
}
