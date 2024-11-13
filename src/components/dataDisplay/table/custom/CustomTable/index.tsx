import React from "react";
import { DataTable } from "./data-table";
export { DataTableColumnHeader } from "./data-table-column-header";
export { DataTableRowActions } from "./data-table-row-actions";

import { ColumnDef, TableState } from "@tanstack/react-table";

export type CustomTableProps<TData, TValue> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  callback?: (data: TableState) => void;
};

export function CustomTable<TData, TValue>({
  data,
  columns,
  callback = () => {},
}: CustomTableProps<TData, TValue>) {
  return <DataTable columns={columns} data={data} callback={callback} />;
}
