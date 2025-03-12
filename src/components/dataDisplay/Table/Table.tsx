"use client";

import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  PaginationState,
} from "@tanstack/react-table";

export interface TableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  pageSize?: number;
  onSortingChange?: (sorting: SortingState) => void;
  sorting?: SortingState;
  onPaginationChange?: (pagination: PaginationState) => void;
  pagination?: PaginationState;
  emptyMessage?: string;
}

export function Table<TData>({
  data,
  columns,
  onSortingChange = () => {},
  sorting = [],
  pagination = { pageIndex: 0, pageSize: 0 },
  onPaginationChange = () => {},
  emptyMessage = "No results.",
}: TableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: (sorting) => {
      onSortingChange(sorting as SortingState);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: (pagination) => {
      onPaginationChange(pagination as PaginationState);
    },
    initialState: {
      pagination,
    },
  });

  const getSortingIcons = (column: {
    getIsSorted: () => string | false;
    getCanSort: () => boolean;
  }) => {
    const sortDirection = column.getIsSorted();

    if (!column.getCanSort()) return null;

    if (sortDirection === "asc") {
      return <ChevronUp className="ml-2 h-4 w-4 inline" />;
    } else if (sortDirection === "desc") {
      return <ChevronDown className="ml-2 h-4 w-4 inline" />;
    }

    return (
      <div className="ml-2 inline-flex flex-col">
        <ChevronUp className="h-3 w-3" />
        <ChevronDown className="h-3 w-3 -mt-1" />
      </div>
    );
  };

  return (
    <div className="rounded-md border">
      <ShadcnTable>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div
                      className={
                        header.column.getCanSort()
                          ? "cursor-pointer select-none flex items-center"
                          : ""
                      }
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {getSortingIcons(header.column)}
                    </div>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
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
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </ShadcnTable>

      <div className="flex items-center justify-end space-x-2 py-4 px-4 border-t">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} row(s) total
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <p className="text-sm font-medium">Page</p>
          <span className="text-sm font-medium">
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount() || 0}
          </span>
        </div>
      </div>
    </div>
  );
}
