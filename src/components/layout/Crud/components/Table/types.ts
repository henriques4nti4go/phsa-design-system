import { ColumnDef } from "@tanstack/react-table";

export interface TableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  isLoading: boolean;
  pagination: {
    page: number;
    limit: number;
    total: number;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
    pageOptions: number[];
  };
}
