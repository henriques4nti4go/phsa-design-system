"use client";
import React, { useLayoutEffect, useId, useMemo } from "react";
import { hexToHsl } from "@/lib/utils";

// CSS será injetado automaticamente
let stylesInjected = false;

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

type SpacingValues = {
  /** Base spacing unit (default: 0.25rem = 4px) */
  base?: string;
  /** Custom spacing scale */
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  "2xl"?: string;
  "3xl"?: string;
};

type TypographyValues = {
  /** Font family */
  fontFamily?: string;
  /** Base font size */
  fontSize?: {
    xs?: string;
    sm?: string;
    base?: string;
    lg?: string;
    xl?: string;
    "2xl"?: string;
    "3xl"?: string;
    "4xl"?: string;
    "5xl"?: string;
  };
  /** Font weights */
  fontWeight?: {
    light?: string;
    normal?: string;
    medium?: string;
    semibold?: string;
    bold?: string;
  };
  /** Line heights */
  lineHeight?: {
    none?: string;
    tight?: string;
    snug?: string;
    normal?: string;
    relaxed?: string;
    loose?: string;
  };
};

type ThemeValues = {
  colors?: ColorValues;
  spacing?: SpacingValues;
  typography?: TypographyValues;
  /** Border radius values */
  borderRadius?: {
    none?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    "2xl"?: string;
    "3xl"?: string;
    full?: string;
  };
  /** Shadow values */
  boxShadow?: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    "2xl"?: string;
    inner?: string;
    none?: string;
  };
  /** Breakpoints */
  breakpoints?: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    "2xl"?: string;
  };
};

