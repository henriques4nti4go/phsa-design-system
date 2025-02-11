"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  VisibilityState,
  PaginationState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableToolbar } from "./data-table-toolbar";
import { DataTablePagination } from "./data-table-pagination";
import { cn } from "@/lib/utils";
import { DataTableProps } from "../../types";
import { DataTableColumnHeader } from "./data-table-column-header";

export function DynamicTable<TData>({
  data,
  columns,
  className,
  toolbar,
  pagination: showPagination = true,
  sorting: showSorting = true,
  columnVisibility: showColumnVisibility = true,
  filters,
  rowsPerPage = [10, 20, 30, 40, 50],
  defaultSort = [],
  defaultVisibility = {},
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>(defaultSort);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(defaultVisibility);
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: rowsPerPage[0],
    });

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: showSorting ? getSortedRowModel() : undefined,
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    manualPagination: false,
    pageCount: Math.ceil(data.length / pageSize),
    state: {
      sorting,
      columnVisibility,
      pagination,
    },
    enableSorting: showSorting,
  });

  return (
    <div className="space-y-4">
      {(toolbar || filters || showColumnVisibility) && (
        <DataTableToolbar
          table={table}
          filters={filters}
          showColumnVisibility={showColumnVisibility}
        />
      )}
      <div className={cn("rounded-md border", className)}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <DataTableColumnHeader
                        column={header.column}
                        title={header.column.columnDef.header as string}
                      />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {showPagination && (
        <DataTablePagination table={table} pageSizeOptions={rowsPerPage} />
      )}
    </div>
  );
}
