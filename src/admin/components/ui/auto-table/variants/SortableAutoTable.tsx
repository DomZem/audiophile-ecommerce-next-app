import { type ZodObjectSchema } from "~/admin/utils/zod";
import {
  DataTable,
  DataTableHeader,
  DataTableSelectColumns,
} from "../../DataTable";
import {
  AutoTableActionsColumn,
  AutoTableBody,
  AutoTableCloseDetailsButton,
  AutoTableCreateButton,
  AutoTableDeleteDialog,
  AutoTableDialogForms,
  AutoTableHeader,
  AutoTableHeaderTitle,
  AutoTableProvider,
  AutoTableSheetForms,
  AutoTableSortableTable,
  mapDashedFieldName,
} from "../AutoTable";
import { type ComponentProps } from "react";

export const SortableAutoTable = <
  TSchema extends ZodObjectSchema,
  TFormSchema extends ZodObjectSchema,
  TDetailsData extends Record<string, unknown>,
>({
  title,
  deleteDialog,
  schema,
  rowIdentifier,
  refetchData,
  data,
  omitColumns,
  extraColumns,
  formSchema,
  onCreate,
  onUpdate,
  onDetails,
  detailsContent,
  variant = "dialog",
}: {
  title: string;
  deleteDialog: ComponentProps<typeof AutoTableDeleteDialog>;
  variant?: "dialog" | "sheet";
} & Omit<ComponentProps<typeof AutoTableProvider<TSchema>>, "children"> &
  Omit<
    ComponentProps<typeof AutoTableSortableTable<TSchema>>,
    "children" | "schema"
  > &
  ComponentProps<typeof AutoTableDialogForms<TFormSchema>> &
  ComponentProps<typeof AutoTableBody<TDetailsData>>) => {
  return (
    <AutoTableProvider
      schema={schema}
      rowIdentifier={rowIdentifier}
      refetchData={refetchData}
    >
      <AutoTableSortableTable
        schema={schema}
        data={data}
        omitColumns={omitColumns}
        extraColumns={[
          ...(extraColumns ?? []),
          {
            header: "actions",
            cell: ({ row }) => <AutoTableActionsColumn row={row.original} />,
          },
        ]}
      >
        <div className="space-y-4">
          <AutoTableHeader>
            <AutoTableHeaderTitle>{title}</AutoTableHeaderTitle>
            <div className="inline-flex items-center gap-3">
              <DataTableSelectColumns mapColumnName={mapDashedFieldName} />
              <AutoTableCloseDetailsButton />
              <AutoTableCreateButton />
            </div>
          </AutoTableHeader>

          <DataTable>
            <DataTableHeader />
            <AutoTableBody
              onDetails={onDetails}
              detailsContent={detailsContent}
            />
          </DataTable>
        </div>
      </AutoTableSortableTable>

      <AutoTableDeleteDialog {...deleteDialog} />
      {variant === "dialog" ? (
        <AutoTableDialogForms
          formSchema={formSchema}
          onCreate={onCreate}
          onUpdate={onUpdate}
        />
      ) : (
        <AutoTableSheetForms
          formSchema={formSchema}
          onCreate={onCreate}
          onUpdate={onUpdate}
        />
      )}
    </AutoTableProvider>
  );
};
