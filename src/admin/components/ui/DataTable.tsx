"use client";

import {
  flexRender,
  type TableOptions,
  useReactTable,
} from "@tanstack/react-table";
import { Table, TableHead, TableHeader, TableRow } from "./Table";
import React, { useContext } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./DropdownMenu";
import { Button } from "./Button";

interface IDataTableContext<TData> {
  table: ReturnType<typeof useReactTable<TData>>;
}

export const DataTableContext =
  React.createContext<IDataTableContext<any> | null>(null);

interface DataTableProviderProps<TData> {
  tableOptions: TableOptions<TData>;
  children: React.ReactNode;
}

export function DataTableProvider<TData>({
  tableOptions,
  children,
}: DataTableProviderProps<TData>) {
  const table = useReactTable(tableOptions);

  return (
    <DataTableContext.Provider
      value={{
        table,
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
}

export const useDataTable = () => {
  const dataTableContext = useContext(DataTableContext);

  if (!dataTableContext) {
    throw new Error("useDataTable has to be used within <DataTableProvider>");
  }

  return dataTableContext;
};

export const DataTable = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background rounded-md border">
      <Table>{children}</Table>
    </div>
  );
};

export const DataTableSelectColumns = ({
  mapColumnName,
}: {
  mapColumnName?: (name: string) => string;
}) => {
  const { table } = useDataTable();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {mapColumnName ? mapColumnName(column.id) : column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const DataTableHeader = () => {
  const { table } = useDataTable();

  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
};
