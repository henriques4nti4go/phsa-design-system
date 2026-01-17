import type { Config } from "tailwindcss";

// Prefixo para isolamento durante o build da lib
const isBuild = process.env.BUILD_LIB === 'true';
const prefix = process.env.DS_PREFIX || (isBuild ? 'phsa-' : '');

export default {
  darkMode: ["class"],
  // Prefixo apenas no build da lib para isolamento
  prefix: prefix,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Desabilitar preflight no build para não resetar estilos do projeto consumidor
  corePlugins: isBuild ? {
    preflight: false,
  } : undefined,
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        none: "var(--radius-none, 0px)",
        sm: "var(--radius-sm, calc(var(--radius) - 4px))",
        md: "var(--radius-md, calc(var(--radius) - 2px))",
        lg: "var(--radius-lg, var(--radius))",
        xl: "var(--radius-xl, calc(var(--radius) + 2px))",
        "2xl": "var(--radius-2xl, calc(var(--radius) + 4px))",
        "3xl": "var(--radius-3xl, calc(var(--radius) + 8px))",
        full: "var(--radius-full, 9999px)",
      },
      spacing: {
        // Usar variáveis CSS se definidas, senão usar valores padrão do Tailwind
        xs: "var(--spacing-xs, 0.5rem)",
        sm: "var(--spacing-sm, 0.75rem)",
        md: "var(--spacing-md, 1rem)",
        lg: "var(--spacing-lg, 1.5rem)",
        xl: "var(--spacing-xl, 2rem)",
        "2xl": "var(--spacing-2xl, 3rem)",
        "3xl": "var(--spacing-3xl, 4rem)",
      },
      fontFamily: {
        sans: ["var(--font-family, 'Roboto')", "sans-serif"],
        roboto: ["var(--font-family, 'Roboto')", "sans-serif"],
      },
      fontSize: {
        xs: ["var(--font-size-xs, 0.75rem)", { lineHeight: "var(--line-height-tight, 1rem)" }],
        sm: ["var(--font-size-sm, 0.875rem)", { lineHeight: "var(--line-height-normal, 1.25rem)" }],
        base: ["var(--font-size-base, 1rem)", { lineHeight: "var(--line-height-normal, 1.5rem)" }],
        lg: ["var(--font-size-lg, 1.125rem)", { lineHeight: "var(--line-height-relaxed, 1.75rem)" }],
        xl: ["var(--font-size-xl, 1.25rem)", { lineHeight: "var(--line-height-relaxed, 1.75rem)" }],
        "2xl": ["var(--font-size-2xl, 1.5rem)", { lineHeight: "var(--line-height-relaxed, 2rem)" }],
        "3xl": ["var(--font-size-3xl, 1.875rem)", { lineHeight: "var(--line-height-loose, 2.25rem)" }],
        "4xl": ["var(--font-size-4xl, 2.25rem)", { lineHeight: "var(--line-height-loose, 2.5rem)" }],
        "5xl": ["var(--font-size-5xl, 3rem)", { lineHeight: "var(--line-height-none, 1)" }],
      },
      fontWeight: {
        light: "var(--font-weight-light, 300)",
        normal: "var(--font-weight-normal, 400)",
        medium: "var(--font-weight-medium, 500)",
        semibold: "var(--font-weight-semibold, 600)",
        bold: "var(--font-weight-bold, 700)",
      },
      boxShadow: {
        sm: "var(--shadow-sm, 0 1px 2px 0 rgb(0 0 0 / 0.05))",
        md: "var(--shadow-md, 0 4px 6px -1px rgb(0 0 0 / 0.1))",
        lg: "var(--shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1))",
        xl: "var(--shadow-xl, 0 20px 25px -5px rgb(0 0 0 / 0.1))",
        "2xl": "var(--shadow-2xl, 0 25px 50px -12px rgb(0 0 0 / 0.25))",
        inner: "var(--shadow-inner, inset 0 2px 4px 0 rgb(0 0 0 / 0.05))",
        none: "var(--shadow-none, none)",
      },
    },
    screens: {
      sm: "var(--breakpoint-sm, 640px)",
      md: "var(--breakpoint-md, 768px)",
      lg: "var(--breakpoint-lg, 1024px)",
      xl: "var(--breakpoint-xl, 1280px)",
      "2xl": "var(--breakpoint-2xl, 1536px)",
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