export type DesignSystemProviderProps = {
  children: React.ReactNode;
  className?: string;
  /** @deprecated Use `theme.colors` instead */
  colors?: ColorValues;
  /** Complete theme configuration */
  theme?: ThemeValues;
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
  theme,
}: DesignSystemProviderProps) {
  const uniqueId = useId().replace(/:/g, "_");
  const scopeClass = `ds-${uniqueId}`;

  // Compatibilidade: usar colors se theme não for fornecido
  const themeColors = theme?.colors || colors;

  // Auto-injetar CSS uma única vez
  useLayoutEffect(() => {
    if (stylesInjected) return;
    
    const styleId = 'phsa-design-system-styles';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleElement) {
      // Tentar importar CSS compilado dinamicamente
      // Usar string dinâmica para evitar erro de TypeScript durante build
      const stylesPath = '@phsa.tec/design-system-react/styles';
      import(stylesPath)
        .then((module: any) => {
          const css = module.default || '';
          
          if (css) {
            styleElement = document.createElement('style');
            styleElement.id = styleId;
            styleElement.textContent = css;
            document.head.appendChild(styleElement);
            stylesInjected = true;
          }
        })
        .catch((error: any) => {
          // Em desenvolvimento, pode não ter o CSS compilado
          // Isso é normal e não deve quebrar a aplicação
          if (process.env.NODE_ENV === 'development') {
            console.warn('⚠️ CSS do design system não encontrado. Execute "npm run build:lib" para compilar.');
          }
        });
    }
  }, []);

  const themeVariables = useMemo(() => {
    const vars: Record<string, string> = {};

    // Cores
    if (themeColors) {
      vars["--background"] = normalizeColor(themeColors.background) || '';
      vars["--foreground"] = normalizeColor(themeColors.foreground) || '';
      vars["--card"] = normalizeColor(themeColors.card) || '';
      vars["--card-foreground"] = normalizeColor(themeColors.cardForeground) || '';
      vars["--popover"] = normalizeColor(themeColors.popover) || '';
      vars["--popover-foreground"] = normalizeColor(themeColors.popoverForeground) || '';
      vars["--primary"] = normalizeColor(themeColors.primary) || '';
      vars["--primary-foreground"] = normalizeColor(themeColors.primaryForeground) || '';
      vars["--secondary"] = normalizeColor(themeColors.secondary) || '';
      vars["--secondary-foreground"] = normalizeColor(themeColors.secondaryForeground) || '';
      vars["--muted"] = normalizeColor(themeColors.muted) || '';
      vars["--muted-foreground"] = normalizeColor(themeColors.mutedForeground) || '';
      vars["--accent"] = normalizeColor(themeColors.accent) || '';
      vars["--accent-foreground"] = normalizeColor(themeColors.accentForeground) || '';
      vars["--success"] = normalizeColor(themeColors.success) || '';
      vars["--success-foreground"] = normalizeColor(themeColors.successForeground) || '';
      vars["--warning"] = normalizeColor(themeColors.warning) || '';
      vars["--destructive"] = normalizeColor(themeColors.destructive) || '';
      vars["--destructive-foreground"] = normalizeColor(themeColors.destructiveForeground) || '';
      vars["--border"] = normalizeColor(themeColors.border) || '';
      vars["--input"] = normalizeColor(themeColors.input) || '';
      vars["--ring"] = normalizeColor(themeColors.ring) || '';
      vars["--radius"] = themeColors.radius || '';
    }

    // Espaçamento
    if (theme?.spacing) {
      if (theme.spacing.base) vars["--spacing-base"] = theme.spacing.base;
      if (theme.spacing.xs) vars["--spacing-xs"] = theme.spacing.xs;
      if (theme.spacing.sm) vars["--spacing-sm"] = theme.spacing.sm;
      if (theme.spacing.md) vars["--spacing-md"] = theme.spacing.md;
      if (theme.spacing.lg) vars["--spacing-lg"] = theme.spacing.lg;
      if (theme.spacing.xl) vars["--spacing-xl"] = theme.spacing.xl;
      if (theme.spacing["2xl"]) vars["--spacing-2xl"] = theme.spacing["2xl"];
      if (theme.spacing["3xl"]) vars["--spacing-3xl"] = theme.spacing["3xl"];
    }

    // Tipografia
    if (theme?.typography) {
      if (theme.typography.fontFamily) vars["--font-family"] = theme.typography.fontFamily;
      if (theme.typography.fontSize) {
        Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
          vars[`--font-size-${key}`] = value;
        });
      }
      if (theme.typography.fontWeight) {
        Object.entries(theme.typography.fontWeight).forEach(([key, value]) => {
          vars[`--font-weight-${key}`] = value;
        });
      }
      if (theme.typography.lineHeight) {
        Object.entries(theme.typography.lineHeight).forEach(([key, value]) => {
          vars[`--line-height-${key}`] = value;
        });
      }
    }

    // Border Radius
    if (theme?.borderRadius) {
      Object.entries(theme.borderRadius).forEach(([key, value]) => {
        vars[`--radius-${key}`] = value;
      });
    }

    // Box Shadow
    if (theme?.boxShadow) {
      Object.entries(theme.boxShadow).forEach(([key, value]) => {
        vars[`--shadow-${key}`] = value;
      });
    }

    // Breakpoints
    if (theme?.breakpoints) {
      Object.entries(theme.breakpoints).forEach(([key, value]) => {
        vars[`--breakpoint-${key}`] = value;
      });
    }

    // Remover variáveis vazias
    return Object.fromEntries(
      Object.entries(vars).filter(([, value]) => value !== undefined && value !== '')
    );
  }, [theme, themeColors]);

  useLayoutEffect(() => {
    if (Object.keys(themeVariables).length === 0) return;

    const styleId = `design-system-theme-${uniqueId}`;
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    const cssVariables = Object.entries(themeVariables)
      .map(([key, value]) => `  ${key}: ${value};`)
      .join("\n");

    styleElement.textContent = `.${scopeClass} {\n${cssVariables}\n}`;

    return () => {
      styleElement.remove();
    };
  }, [themeVariables, uniqueId, scopeClass]);

  const inlineStyle = Object.keys(themeVariables).length > 0
    ? (themeVariables as React.CSSProperties)
    : undefined;

  return (
    <div className={`ds ${scopeClass} ${className}`.trim()} style={inlineStyle}>
      {children}
    </div>
  );
}
