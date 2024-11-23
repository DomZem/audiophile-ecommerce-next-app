import React, { type ComponentProps, useEffect, useState } from "react";
import {
  extractFieldNamesFromSchema,
  type StringOrNumberKeyOnly,
  type ZodObjectInfer,
  type ZodObjectSchema,
} from "~/admin/utils/zod";
import { useToast } from "~/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../AlertDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../Dialog";
import { AutoForm, type AutoFormProps } from "../AutoForm";
import { DataTableProvider, useDataTable } from "../DataTable";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
} from "@tanstack/react-table";
import { Button } from "../Button";
import {
  ArrowUpDown,
  CirclePlus,
  CopyX,
  LoaderCircle,
  MoreHorizontal,
} from "lucide-react";
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
import { cn } from "~/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../Sheet";
import { type DefaultValues } from "react-hook-form";
import { type TypeOf } from "zod";
import { sanitizeSchemaObject } from "~/admin/utils/auto-form";
import { Pagination } from "../Pagination";
import { RowsPerPageSelect } from "../RowsPerPageSelect";
import { usePage } from "~/hooks/use-page";
import { useRowsPerPage } from "~/admin/hooks/use-rows-per-page";

export type CurrentActionType =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "DETAILS"
  | null;

interface AutoTableContext<
  TSchema extends ZodObjectSchema,
  TFormSchema extends ZodObjectSchema,
> {
  schema: TSchema;
  rowIdentifierKey: StringOrNumberKeyOnly<ZodObjectInfer<TSchema>>;
  selectedRow: ZodObjectInfer<TSchema> | null;
  setSelectedRow: (row: ZodObjectInfer<TSchema> | null) => void;
  currentAction: CurrentActionType;
  setCurrentAction: (action: CurrentActionType) => void;
  handleRefetchData: () => Promise<unknown>;
  handleDelete: () => Promise<unknown>;
  formSchema: TFormSchema;
  handleCreate: (data: ZodObjectInfer<TFormSchema>) => Promise<unknown>;
  handleUpdate: (data: ZodObjectInfer<TFormSchema>) => Promise<unknown>;
}

const AutoTableContext = React.createContext<AutoTableContext<
  ZodObjectSchema,
  ZodObjectSchema
> | null>(null);

export const AutoTableProvider = <
  TSchema extends ZodObjectSchema,
  TFormSchema extends ZodObjectSchema,
  TRowIdentifierKey extends Extract<
    StringOrNumberKeyOnly<ZodObjectInfer<TSchema>>,
    string
  >,
  TRowIdentifierKeyType extends ZodObjectInfer<TSchema>[TRowIdentifierKey],
