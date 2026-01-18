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

```tsx
// 1. Import CSS (required)
import "@phsa.tec/design-system-react/styles.css";

// 2. Import components
import { DesignSystemProvider, Button, Card } from "@phsa.tec/design-system-react";

function App() {
  return (
    <DesignSystemProvider>
      <Card>
        <Button>Click me</Button>
      </Card>
    </DesignSystemProvider>
  );
}
```

## Customization

### Option 1: CSS Variables (Recommended)

Override CSS variables in your stylesheet:

```css
/* globals.css */
:root {
  /* Primary colors */
  --primary: 220 90% 50%;
  --primary-foreground: 0 0% 100%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222 47% 11%;

  /* Feedback colors */
  --destructive: 0 84% 60%;
  --success: 142 76% 36%;
  --warning: 38 92% 50%;

  /* Neutral colors */
  --background: 0 0% 100%;
  --foreground: 222 84% 5%;
  --muted: 210 40% 96%;
  --muted-foreground: 215 16% 47%;
  --border: 214 32% 91%;

  /* Other */
  --radius: 0.5rem;
  --font-family: "Inter", sans-serif;
}

/* Dark mode */
.dark {
  --background: 222 84% 5%;
  --foreground: 210 40% 98%;
  /* ... other variables */
}
```

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
import { DesignSystemProvider } from "@phsa.tec/design-system-react";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <DesignSystemProvider>
        {/* Your app */}
      </DesignSystemProvider>
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

// CSS (required)
import "@phsa.tec/design-system-react/styles.css";

// Tailwind Preset (optional)
// In tailwind.config.js:
// presets: [require("@phsa.tec/design-system-react/tailwind-preset")]
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
