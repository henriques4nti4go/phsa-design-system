// src/components/data-display/DataTable/index.tsx
"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Table as TanStackTable,
  type Column,
  type Row,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button as UIButton } from "@/components/ui/button"
import {
  Table as UITable,
  TableBody as UITableBody,
  TableCell as UITableCell,
  TableHead as UITableHead,
  TableHeader as UITableHeader,
  TableRow as UITableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

/**
 * Table raiz (primitivo) baseado no shadcn.
 */
export const Table = UITable
export type TableProps = React.ComponentProps<typeof UITable>

/**
 * TableHeader (primitivo).
 */
export const TableHeader = UITableHeader
export type TableHeaderProps = React.ComponentProps<typeof UITableHeader>

/**
 * TableBody (primitivo).
 */
export const TableBody = UITableBody
export type TableBodyProps = React.ComponentProps<typeof UITableBody>

/**
 * TableRow (primitivo).
 */
export const TableRow = UITableRow
export type TableRowProps = React.ComponentProps<typeof UITableRow>

/**
 * TableHead (primitivo).
 */
export const TableHead = UITableHead
export type TableHeadProps = React.ComponentProps<typeof UITableHead>

/**
 * TableCell (primitivo).
 */
export const TableCell = UITableCell
export type TableCellProps = React.ComponentProps<typeof UITableCell>

export interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

/**
 * Componente de cabeçalho de coluna com ordenação.
 */
export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <UIButton
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 data-[state=open]:bg-accent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span>{title}</span>
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </UIButton>
    </div>
  )
}

export interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  actions?: Array<{
    label: string
    onClick: (row: TData) => void
    icon?: React.ReactNode
    variant?: "default" | "destructive"
  }>
}

/**
 * Componente de ações da linha (menu dropdown).
 */
export function DataTableRowActions<TData>({
  row,
  actions = [],
}: DataTableRowActionsProps<TData>) {
  if (actions.length === 0) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UIButton variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </UIButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {actions.map((action, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => action.onClick(row.original)}
            className={action.variant === "destructive" ? "text-destructive" : ""}
          >
            {action.icon && <span className="mr-2">{action.icon}</span>}
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export interface DataTableToolbarProps<TData> {
  table: TanStackTable<TData>
  searchKey?: string
  searchPlaceholder?: string
  filterComponent?: React.ReactNode
  actions?: React.ReactNode
}

/**
 * Barra de ferramentas do DataTable (busca, filtros, visibilidade de colunas).
 */
export function DataTableToolbar<TData>({
  table,
  searchKey,
  searchPlaceholder = "Buscar...",
  filterComponent,
  actions,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {searchKey && (
          <input
            placeholder={searchPlaceholder}
            value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px] rounded-md border border-input bg-background px-3 py-1 text-sm"
          />
        )}
        {filterComponent}
        {isFiltered && (
          <UIButton
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Limpar
            <span className="sr-only">Limpar filtros</span>
          </UIButton>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {actions}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <UIButton variant="outline" className="ml-auto h-8">
              Colunas <ChevronDown className="ml-2 h-4 w-4" />
            </UIButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export interface DataTablePaginationProps<TData> {
  table: TanStackTable<TData>
}

/**
 * Componente de paginação do DataTable.
 */
export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} de{" "}
        {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Linhas por página</p>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value))
            }}
            className="h-8 w-[70px] rounded-md border border-input bg-background px-2 text-sm"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <UIButton
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Ir para primeira página</span>
            {"<<"}
          </UIButton>
          <UIButton
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Ir para página anterior</span>
            {"<"}
          </UIButton>
          <UIButton
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Ir para próxima página</span>
            {">"}
          </UIButton>
          <UIButton
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Ir para última página</span>
            {">>"}
          </UIButton>
        </div>
      </div>
    </div>
  )
}

export interface DataTableProps<TData, TValue> {
  /**
   * Definições das colunas da tabela.
   */
  columns: ColumnDef<TData, TValue>[]
  /**
   * Dados da tabela.
   */
  data: TData[]
  /**
   * Chave da coluna usada para busca (opcional).
   */
  searchKey?: string
  /**
   * Placeholder do campo de busca.
   */
  searchPlaceholder?: string
  /**
   * Componente de filtro customizado.
   */
  filterComponent?: React.ReactNode
  /**
   * Ações adicionais na toolbar.
   */
  toolbarActions?: React.ReactNode
  /**
   * Ações da linha (menu dropdown).
   */
  rowActions?: Array<{
    label: string
    onClick: (row: TData) => void
    icon?: React.ReactNode
    variant?: "default" | "destructive"
  }>
  /**
   * Classes CSS adicionais para a tabela.
   */
  className?: string
  /**
   * Classes CSS adicionais para o container.
   */
  containerClassName?: string
  /**
   * Mostrar toolbar (busca, filtros, etc.).
   * @default true
   */
  showToolbar?: boolean
  /**
   * Mostrar paginação.
   * @default true
   */
  showPagination?: boolean
  /**
   * Tamanho da página inicial.
   * @default 10
   */
  pageSize?: number
}

/**
 * DataTable padrão do Design System.
 *
 * Componente de tabela completo com ordenação, filtros, busca, paginação e ações.
 * Baseado em @tanstack/react-table.
 *
 * @example
 * ```tsx
 * import { DataTable, type ColumnDef } from "@phsa.tec/design-system-react"
 *
 * interface User {
 *   id: string
 *   name: string
 *   email: string
 * }
 *
 * const columns: ColumnDef<User>[] = [
 *   {
 *     accessorKey: "name",
 *     header: "Nome",
 *   },
 *   {
 *     accessorKey: "email",
 *     header: "E-mail",
 *   },
 * ]
 *
 * function MyTable() {
 *   const data: User[] = [
 *     { id: "1", name: "João", email: "joao@example.com" },
 *     { id: "2", name: "Maria", email: "maria@example.com" },
 *   ]
 *
 *   return <DataTable columns={columns} data={data} searchKey="name" />
 * }
 * ```
 */
export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder,
  filterComponent,
  toolbarActions,
  rowActions,
  className,
  containerClassName,
  showToolbar = true,
  showPagination = true,
  pageSize = 10,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  // Adicionar coluna de ações se rowActions for fornecido
  const columnsWithActions = React.useMemo(() => {
    if (!rowActions || rowActions.length === 0) {
      return columns
    }

    return [
      ...columns,
      {
        id: "actions",
        cell: ({ row }: { row: Row<TData> }) => (
          <DataTableRowActions row={row} actions={rowActions} />
        ),
      } as ColumnDef<TData, TValue>,
    ]
  }, [columns, rowActions])

  const table = useReactTable({
    data,
    columns: columnsWithActions,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  })

  return (
    <div className={cn("space-y-4", containerClassName)}>
      {showToolbar && (
        <DataTableToolbar
          table={table}
          searchKey={searchKey}
          searchPlaceholder={searchPlaceholder}
          filterComponent={filterComponent}
          actions={toolbarActions}
        />
      )}
      <div className="rounded-md border">
        <Table className={className}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {showPagination && <DataTablePagination table={table} />}
    </div>
  )
}