>({
  schema,
  rowIdentifierKey,
  onRefetchData,
  children,
  onDelete,
  formSchema,
  onCreate,
  onUpdate,
}: {
  schema: TSchema;
  rowIdentifierKey: TRowIdentifierKey;
  formSchema: TFormSchema;
  children: React.ReactNode;
  onRefetchData: () => Promise<unknown>;
  onDelete: (args: { id: TRowIdentifierKeyType }) => Promise<unknown>;
  onCreate: (data: ZodObjectInfer<TFormSchema>) => Promise<unknown>;
  onUpdate: (
    data: {
      id: TRowIdentifierKeyType;
    } & ZodObjectInfer<TFormSchema>,
  ) => Promise<unknown>;
}) => {
  const [selectedRow, setSelectedRow] =
    useState<ZodObjectInfer<TSchema> | null>(null);
  const [currentAction, setCurrentAction] = useState<CurrentActionType>(null);
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!selectedRow) {
      throw new Error("No selected row to delete");
    }

    try {
      const id = selectedRow[rowIdentifierKey];
      await onDelete({ id });
      await onRefetchData();

      toast({
        title: "Success",
        description: "The data has been deleted successfully",
      });
    } catch (e) {
      console.error(e);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setCurrentAction(null);
    }
  };

  const handleSubmitData = async (callback: () => Promise<unknown>) => {
    try {
      await callback();
      await onRefetchData();

      toast({
        title: "Success",
        description: `The data has been ${currentAction === "CREATE" ? "created" : "updated"} successfully`,
      });

      setCurrentAction(null);
    } catch (e) {
      console.error(e);

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  return (
    <AutoTableContext.Provider
      value={{
        schema,
        rowIdentifierKey,
        currentAction,
        setCurrentAction: (action: CurrentActionType) =>
          setCurrentAction(action),
        selectedRow,
        setSelectedRow: (row: ZodObjectInfer<typeof schema> | null) =>
          setSelectedRow(row),
        handleRefetchData: onRefetchData,
        handleDelete,
        formSchema,
        handleCreate: async (data) => {
          await handleSubmitData(async () => {
            await onCreate(data);
          });
        },
        handleUpdate: async (data) => {
          if (!selectedRow) {
            throw new Error("No selected row to update");
          }

          await handleSubmitData(async () => {
            await onUpdate({
              ...data,
              id: selectedRow[rowIdentifierKey],
            });
          });
        },
      }}
    >
      {children}
    </AutoTableContext.Provider>
  );
};

export const useAutoTable = () => {
  const context = React.useContext(AutoTableContext);

  if (!context) {
    throw new Error("useAutoTable must be used within an AutoTableProvider");
  }

  return context;
};

export const AutoTableDeleteDialog = ({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) => {
  const { currentAction, setCurrentAction, handleDelete } = useAutoTable();

  const handleClose = () => {
    setCurrentAction(null);
  };

  return (
    <AlertDialog open={currentAction === "DELETE"} onOpenChange={handleClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title ?? "Are you absolutely sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description ??
              "This action cannot be undone. This will permanently delete data from our servers."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const AutoTableDialog = ({
  isOpen,
  onClose,
  title,
  description,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children: React.ReactNode;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="sr-only">
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export const AutoTableSheet = ({
  isOpen,
  onClose,
  title,
  description,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children: React.ReactNode;
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription className="sr-only">{description}</SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};

type AutoTableForms<TFormSchema extends ZodObjectSchema> = {
  createFormConfig?: {
    title?: string;
    description?: string;
  };
  updateFormConfig?: {
    title?: string;
    description?: string;
  };
} & Pick<AutoFormProps<TFormSchema>, "fieldsConfig">;

export const AutoTableDialogForms = <TFormSchema extends ZodObjectSchema>({
  createFormConfig,
  updateFormConfig,
  fieldsConfig,
}: AutoTableForms<TFormSchema>) => {
  const {
    currentAction,
    setCurrentAction,
    selectedRow,
    formSchema,
    handleCreate,
    handleUpdate,
  } = useAutoTable();

  const handleClose = () => {
    setCurrentAction(null);
  };

  const defaultValues = selectedRow
    ? (sanitizeSchemaObject(selectedRow, formSchema) as DefaultValues<
        TypeOf<TFormSchema>
      >)
    : undefined;

  return (
    <>
      <AutoTableDialog
        isOpen={currentAction === "CREATE"}
        title={createFormConfig?.title ?? "Create"}
        description={createFormConfig?.description ?? "Create a new row"}
        onClose={handleClose}
      >
        <AutoForm
          schema={formSchema}
          fieldsConfig={fieldsConfig}
          mapLabel={mapDashedFieldName}
          onSubmit={handleCreate}
        />
      </AutoTableDialog>
      <AutoTableDialog
        isOpen={currentAction === "UPDATE"}
        title={updateFormConfig?.title ?? "Update"}
        description={updateFormConfig?.description ?? "Update the row"}
        onClose={handleClose}
      >
        <AutoForm
          schema={formSchema}
          fieldsConfig={fieldsConfig}
          mapLabel={mapDashedFieldName}
          defaultValues={defaultValues}
          onSubmit={handleUpdate}
        />
      </AutoTableDialog>
    </>
  );
};

export const AutoTableSheetForms = <TFormSchema extends ZodObjectSchema>({
  createFormConfig,
  updateFormConfig,
  fieldsConfig,
}: AutoTableForms<TFormSchema>) => {
  const {
    currentAction,
    setCurrentAction,
    selectedRow,
    formSchema,
    handleCreate,
    handleUpdate,
  } = useAutoTable();

  const handleClose = () => {
    setCurrentAction(null);
  };

  const defaultValues = selectedRow
    ? (sanitizeSchemaObject(selectedRow, formSchema) as DefaultValues<
        TypeOf<TFormSchema>
      >)
    : undefined;

  return (
    <>
      <AutoTableSheet
        isOpen={currentAction === "CREATE"}
        title={createFormConfig?.title ?? "Create"}
        description={createFormConfig?.description ?? "Create a new row"}
        onClose={handleClose}
      >
        <AutoForm
          schema={formSchema}
          fieldsConfig={fieldsConfig}
          mapLabel={mapDashedFieldName}
          onSubmit={handleCreate}
        />
      </AutoTableSheet>
      <AutoTableSheet
        isOpen={currentAction === "UPDATE"}
        title={updateFormConfig?.title ?? "Update"}
        description={updateFormConfig?.description ?? "Update the row"}
        onClose={handleClose}
      >
        <AutoForm
          schema={formSchema}
          fieldsConfig={fieldsConfig}
          mapLabel={mapDashedFieldName}
          defaultValues={defaultValues}
          onSubmit={handleUpdate}
        />
      </AutoTableSheet>
    </>
  );
};

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
  const { schema: autoTableSchema, rowIdentifierKey: rowIdentifier } =
    useAutoTable();
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
            {mapDashedFieldName(fieldName)}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const cellData = row.original[fieldName];

        if (typeof cellData === "object" && dayjs(cellData as Date).isValid()) {
          return dayjs(cellData as Date).format("DD/MM/YYYY");
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
        getRowId: (row) => row[rowIdentifier] as string,
      }}
    >
      {children}
    </DataTableProvider>
  );
};

export const AutoTableHeader = ({
  className,
  children,
  ...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
  return (
    <header
      className={cn("flex items-center justify-between", className)}
      {...props}
    >
      {children}
    </header>
  );
};

export const AutoTableHeaderTitle = ({
  className,
  children,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) => {
  return (
    <h2 className={cn("text-lg font-semibold", className)} {...props}>
      {children}
    </h2>
  );
};

export const AutoTableCreateButton = () => {
  const { setCurrentAction } = useAutoTable();

  return (
    <Button
      type="button"
      size="icon"
      onClick={() => setCurrentAction("CREATE")}
    >
      <CirclePlus />
    </Button>
  );
};

export const AutoTableCloseDetailsButton = () => {
  const { currentAction, setCurrentAction } = useAutoTable();

  return (
    <Button
      type="button"
      size="icon"
      onClick={() => setCurrentAction(null)}
      variant="outline"
      className={
        currentAction === "DETAILS" ? "bg-accent text-accent-foreground" : ""
      }
    >
      <CopyX />
    </Button>
  );
};

export const AutoTableBody = <TDetailsData extends Record<string, unknown>>({
  onDetails,
  detailsContent,
}: Pick<
  ComponentProps<typeof AutoTableDetailsRow<TDetailsData>>,
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
              rowId={row.original.id as string}
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

const AutoTableDetailsRow = <TDetailsData extends Record<string, unknown>>({
  rowId,
  columnsLength,
  onDetails,
  detailsContent,
}: {
  rowId: string;
  columnsLength: number;
  onDetails: (args: { id: string }) => Promise<TDetailsData>;
  detailsContent: (data: TDetailsData) => React.ReactNode;
}) => {
  const { selectedRow, currentAction } = useAutoTable();
  const [detailsData, setDetailsData] = React.useState<TDetailsData | null>(
    null,
  );

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

const defaultPageSizeOptions = [10, 20, 30, 40, 50];

export const AutoTablePagination = ({
  className,
  totalPagesCount,
  pageSizeOptions,
  ...props
}: {
  pageSizeOptions?: number[];
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  ComponentProps<typeof Pagination>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setPage] = usePage();
  const [rowsPerPage, setRowsPerPage] = useRowsPerPage();

  return (
    <div className={cn("flex justify-end", className)} {...props}>
      <div className="flex items-center gap-6">
        <RowsPerPageSelect
          pageSizeOptions={pageSizeOptions ?? defaultPageSizeOptions}
          value={rowsPerPage.toString()}
          onChange={async (v) => {
            await setPage(1);
            await setRowsPerPage(parseInt(v, 10));
          }}
        />
        <Pagination totalPagesCount={totalPagesCount} />
      </div>
    </div>
  );
};

export const mapDashedFieldName = (fieldName: string): string =>
  fieldName.split("_").join(" ");
