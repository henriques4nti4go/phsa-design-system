import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "./Table";
import { ColumnDef } from "@tanstack/react-table";

const meta: Meta<typeof Table> = {
  title: "DataDisplay/Table",
  component: Table,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Table<User>>;

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const mockData: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Editor",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "User",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "Editor",
  },
  {
    id: 6,
    name: "Diana Miller",
    email: "diana@example.com",
    role: "User",
  },
];

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: true,
  },
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
  },
  {
    accessorKey: "email",
    header: "Email",
    enableSorting: true,
  },
  {
    accessorKey: "role",
    header: "Role",
  },
];

export const Default: Story = {
  args: {
    data: mockData,
    columns: columns,
    pagination: {
      pageIndex: 0,
      pageSize: 5,
    },
    onPaginationChange: (pagination) => {
      console.log("Page changed:", {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      });
    },
  },
};

export const SmallPageSize: Story = {
  args: {
    data: mockData,
    columns: columns,
    pagination: {
      pageIndex: 0,
      pageSize: 3,
    },
    onPaginationChange: (pagination) => {
      console.log("Page changed:", {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      });
    },
  },
};

export const StartingFromPage2: Story = {
  args: {
    data: mockData,
    columns: columns,
    pagination: {
      pageIndex: 1, // Starts from second page
      pageSize: 3,
    },
    onPaginationChange: (pagination) => {
      console.log("Page changed:", {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      });
    },
  },
};

export const EmptyTable: Story = {
  args: {
    data: [],
    columns: columns,
  },
};

export const SingleRow: Story = {
  args: {
    data: [mockData[0]],
    columns: columns,
  },
};
