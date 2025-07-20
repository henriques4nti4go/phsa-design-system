# �� PHSA Design System React

A comprehensive React design system built with modern tools and best practices, featuring reusable components, consistent styling, and powerful layout solutions.

## 📚 Live Documentation

🌐 **[View Live Documentation](https://henriques4nti4go.github.io/phsa-design-system/)**

Explore all components interactively in our Storybook documentation.

## ✨ Features

- 🧩 **50+ Modular Components** - Complete component library with TypeScript
- 🎨 **Tailwind CSS Ready** - Pre-styled components with customizable themes
- 🔧 **Form Management** - Integrated with React Hook Form + Zod validation
- 📊 **Advanced Data Tables** - Built with TanStack Table
- 🌙 **Dark/Light Theme** - Built-in theme switching
- 🔍 **Full TypeScript Support** - Complete type safety
- 📱 **Responsive & Accessible** - Mobile-first and WCAG compliant

## 🚀 Installation

```bash
npm install @phsa.tec/design-system-react
```

### Required Peer Dependencies

Install the required peer dependencies in your project:

```bash
npm install react react-dom @radix-ui/react-alert-dialog @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-icons @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-tooltip class-variance-authority clsx lucide-react tailwind-merge
```

Or use yarn:

```bash
yarn add react react-dom @radix-ui/react-alert-dialog @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-icons @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-tooltip class-variance-authority clsx lucide-react tailwind-merge
```

## ⚙️ Setup

### 1. Configure Tailwind CSS

Add to your `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
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
        // Add more theme colors as needed
      },
    },
  },
  plugins: [],
};
```

### 2. Add CSS Variables

Add these CSS variables to your global CSS file (`globals.css` or `index.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}
```

### 3. Theme Provider (Optional)

For dark/light mode support, wrap your app with the theme provider:

```tsx
import { ThemeProvider } from "next-themes";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

## 🎯 Usage Examples

### Basic Components

```tsx
import {
  Button,
  Input,
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@phsa.tec/design-system-react";

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input placeholder="Enter your name" />
          <div className="flex gap-2">
            <Button>Primary Action</Button>
            <Button variant="secondary">Secondary</Button>
          </div>
          <Badge>New Feature</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
```

### Form Example with Validation

```tsx
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@phsa.tec/design-system-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(1, "Please select a role"),
});

function UserForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

### Data Table Example

```tsx
import { DataTable } from "@phsa.tec/design-system-react";
import { ColumnDef } from "@tanstack/react-table";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
];

function UsersTable() {
  const data: User[] = [
    { id: "1", name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User" },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="name"
      searchPlaceholder="Search users..."
    />
  );
}
```

### Dialog/Modal Example

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
} from "@phsa.tec/design-system-react";

function MyDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to continue?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2">
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

## 🧩 Available Components

### Layout

- `Card`, `CardContent`, `CardHeader`, `CardTitle`, `CardDescription`
- `Sheet`, `SheetContent`, `SheetHeader`, `SheetTitle`
- `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`
- `Separator`

### Data Display

- `DataTable` - Advanced table with sorting, filtering, pagination
- `Badge` - Status indicators
- `Avatar`, `AvatarImage`, `AvatarFallback`
- `Tooltip`, `TooltipContent`, `TooltipProvider`, `TooltipTrigger`

### Data Input

- `Input` - Text input with validation
- `Button` - Customizable button component
- `Select`, `SelectContent`, `SelectItem`, `SelectTrigger`, `SelectValue`
- `Checkbox` - Checkbox input
- `Switch` - Toggle switch
- `Form`, `FormControl`, `FormField`, `FormItem`, `FormLabel`, `FormMessage`

### Feedback

- `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogTrigger`
- `AlertDialog`, `AlertDialogAction`, `AlertDialogCancel`
- `Toast` - Notification system
- `Alert`, `AlertDescription`, `AlertTitle`

### Navigation

- `DropdownMenu`, `DropdownMenuContent`, `DropdownMenuItem`
- `Command`, `CommandDialog`, `CommandInput`, `CommandList`

## 🎨 Customization

### Component Variants

Most components support multiple variants:

```tsx
// Button variants
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Button sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
```

### Custom Styling

Components accept custom className props:

```tsx
<Button className="bg-purple-500 hover:bg-purple-600">
  Custom Purple Button
</Button>
```

## 🔧 TypeScript Support

All components are fully typed with TypeScript:

```tsx
import type { ButtonProps } from "@phsa.tec/design-system-react";

interface CustomButtonProps extends ButtonProps {
  isLoading?: boolean;
}

function CustomButton({ isLoading, children, ...props }: CustomButtonProps) {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading ? "Loading..." : children}
    </Button>
  );
}
```

## 📚 Documentation & Storybook

- **Live Documentation**: [https://henriques4nti4go.github.io/phsa-design-system/](https://henriques4nti4go.github.io/phsa-design-system/)
- **Interactive Examples**: All components include interactive Storybook stories
- **Props Documentation**: Complete API reference for all components

## 🤝 Support & Contributing

- **Issues**: [GitHub Issues](https://github.com/henriques4nti4go/phsa-design-system/issues)
- **Repository**: [GitHub](https://github.com/henriques4nti4go/phsa-design-system)
- **NPM Package**: [@phsa.tec/design-system-react](https://www.npmjs.com/package/@phsa.tec/design-system-react)

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ using React, TypeScript, Tailwind CSS, and Radix UI
