import React, { useState } from "react";
import {
  type StringOrNumberKeyOnly,
  type ZodObjectInfer,
  type ZodObjectSchema,
} from "~/admin/utils/zod";
import { useToast } from "~/hooks/use-toast";

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
