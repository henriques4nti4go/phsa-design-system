// src/components/data-display/DataTable/DataTable.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs"
import React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable, DataTableColumnHeader } from "./index"
import { Button } from "../../actions/Button"

// Tipos de exemplo
interface Payment {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
  date: string
}

interface User {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive"
}

const paymentColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="E-mail" />
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Valor" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const statusMap: Record<string, { label: string; className: string }> = {
        pending: { label: "Pendente", className: "bg-yellow-100 text-yellow-800" },
        processing: { label: "Processando", className: "bg-blue-100 text-blue-800" },
        success: { label: "Sucesso", className: "bg-green-100 text-green-800" },
        failed: { label: "Falhou", className: "bg-red-100 text-red-800" },
      }
      const statusInfo = statusMap[status] || { label: status, className: "" }
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.className}`}>
          {statusInfo.label}
        </span>
      )
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"))
      return date.toLocaleDateString("pt-BR")
    },
  },
]

const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="E-mail" />
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Função" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
          }`}
        >
          {status === "active" ? "Ativo" : "Inativo"}
        </span>
      )
    },
  },
]

const paymentData: Payment[] = [
  {
    id: "1",
    amount: 100.0,
    status: "pending",
    email: "user1@example.com",
    date: "2024-01-15",
  },
  {
    id: "2",
    amount: 250.5,
    status: "processing",
    email: "user2@example.com",
    date: "2024-01-16",
  },
  {
    id: "3",
    amount: 500.0,
    status: "success",
    email: "user3@example.com",
    date: "2024-01-17",
  },
  {
    id: "4",
    amount: 75.25,
    status: "failed",
    email: "user4@example.com",
    date: "2024-01-18",
  },
  {
    id: "5",
    amount: 300.0,
    status: "success",
    email: "user5@example.com",
    date: "2024-01-19",
  },
]

const userData: User[] = [
  { id: "1", name: "João Silva", email: "joao@example.com", role: "Admin", status: "active" },
  { id: "2", name: "Maria Santos", email: "maria@example.com", role: "User", status: "active" },
  { id: "3", name: "Pedro Costa", email: "pedro@example.com", role: "User", status: "inactive" },
  { id: "4", name: "Ana Oliveira", email: "ana@example.com", role: "Moderator", status: "active" },
  { id: "5", name: "Carlos Souza", email: "carlos@example.com", role: "User", status: "active" },
]

const meta = {
  title: "Data Display/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <DataTable
      columns={paymentColumns}
      data={paymentData}
      searchKey="email"
      searchPlaceholder="Buscar por e-mail..."
    />
  ),
}

export const WithRowActions: Story = {
  name: "Com ações de linha",
  render: () => (
    <DataTable
      columns={paymentColumns}
      data={paymentData}
      searchKey="email"
      rowActions={[
        {
          label: "Ver detalhes",
          onClick: (row) => {
            console.log("Ver detalhes:", row)
          },
        },
        {
          label: "Editar",
          onClick: (row) => {
            console.log("Editar:", row)
          },
        },
        {
          label: "Excluir",
          onClick: (row) => {
            console.log("Excluir:", row)
          },
          variant: "destructive",
        },
      ]}
    />
  ),
}

export const WithoutSearch: Story = {
  name: "Sem busca",
  render: () => <DataTable columns={paymentColumns} data={paymentData} showToolbar={false} />,
}

export const WithoutPagination: Story = {
  name: "Sem paginação",
  render: () => (
    <DataTable
      columns={userColumns}
      data={userData}
      searchKey="name"
      showPagination={false}
    />
  ),
}

export const CustomPageSize: Story = {
  name: "Tamanho de página customizado",
  render: () => (
    <DataTable
      columns={paymentColumns}
      data={paymentData}
      searchKey="email"
      pageSize={3}
    />
  ),
}

export const WithToolbarActions: Story = {
  name: "Com ações na toolbar",
  render: () => (
    <DataTable
      columns={paymentColumns}
      data={paymentData}
      searchKey="email"
      toolbarActions={
        <Button onClick={() => console.log("Exportar")}>Exportar</Button>
      }
    />
  ),
}

export const ManyRows: Story = {
  name: "Muitas linhas",
  render: () => {
    const manyPayments = Array.from({ length: 50 }, (_, i) => ({
      id: String(i + 1),
      amount: Math.random() * 1000,
      status: ["pending", "processing", "success", "failed"][
        Math.floor(Math.random() * 4)
      ] as Payment["status"],
      email: `user${i + 1}@example.com`,
      date: new Date(2024, 0, i + 1).toISOString(),
    }))

    return (
      <DataTable
        columns={paymentColumns}
        data={manyPayments}
        searchKey="email"
        searchPlaceholder="Buscar por e-mail..."
      />
    )
  },
}

export const EmptyState: Story = {
  name: "Estado vazio",
  render: () => (
    <DataTable
      columns={paymentColumns}
      data={[]}
      searchKey="email"
    />
  ),
}
