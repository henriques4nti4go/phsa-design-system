# 🎨 PHSA Design System React

A modern, **fully isolated** React component library built with TypeScript, Tailwind CSS, and Radix UI. **No Tailwind installation required** in your project!

## ✨ Features

- 🎯 **Zero Configuration** - Works out of the box, no Tailwind setup needed
- 🔒 **Fully Isolated** - CSS is completely isolated, won't conflict with your project's styles
- 🎨 **Customizable** - Easy theme customization via Provider props
- 📦 **Lightweight** - Only includes the CSS you actually use
- ♿ **Accessible** - Built with Radix UI primitives
- 🌙 **Dark Mode** - Built-in dark mode support

## 📚 Documentation

🌐 **[View Live Documentation](https://henriques4nti4go.github.io/phsa-design-system/)**

## 🚀 Quick Start

### 1. Install

```bash
npm install @phsa.tec/design-system-react
# or
yarn add @phsa.tec/design-system-react
# or
pnpm add @phsa.tec/design-system-react
```

### 2. Wrap Your App

```tsx
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

**That's it!** The CSS is automatically injected. No configuration needed.

## 🎨 Customization

You can customize **all Tailwind properties** through the `DesignSystemProvider`:

### Complete Theme Customization

```tsx
import { DesignSystemProvider } from "@phsa.tec/design-system-react";

function App() {
  return (
    <DesignSystemProvider
      theme={{
        colors: {
          primary: "#3b82f6",
          secondary: "#10b981",
          // ... all color options
        },
        spacing: {
          base: "0.25rem",  // 4px
          sm: "0.5rem",     // 8px
          md: "1rem",       // 16px
          lg: "1.5rem",     // 24px
          xl: "2rem",       // 32px
        },
        typography: {
          fontFamily: "Inter, sans-serif",
          fontSize: {
            sm: "0.875rem",
            base: "1rem",
            lg: "1.125rem",
          },
        },
        borderRadius: {
          sm: "0.25rem",
          md: "0.5rem",
          lg: "0.75rem",
        },
      }}
    >
      {/* Your app */}
    </DesignSystemProvider>
  );
}
```

### Simple Color Customization (Legacy)

For backward compatibility, you can still use the `colors` prop:

```tsx
<DesignSystemProvider
  colors={{
    primary: "#3b82f6",
    secondary: "#10b981",
  }}
>
  {/* Your app */}
</DesignSystemProvider>
```

### Available Theme Properties

#### Colors (`theme.colors`)

- `primary`, `primaryForeground`
- `secondary`, `secondaryForeground`
- `accent`, `accentForeground`
- `destructive`, `destructiveForeground`
- `success`, `successForeground`
- `warning`
- `muted`, `mutedForeground`
- `background`, `foreground`
- `card`, `cardForeground`
- `popover`, `popoverForeground`
- `border`, `input`, `ring`
- `radius`

**Color formats supported:**
- **Hex**: `"#3b82f6"`
- **HSL**: `"217 91% 60%"` (without `hsl()` wrapper)
- **RGB**: Standard RGB values

#### Spacing (`theme.spacing`)

Customize spacing scale used by padding, margin, gap utilities:

```tsx
theme={{
  spacing: {
    base: "0.25rem",  // Base unit (default: 4px)
    xs: "0.5rem",     // Extra small
    sm: "0.75rem",    // Small
    md: "1rem",       // Medium
    lg: "1.5rem",     // Large
    xl: "2rem",       // Extra large
    "2xl": "3rem",    // 2x extra large
    "3xl": "4rem",    // 3x extra large
  }
}}
```

#### Typography (`theme.typography`)

```tsx
theme={{
  typography: {
    fontFamily: "Inter, sans-serif",
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
    },
    fontWeight: {
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    lineHeight: {
      none: "1",
      tight: "1.25",
      snug: "1.375",
      normal: "1.5",
      relaxed: "1.75",
      loose: "2",
    },
  }
}}
```

#### Border Radius (`theme.borderRadius`)

```tsx
theme={{
  borderRadius: {
    none: "0px",
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
    "3xl": "2rem",
    full: "9999px",
  }
}}
```

#### Box Shadow (`theme.boxShadow`)

```tsx
theme={{
  boxShadow: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
    none: "none",
  }
}}
```

#### Breakpoints (`theme.breakpoints`)

```tsx
theme={{
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  }
}}
```

## 🎯 Usage Examples

### Basic Components

```tsx
import {
  Button,
  Input,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DesignSystemProvider,
} from "@phsa.tec/design-system-react";

function App() {
  return (
    <DesignSystemProvider>
      <Card>
        <CardHeader>
          <CardTitle>Hello World</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Input placeholder="Enter text..." />
            <Button>Click me</Button>
          </div>
        </CardContent>
      </Card>
    </DesignSystemProvider>
  );
}
```

### With Custom Theme

```tsx
import { DesignSystemProvider, Button } from "@phsa.tec/design-system-react";

