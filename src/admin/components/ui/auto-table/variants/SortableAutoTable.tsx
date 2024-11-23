import { type ComponentProps } from "react";
import {
  DataTable,
  DataTableHeader,
  DataTableSelectColumns,
} from "../../DataTable";
import { AutoTableProvider } from "../AutoTableContext";
import {
  AutoTableActionsColumn,
  AutoTableBody,
  AutoTableSortableTable,
} from "../AutoTable";
import { mapDashedFieldName } from "~/admin/utils/map";
import {
  AutoTableCloseDetailsButton,
  AutoTableCreateButton,
  AutoTableHeader,
  AutoTableHeaderTitle,
  AutoTableRefreshButton,
} from "../AutoTableHeader";
import { AutoTableDeleteDialog } from "../AutoTableDeleteDialog";
import {
  AutoTableDialogForms,
  type AutoTableForms,
  AutoTableSheetForms,
} from "../AutoTableForm";
import {
  type StringOrNumberKeyOnly,
  type ZodObjectInfer,
  type ZodObjectSchema,
} from "~/admin/utils/zod";

export const SortableAutoTable = <
  TSchema extends ZodObjectSchema,
  TFormSchema extends ZodObjectSchema,
  TRowIdentifierKey extends Extract<
    StringOrNumberKeyOnly<ZodObjectInfer<TSchema>>,
    string
  >,
  TRowIdentifierKeyType extends ZodObjectInfer<TSchema>[TRowIdentifierKey],
  TDetailsData extends Record<string, unknown>,
>({
  schema,
  data,
  extraColumns,
  omitColumns,
  fieldsConfig,
  createFormConfig,
  updateFormConfig,
  detailsContent,
  onDetails,
  title,
  variant = "dialog",
  ...props
}: Omit<
  ComponentProps<
    typeof AutoTableProvider<
      TSchema,
      TFormSchema,
      TRowIdentifierKey,
      TRowIdentifierKeyType
    >
  >,
  "children"
> &
  Omit<ComponentProps<typeof AutoTableSortableTable<TSchema>>, "children"> &
  AutoTableForms<TFormSchema> &
  ComponentProps<typeof AutoTableBody<TDetailsData, TRowIdentifierKeyType>> & {
    title: string;
    variant?: "sheet" | "dialog";
  }) => {
  return (
    <AutoTableProvider schema={schema} {...props}>
      <AutoTableSortableTable
        schema={schema}
        data={data}
        extraColumns={[
          ...(extraColumns ?? []),
          {
            header: "actions",
            cell: ({ row }) => <AutoTableActionsColumn row={row.original} />,
          },
        ]}
        omitColumns={omitColumns}
      >
        <AutoTableHeader>
          <AutoTableHeaderTitle>{title}</AutoTableHeaderTitle>
          <div className="inline-flex items-center gap-3">
            <AutoTableRefreshButton />
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
      </AutoTableSortableTable>

      <AutoTableDeleteDialog />

      {variant === "sheet" ? (
        <AutoTableSheetForms
          fieldsConfig={fieldsConfig}
          createFormConfig={createFormConfig}
          updateFormConfig={updateFormConfig}
        />
      ) : (
        <AutoTableDialogForms
          fieldsConfig={fieldsConfig}
          createFormConfig={createFormConfig}
          updateFormConfig={updateFormConfig}
        />
      )}
    </AutoTableProvider>
  );
};
