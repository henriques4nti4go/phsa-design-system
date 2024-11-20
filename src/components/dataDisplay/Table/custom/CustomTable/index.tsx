import React from "react";
import { DataTable } from "./data-table";
export { DataTableColumnHeader } from "./data-table-column-header";
export { DataTableRowActions } from "./data-table-row-actions";
export { DataTablePagination } from "./data-table-pagination";
export { DataTableToolbar } from "./data-table-toolbar";

import { ColumnDef, TableState } from "@tanstack/react-table";

export type CustomTableProps<TData, TValue> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  callback?: (data: TableState) => void;
  renderToolbar?: (table: any) => React.ReactNode;
  renderPagination?: (table: any) => React.ReactNode;
};

export function CustomTable<TData, TValue>({
  data,
  columns,
  callback = () => {},
  renderPagination = () => null,
  renderToolbar = () => null,
}: CustomTableProps<TData, TValue>) {
  return (
    <DataTable
      columns={columns}
      data={data}
      callback={callback}
      renderPagination={renderPagination}
      renderToolbar={renderToolbar}
    />
  );
}
