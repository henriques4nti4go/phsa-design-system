import {
  ColumnDef,
  SortingState,
  Table,
  VisibilityState,
} from "@tanstack/react-table";

export interface DynamicTableProps<TData> {
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

export interface DynamicTablePaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
}

export interface DynamicTableToolbarProps<TData> {
  table: Table<TData>;
  filters?: React.ReactNode;
  showColumnVisibility?: boolean;
}

export interface DynamicTablePaginationProps<TData> {
  table: Table<TData>;
  filters?: React.ReactNode;
  showColumnVisibility?: boolean;
}
