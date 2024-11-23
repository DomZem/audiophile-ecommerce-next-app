"use client";

import React, { type ComponentProps, useEffect } from "react";
import {
  extractFieldNamesFromSchema,
  type ZodObjectInfer,
  type ZodObjectSchema,
} from "~/admin/utils/zod";
import { DataTableProvider, useDataTable } from "../DataTable";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
} from "@tanstack/react-table";
import { Button } from "../Button";
import { ArrowUpDown, LoaderCircle, MoreHorizontal } from "lucide-react";
import dayjs from "dayjs";
import { TableBody, TableCell, TableRow } from "../Table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../DropdownMenu";
import { type CurrentActionType, useAutoTable } from "./AutoTableContext";
import { mapDashedFieldName } from "~/admin/utils/map";

export const AutoTableSortableTable = <TSchema extends ZodObjectSchema>({
  schema,
  data,
  children,
  omitColumns,
  extraColumns,
}: {
  schema: TSchema;
  data: ZodObjectInfer<TSchema>[];
  children: React.ReactNode;
  omitColumns?: Partial<{
    [K in keyof ZodObjectInfer<TSchema>]: true;
  }>;
  extraColumns?: ColumnDef<ZodObjectInfer<TSchema>>[];
}) => {
  const { schema: autoTableSchema, rowIdentifierKey } = useAutoTable();
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // TODO: implement this
  // check if the autoTableSchema is the same as the schema passed in
  // if not, throw an error

  const fieldNames = extractFieldNamesFromSchema(schema);

  const filteredFieldNames = omitColumns
    ? fieldNames.filter((fieldName) => !omitColumns[fieldName])
    : fieldNames;

  const basicColumns: ColumnDef<ZodObjectInfer<TSchema>>[] =
    filteredFieldNames.map((fieldName) => ({
      accessorKey: fieldName,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {mapDashedFieldName(fieldName as string)}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const cellData = row.original[fieldName];

        if (typeof cellData === "object" && dayjs(cellData as Date).isValid()) {
          return dayjs(cellData as Date).format("DD/MM/YYYY HH:mm");
        }

        return <div>{cellData}</div>;
      },
    }));

  const columns = [...basicColumns, ...(extraColumns ?? [])];

  return (
    <DataTableProvider
      tableOptions={{
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        initialState: {
          columnOrder: ["id"],
        },
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
          sorting,
        },
        getRowId: (row) => row[rowIdentifierKey],
      }}
    >
      {children}
    </DataTableProvider>
  );
};

export const AutoTableBody = <
  TDetailsData extends Record<string, unknown>,
  TRowIdentifierKeyType extends string | number,
>({
  onDetails,
  detailsContent,
}: Pick<
  ComponentProps<
    typeof AutoTableDetailsRow<TDetailsData, TRowIdentifierKeyType>
  >,
  "onDetails" | "detailsContent"
>) => {
  const { table } = useDataTable();
  const columnsLength = table.getAllColumns().length;

  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <React.Fragment key={row.id}>
            <TableRow data-state={row.getIsSelected() && "selected"}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
            <AutoTableDetailsRow
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              rowId={row.original.id as TRowIdentifierKeyType}
              columnsLength={columnsLength}
              onDetails={onDetails}
              detailsContent={detailsContent}
            />
          </React.Fragment>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columnsLength} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

const AutoTableDetailsRow = <
  TDetailsData extends Record<string, unknown>,
  TRowIdentifierKeyType extends string | number,
>({
  rowId,
  columnsLength,
  onDetails,
  detailsContent,
}: {
  rowId: TRowIdentifierKeyType;
  columnsLength: number;
  onDetails: (args: { id: TRowIdentifierKeyType }) => Promise<TDetailsData>;
  detailsContent: (data: TDetailsData) => React.ReactNode;
}) => {
  const { selectedRow, currentAction, rowIdentifierKey } = useAutoTable();
  const [detailsData, setDetailsData] = React.useState<TDetailsData | null>(
    null,
  );

  // TODO: Check if the provided rowId is the same structure as the row from context
  // if not, throw an error

  const isSelectedRowDetails =
    currentAction === "DETAILS" && selectedRow?.id === rowId;

  useEffect(() => {
    if (isSelectedRowDetails) {
      void onDetails({ id: rowId }).then((data) => {
        setDetailsData(data);
      });
    }
  }, [isSelectedRowDetails]);

  if (!isSelectedRowDetails) {
    return null;
  }

  return (
    <TableRow className="relative w-screen" data-state="selected">
      <TableCell colSpan={columnsLength}>
        {!detailsData ? (
          <div className="flex h-96 items-center justify-center">
            <LoaderCircle className="animate-spin" />
          </div>
        ) : (
          detailsContent(detailsData)
        )}
      </TableCell>
    </TableRow>
  );
};

export const AutoTableActionsColumn = ({
  row,
}: {
  row: ZodObjectInfer<ZodObjectSchema>;
}) => {
  const { setCurrentAction, setSelectedRow } = useAutoTable();

  // TODO: Check if the provided row is the same structure as the row from context

  const setAction = (action: CurrentActionType) => {
    setSelectedRow(row);
    setCurrentAction(action);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setAction("DETAILS")}>
          Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setAction("UPDATE")}>
          Update
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setAction("DELETE")}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
