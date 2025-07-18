"use client";

import { DataTableViewOptions } from "./data-table-view-options";
import { DynamicTableToolbarProps } from "./types";

export function DataTableToolbar<TData>({
  table,
  filters,
  showColumnVisibility,
}: DynamicTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">{filters}</div>
      {showColumnVisibility && <DataTableViewOptions table={table} />}
    </div>
  );
}