function App() {
  return (
    <DesignSystemProvider
      theme={{
        colors: {
          primary: "#8b5cf6",      // Purple
          secondary: "#06b6d4",    // Cyan
        },
        spacing: {
          md: "1.25rem",           // Custom medium spacing
          lg: "2rem",              // Custom large spacing
        },
        typography: {
          fontFamily: "Inter, sans-serif",
        },
      }}
    >
      <Button variant="default">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
    </DesignSystemProvider>
  );
}
```

### Advanced Customization Example

```tsx
import { DesignSystemProvider, Card, Button } from "@phsa.tec/design-system-react";

function App() {
  return (
    <DesignSystemProvider
      theme={{
        colors: {
          primary: "#6366f1",
          secondary: "#8b5cf6",
        },
        spacing: {
          base: "0.5rem",    // 8px base (instead of 4px)
          md: "1.5rem",      // 24px medium
          lg: "3rem",        // 48px large
        },
        typography: {
          fontFamily: "'Inter', 'Roboto', sans-serif",
          fontSize: {
            base: "16px",
            lg: "18px",
            xl: "20px",
          },
          fontWeight: {
            normal: "400",
            semibold: "600",
            bold: "700",
          },
        },
        borderRadius: {
          md: "0.75rem",
          lg: "1rem",
        },
        boxShadow: {
          md: "0 8px 16px -4px rgb(0 0 0 / 0.15)",
          lg: "0 16px 32px -8px rgb(0 0 0 / 0.2)",
        },
      }}
    >
      <Card>
        <Button>Customized Button</Button>
      </Card>
    </DesignSystemProvider>
  );
}
```

## 🧩 Available Components

### Layout
- **Card** - Container component with header, content, and footer
- **Sheet** - Slide-over panel
- **Tabs** - Tab navigation
- **Separator** - Visual divider
- **PageLayout** - Full page layout wrapper

### Forms
- **Input** - Text input with validation support
- **Button** - Button with multiple variants
- **Select** - Dropdown selection
- **Checkbox** - Checkbox input
- **Switch** - Toggle switch
- **Form** - Form wrapper with React Hook Form integration

### Data Display
- **DataTable** - Advanced table with sorting, filtering, pagination
- **Badge** - Status badge
- **Avatar** - User avatar
- **Text** - Typography component

### Feedback
- **Dialog** - Modal dialog
- **AlertDialog** - Confirmation dialog
- **Toast** - Notification toast
- **Alert** - Alert message
- **Spinner** - Loading spinner

### Navigation
- **DropdownMenu** - Dropdown menu
- **Breadcrumbs** - Breadcrumb navigation
- **Command** - Command palette

## 🌙 Dark Mode

The design system supports dark mode automatically. Add the `dark` class to your root element:

```tsx
// Toggle dark mode
document.documentElement.classList.toggle('dark');
```

Or use `next-themes` for React:

```bash
npm install next-themes
```

```tsx
import { ThemeProvider } from "next-themes";
import { DesignSystemProvider } from "@phsa.tec/design-system-react";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <DesignSystemProvider>
        {/* Your app */}
      </DesignSystemProvider>
    </ThemeProvider>
  );
}
```

## 🔒 Isolation & Compatibility

### ✅ Works With

- ✅ Projects **without** Tailwind CSS
- ✅ Projects **with** Tailwind CSS (no conflicts!)
- ✅ Next.js, Vite, Create React App, etc.
- ✅ Any React framework

### How It Works

The design system:
1. **Compiles CSS at build time** - All Tailwind classes are pre-compiled
2. **Uses unique class prefixes** - Classes are prefixed with `phsa-` to avoid conflicts
3. **Scopes CSS with `.ds`** - All styles are scoped to prevent interference
4. **Auto-injects CSS** - CSS is automatically loaded when you use `DesignSystemProvider`

## 📦 Package Exports

```typescript
// Components
import { Button, Card } from "@phsa.tec/design-system-react";

// Styles (if you need manual import)
import "@phsa.tec/design-system-react/styles";
// or
import styles from "@phsa.tec/design-system-react/styles";
```

## 🛠️ Development

For local development and contributing:

```bash
# Install dependencies
yarn install

# Run Storybook
yarn storybook

# Build library
yarn build:lib

# Watch mode
yarn build:lib:watch

# Run tests
yarn test
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## 📞 Support

- **Documentation**: [View Live Docs](https://henriques4nti4go.github.io/phsa-design-system/)
- **Issues**: [GitHub Issues](https://github.com/henriques4nti4go/phsa-design-system/issues)
- **Package**: [npm](https://www.npmjs.com/package/@phsa.tec/design-system-react)

---

Built with ❤️ by the PHSA team
