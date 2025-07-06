import {
  Table as TableUI,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TableProps } from "./types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Table<TData>({
  data,
  columns,
  isLoading,
  pagination,
}: TableProps<TData>) {
  // Configuração da tabela
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: pagination ? Math.ceil(pagination.total / pagination.limit) : 1,
  });

  if (isLoading && data.length === 0) {
    return (
      <div className="rounded-md border">
        <TableUI>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                Carregando...
              </TableCell>
            </TableRow>
          </TableBody>
        </TableUI>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-md border">
        <TableUI>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                Nenhuma configuração encontrada
              </TableCell>
            </TableRow>
          </TableBody>
        </TableUI>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <TableUI>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </TableUI>
      </div>

      {pagination && (
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Linhas por página</p>
            <Select
              value={pagination.limit.toString()}
              onValueChange={(value) => pagination.onLimitChange(Number(value))}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent side="top">
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Página {pagination.page} de{" "}
              {Math.ceil(pagination.total / pagination.limit)}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => pagination.onPageChange(pagination.page - 1)}
                disabled={pagination.page <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => pagination.onPageChange(pagination.page + 1)}
                disabled={
                  pagination.page >=
                  Math.ceil(pagination.total / pagination.limit)
                }
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
