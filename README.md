# 🎨 PHSA Design System React

A modern React component library built with TypeScript, Tailwind CSS, and Radix UI.

## 📚 Documentation

🌐 **[View Live Documentation](https://henriques4nti4go.github.io/phsa-design-system/)**

## 🚀 Installation

```bash
npm install @phsa.tec/design-system-react
```

## ⚙️ Setup

### 1. Import Styles

Add this import to your main CSS file or app entry point:

```typescript
import "@phsa.tec/design-system-react/styles";
```

### 2. Configure Tailwind CSS

Update your `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@phsa.tec/design-system-react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
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
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

### 3. Add CSS Variables

Add these variables to your global CSS file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 150 6% 25%;
    --primary: 145 63% 42%;
    --primary-foreground: 0 0% 98%;
    --secondary: 150 10% 96%;
    --secondary-foreground: 150 6% 25%;
    --muted: 150 10% 96%;
    --muted-foreground: 150 6% 45%;
    --accent: 150 10% 96%;
    --accent-foreground: 150 6% 25%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --success: 145 63% 42%;
    --success-foreground: 0 0% 98%;
    --border: 150 12% 88%;
    --input: 150 12% 88%;
    --ring: 145 63% 42%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 150 15% 4%;
    --foreground: 150 10% 95%;
    --primary: 145 63% 48%;
    --primary-foreground: 150 15% 8%;
    --secondary: 150 12% 12%;
    --secondary-foreground: 150 10% 95%;
    --muted: 150 12% 12%;
    --muted-foreground: 150 8% 60%;
    --accent: 150 12% 12%;
    --accent-foreground: 150 10% 95%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 150 12% 18%;
    --input: 150 12% 18%;
    --ring: 145 63% 48%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## 🎯 Usage

```typescript
import {
  Button,
  Input,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@phsa.tec/design-system-react";

function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello World</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input placeholder="Enter text..." />
          <Button>Click me</Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

## 🧩 Available Components

- **Layout**: Card, Sheet, Tabs, Separator
- **Forms**: Input, Button, Select, Checkbox, Switch, Form
- **Data**: DataTable, Badge, Avatar
- **Feedback**: Dialog, AlertDialog, Toast, Alert
- **Navigation**: DropdownMenu, Command

## 🌙 Dark Mode (Optional)

For theme switching support:

```bash
npm install next-themes
```

```typescript
import { ThemeProvider } from "next-themes";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {/* Your app */}
    </ThemeProvider>
  );
}
```
