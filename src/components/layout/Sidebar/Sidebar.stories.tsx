import type { Meta, StoryObj } from "@storybook/react";
import { Sidebar } from "./Sidebar";
import {
  Users,
  FileText,
  LayoutDashboard,
  UserRound,
  Archive,
  Share,
  BarChart,
  Shield,
} from "lucide-react";

const meta = {
  title: "Layout/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="h-screen">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultNavbar = [
  {
    title: "Dashboard",
    items: [
      { title: "Overview", url: "/dashboard", icon: () => <LayoutDashboard /> },
      {
        title: "Analytics",
        url: "/dashboard/analytics",
        icon: () => <BarChart />,
      },
      {
        title: "Reports",
        url: "/dashboard/reports",
        isActive: true,
        icon: () => <Archive />,
      },
    ],
  },
  {
    title: "Users",
    url: "/users",

    items: [
      { title: "All Users", url: "/users", icon: () => <Users /> },
      {
        title: "Permissions",
        url: "/users/permissions",
        icon: () => <Shield />,
      },
      { title: "Roles", url: "/users/roles", icon: () => <UserRound /> },
    ],
  },
  {
    title: "Documents",
    url: "/documents",
    items: [
      { title: "All Documents", url: "/documents", icon: () => <FileText /> },
      { title: "Shared", url: "/documents/shared", icon: () => <Share /> },
      { title: "Archive", url: "/documents/archive", icon: () => <Archive /> },
    ],
  },
];

export const Default: Story = {
  args: {
    navbar: defaultNavbar,
    footer: () => <div>Footer</div>,
    children: (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome to your dashboard.</p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="font-semibold">Card {i + 1}</h3>
              <p className="text-sm text-muted-foreground">
                Card description here
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
};

export const WithoutFooter: Story = {
  args: {
    navbar: defaultNavbar,
    showFooter: false,
    children: (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings.</p>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="font-semibold">Settings Content</h3>
          <p className="text-sm text-muted-foreground">
            Settings form would go here
          </p>
        </div>
      </div>
    ),
  },
};
