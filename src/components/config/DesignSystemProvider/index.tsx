"use client";
import React, { useLayoutEffect, useId, useMemo } from "react";
import "./globals.css";
import { hexToHsl } from "@/lib/utils";

type ColorValues = {
  background?: string;
  foreground?: string;
  card?: string;
  cardForeground?: string;
  popover?: string;
  popoverForeground?: string;
  primary?: string;
  primaryForeground?: string;
  secondary?: string;
  secondaryForeground?: string;
  muted?: string;
  mutedForeground?: string;
  accent?: string;
  accentForeground?: string;
  success?: string;
  successForeground?: string;
  warning?: string;
  destructive?: string;
  destructiveForeground?: string;
  border?: string;
  input?: string;
  ring?: string;
  radius?: string;
};

type DesignSystemProviderProps = {
  children: React.ReactNode;
  className?: string;
  colors?: ColorValues;
};

const normalizeColor = (color?: string): string | undefined => {
  if (!color) return undefined;

  if (/^\d+\s+\d+%\s+\d+%$/.test(color)) {
    return color;
  }

  if (/^#?[0-9A-Fa-f]{6}$/.test(color)) {
    return hexToHsl(color);
  }

  return color;
};

export function DesignSystemProvider({
  children,
  className = "",
  colors,
}: DesignSystemProviderProps) {
  const uniqueId = useId().replace(/:/g, "_");
  const scopeClass = `ds-${uniqueId}`;

  const normalizedColors = useMemo(() => {
    if (!colors) return null;

    return {
      "--background": normalizeColor(colors.background),
      "--foreground": normalizeColor(colors.foreground),
      "--card": normalizeColor(colors.card),
      "--card-foreground": normalizeColor(colors.cardForeground),
      "--popover": normalizeColor(colors.popover),
      "--popover-foreground": normalizeColor(colors.popoverForeground),
      "--primary": normalizeColor(colors.primary),
      "--primary-foreground": normalizeColor(colors.primaryForeground),
      "--secondary": normalizeColor(colors.secondary),
      "--secondary-foreground": normalizeColor(colors.secondaryForeground),
      "--muted": normalizeColor(colors.muted),
      "--muted-foreground": normalizeColor(colors.mutedForeground),
      "--accent": normalizeColor(colors.accent),
      "--accent-foreground": normalizeColor(colors.accentForeground),
      "--success": normalizeColor(colors.success),
      "--success-foreground": normalizeColor(colors.successForeground),
      "--warning": normalizeColor(colors.warning),
      "--destructive": normalizeColor(colors.destructive),
      "--destructive-foreground": normalizeColor(colors.destructiveForeground),
      "--border": normalizeColor(colors.border),
      "--input": normalizeColor(colors.input),
      "--ring": normalizeColor(colors.ring),
      "--radius": colors.radius,
    };
  }, [colors]);

  useLayoutEffect(() => {
    if (!normalizedColors) return;

    const styleId = `design-system-colors-${uniqueId}`;
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    const cssVariables = Object.entries(normalizedColors)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => `  ${key}: ${value};`)
      .join("\n");

    styleElement.textContent = `.${scopeClass} {\n${cssVariables}\n}`;

    return () => {
      styleElement.remove();
    };
  }, [normalizedColors, uniqueId, scopeClass]);

  const inlineStyle = normalizedColors
    ? (Object.fromEntries(
        Object.entries(normalizedColors).filter(
          ([, value]) => value !== undefined
        )
      ) as React.CSSProperties)
    : undefined;

  return (
    <div className={`ds ${scopeClass} ${className}`.trim()} style={inlineStyle}>
      {children}
    </div>
  );
}
