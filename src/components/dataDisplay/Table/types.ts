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
