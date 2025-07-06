import { ColumnDef } from "@tanstack/react-table";

export type CrudLayoutProps<ListData, CreateData, UpdateData> = {
  columns: ColumnDef<ListData>[];
  title: string;
  listRequest?: () => Promise<ListData[]>;
  createRequest?: (data?: CreateData) => Promise<ListData>;
  updateRequest?: (data?: UpdateData) => Promise<ListData>;
  deleteRequest?: (key: string) => Promise<void>;
  formComponent: React.ReactNode;

  form: any;
  actions?: ["create", "update", "delete"];
};
