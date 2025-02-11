import type { Meta, StoryObj } from "@storybook/react";
import { DynamicTable } from "./index";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import { ColumnDef } from "@tanstack/react-table";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
}

const meta: Meta<typeof DynamicTable> = {
  title: "DataDisplay/DynamicTable",
  component: DynamicTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DynamicTable>;

export default meta;
type Story = StoryObj<typeof DynamicTable<User>>;

const data: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "inactive",
  },
];

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Função",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.original.status === "active"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {row.original.status === "active" ? "Ativo" : "Inativo"}
      </span>
    ),
  },
  {
    id: "actions",
    cell: () => (
      <Button variant="ghost" size="sm">
        Editar
      </Button>
    ),
  },
];

export const Default: Story = {
  args: {
    data,
    columns,
  },
};

export const WithFilters: Story = {
  args: {
    ...Default.args,
    filters: (
      <>
        <Input placeholder="Buscar por nome..." className="max-w-xs" />
        <Button>Filtrar</Button>
      </>
    ),
  },
};

export const WithPagination: Story = {
  args: {
    ...Default.args,
    pagination: true,
    rowsPerPage: [5, 10, 20],
  },
};

export const WithColumnVisibility: Story = {
  args: {
    ...Default.args,
    columnVisibility: true,
  },
};
