# 🎨 PHSA Design System

A comprehensive React design system built with modern tools and best practices, featuring reusable components, consistent styling, and powerful layout solutions.

## ✨ Features

- 🧩 **Modular Components** - Reusable React components built with TypeScript
- 🎭 **Storybook Integration** - Interactive component documentation and testing
- 🎨 **Tailwind CSS** - Utility-first CSS framework for rapid styling
- 🔧 **Form Management** - Integrated with React Hook Form for robust form handling
- 📊 **Data Tables** - Advanced table components with TanStack Table
- 🌙 **Theme Support** - Dark/light mode with next-themes
- 🔍 **Type Safety** - Full TypeScript support
- 🧪 **Testing Ready** - Jest and Testing Library setup
- 📱 **Responsive Design** - Mobile-first approach

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **UI Library**: Radix UI primitives
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **Data Fetching**: TanStack Query
- **Icons**: Lucide React
- **Documentation**: Storybook
- **Testing**: Jest + Testing Library
- **Language**: TypeScript

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine (version 18 or higher recommended).

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd phsa-design-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### 🏃 Running the Project

#### Development Server

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

#### Storybook

Launch Storybook for component development and documentation:

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) to view the component library.

#### Build for Production

```bash
npm run build
npm run start
```

#### Testing

```bash
npm run test
```

#### Linting

```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── ui/             # Base UI components
│   ├── layout/         # Layout components (Crud, etc.)
│   └── dataInput/      # Form input components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── styles/             # Global styles
└── types/              # TypeScript type definitions
```

This README provides a comprehensive overview of your design system project, including:

1. **Clear project description** with emoji icons for visual appeal
2. **Feature highlights** showcasing the main capabilities
3. **Complete tech stack** listing all major dependencies
4. **Step-by-step setup instructions** for new developers
5. **Project structure** to help navigate the codebase
6. **Component documentation** explaining key features
7. **Theming and configuration** guides
8. **Contributing guidelines** for team collaboration
9. **Scripts reference** for quick command lookup
10. **Professional formatting** with proper sections and styling

The README is written in English as requested and provides everything a developer would need to understand, set up, and contribute to your design system project.

## 🧩 Key Components

### Layout Components

- **CrudLayout** - Complete CRUD operations layout with forms, tables, and modals
- **DataTable** - Advanced table component with sorting, filtering, and pagination

### Form Components

- **Input** - Flexible input component with validation
- **Button** - Customizable button with variants
- **Select** - Dropdown selection component
- **Form controls** - Checkbox, Switch, and more

### UI Components

- **Dialog/Modal** - Accessible modal components
- **Toast** - Notification system
- **Avatar** - User avatar component
- **Tooltip** - Contextual help tooltips

## 📚 Documentation

Visit our Storybook documentation to explore all available components:

```bash
npm run storybook
```

Each component includes:

- 📖 **Usage examples**
- ⚙️ **Props documentation**
- 🎮 **Interactive controls**
- 💡 **Best practices**

## 🎨 Theming

The design system supports customizable themes through Tailwind CSS and next-themes:

```tsx
import { ThemeProvider } from "next-themes";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      {/* Your app */}
    </ThemeProvider>
  );
}
```

## 🔧 Configuration

### Tailwind CSS

Customize the design tokens in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Your custom colors
      },
      spacing: {
        // Your custom spacing
      },
    },
  },
};
```

### Component Variants

Components use `class-variance-authority` for consistent variant management:

```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
      },
    },
  }
);
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Add Storybook stories for new components
- Include tests for complex logic
- Follow the existing code style
- Update documentation as needed

## 📝 Scripts Reference

| Command                   | Description              |
| ------------------------- | ------------------------ |
| `npm run dev`             | Start development server |
| `npm run build`           | Build for production     |
| `npm run start`           | Start production server  |
| `npm run lint`            | Run ESLint               |
| `npm run storybook`       | Start Storybook          |
| `npm run build-storybook` | Build Storybook          |
| `npm run test`            | Run tests                |

## 📦 Publishing

This package is configured for publishing to npm:

```bash
npm publish
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Radix UI](https://radix-ui.com/) for accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Shadcn/ui](https://ui.shadcn.com/) for component inspiration
- [Storybook](https://storybook.js.org/) for component documentation

---

Built with ❤️ by the PHSA team
