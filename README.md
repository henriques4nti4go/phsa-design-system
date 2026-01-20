# PHSA Design System React

A modern, **fully isolated** React component library built with TypeScript, Tailwind CSS, and Radix UI.

## Features

- **Zero Conflicts** - Fully isolated CSS, won't interfere with your project's styles
- **Customizable** - Via CSS Variables or Tailwind Preset
- **Accessible** - Built with Radix UI primitives
- **Dark Mode** - Native dark theme support
- **TypeScript** - Full type support

## Documentation

[View Full Documentation](https://henriques4nti4go.github.io/phsa-design-system/)

## Installation

```bash
npm install @phsa.tec/design-system-react
# or
yarn add @phsa.tec/design-system-react
# or
pnpm add @phsa.tec/design-system-react
```

## Basic Usage

### Step 1: Add Styles to Your Project

Copy the design system styles to your project's `globals.css` (or main CSS file). You can customize all CSS variables and styles as needed:

```css
/* globals.css or your main CSS file */
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: oklch(100% 0 0);
    --foreground: oklch(25% 0.01 150);
    --primary: oklch(42% 0.15 145);
    --primary-foreground: oklch(98% 0 0);
    /* ... customize all variables you want */
  }

  .dark {
    --background: oklch(4% 0.01 150);
    --foreground: oklch(95% 0.02 150);
    /* ... customize dark mode variables */
  }
}
```

**Important:** Place these styles in your project's `globals.css` file and customize the CSS variables (`--primary`, `--background`, etc.) to match your brand colors and design preferences.

### Step 2: Use Components

```tsx
// Import components
import { Button, Card } from "@phsa.tec/design-system-react";

function App() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  );
}
```

## Customization

The design system uses **OKLCH** color format for better color consistency and wider gamut support. All styles are in your `globals.css` file, so you can customize any variable or style you want.

### Customizing Colors

Simply modify the CSS variables in your `globals.css`:

```css
/* globals.css */
:root {
  /* Primary colors - using OKLCH format */
  --primary: oklch(42% 0.15 145); /* Lightness Chroma Hue */
  --primary-foreground: oklch(98% 0 0);
  
  /* Change to your brand colors */
  --secondary: oklch(96% 0.02 150);
  --secondary-foreground: oklch(25% 0.01 150);

  /* Feedback colors */
  --destructive: oklch(60% 0.20 0);
  --success: oklch(42% 0.15 145);
  --warning: oklch(50% 0.18 48);

  /* Neutral colors */
  --background: oklch(100% 0 0);
  --foreground: oklch(25% 0.01 150);
  --muted: oklch(96% 0.02 150);
  --muted-foreground: oklch(45% 0.01 150);
  --border: oklch(88% 0.03 150);

  /* Other */
  --radius: 0.5rem;
  --font-family: "Roboto", sans-serif;
}

/* Dark mode */
.dark {
  --background: oklch(4% 0.01 150);
  --foreground: oklch(95% 0.02 150);
  --primary: oklch(48% 0.16 145);
  /* ... customize any other variables */
}
```

**Tip:** You can use online OKLCH color pickers or convert from HSL/HEX to OKLCH. The format is `oklch(lightness% chroma hue)` where:
- Lightness: 0-100%
- Chroma: 0-0.4 (saturation)
- Hue: 0-360 (color angle)

### Option 2: Tailwind Preset (Advanced)

If your project uses Tailwind CSS, you can extend with our preset:

```js
// tailwind.config.js
module.exports = {
  presets: [require("@phsa.tec/design-system-react/tailwind-preset")],
  theme: {
    extend: {
      // Your customizations
      colors: {
        primary: {
          DEFAULT: "#your-color",
        },
      },
    },
  },
};
```

## Available CSS Variables

### Colors

| Variable | Description |
|----------|-------------|
| `--primary` | Primary color |
| `--primary-foreground` | Text on primary color |
| `--secondary` | Secondary color |
| `--secondary-foreground` | Text on secondary color |
| `--destructive` | Error/danger color |
| `--success` | Success color |
| `--warning` | Warning color |
| `--muted` | Muted color |
| `--muted-foreground` | Muted text |
| `--background` | Page background |
| `--foreground` | Main text |
| `--border` | Border color |
| `--input` | Input color |
| `--ring` | Focus ring color |

### Layout

| Variable | Description | Default |
|----------|-------------|---------|
| `--radius` | Base border radius | `0.5rem` |
| `--font-family` | Font family | `"Roboto"` |

### Spacing

| Variable | Description |
|----------|-------------|
| `--spacing-xs` | Extra small |
| `--spacing-sm` | Small |
| `--spacing-md` | Medium |
| `--spacing-lg` | Large |
| `--spacing-xl` | Extra large |

## Available Components

### Layout
- `Card`, `CardHeader`, `CardContent`, `CardFooter`
- `Sheet`, `SheetContent`, `SheetHeader`
- `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`
- `Separator`

### Forms
- `Button`
- `Input`
- `Select`, `SelectTrigger`, `SelectContent`, `SelectItem`
- `Checkbox`
- `Switch`
- `Label`

### Data Display
- `DataTable`
- `Badge`
- `Avatar`

### Feedback
- `Dialog`, `DialogContent`, `DialogHeader`
- `AlertDialog`
- `Toast`, `Toaster`
- `Alert`
- `Spinner`

### Navigation
- `DropdownMenu`
- `Command`
- `Popover`

## Dark Mode

Add the `dark` class to the root element:

```tsx
// With next-themes
import { ThemeProvider } from "next-themes";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      {/* Your app */}
    </ThemeProvider>
  );
}
```

## Compatibility

- Projects **without** Tailwind CSS
- Projects **with** Tailwind CSS (no conflicts)
- Next.js, Vite, Create React App
- React 18+

## Package Exports

```typescript
// Components
import { Button, Card } from "@phsa.tec/design-system-react";

// Note: CSS styles should be added to your project's globals.css file
// See "Basic Usage" section above for details
```

## Development

```bash
# Install dependencies
yarn install

# Storybook
yarn storybook

# Build library
yarn build:lib

# Watch mode
yarn build:lib:watch

# Tests
yarn test
```

## License

MIT

---

Built by the PHSA team
