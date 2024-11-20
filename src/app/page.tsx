"use client";
import { dataTable } from "../components/dataDisplay/Table/table.stories";
import {
  CustomTable,
  DataTablePagination,
  DataTableToolbar,
} from "../components/dataDisplay";
import { columns } from "./columns";

export default function Home() {
  return (
    <div className="flex w-full my-10 justify-center">
      <CustomTable
        columns={columns}
        data={dataTable}
        renderPagination={(table) => <DataTablePagination table={table} />}
        renderToolbar={(table) => <DataTableToolbar table={table} />}
      />
    </div>
  );
}
