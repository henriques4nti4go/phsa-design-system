import {
  ColumnDef,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";

export interface Column<T> {
  header: string;
  accessorKey: keyof T;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
  filters?: React.ReactNode;
  onSort?: (field: keyof T, direction: "asc" | "desc") => void;
}

export interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  className?: string;
  toolbar?: React.ReactNode;
  pagination?: boolean;
  sorting?: boolean;
  columnVisibility?: boolean;
  filters?: React.ReactNode;
  rowsPerPage?: number[];
  defaultSort?: SortingState;
  defaultVisibility?: VisibilityState;
}

export interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filters?: React.ReactNode;
  showColumnVisibility?: boolean;
}

export interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
}

export interface DynamicTableProps<TData> {
  // ... mesmo conteúdo do DataTableProps
}

export interface DynamicTableToolbarProps<TData> {
  // ... mesmo conteúdo do DataTableToolbarProps
}

export interface DynamicTablePaginationProps<TData> {
  // ... mesmo conteúdo do DataTablePaginationProps
}
