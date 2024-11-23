"use client";

import { type ZodObjectSchema } from "~/admin/utils/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../Dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../Sheet";
import { useAutoTable } from "./AutoTableContext";
import { sanitizeSchemaObject } from "~/admin/utils/auto-form";
import { type DefaultValues } from "react-hook-form";
import { AutoForm, type AutoFormProps } from "../AutoForm";
import { type TypeOf } from "zod";
import { mapDashedFieldName } from "~/admin/utils/map";

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

export type AutoTableForms<TFormSchema extends ZodObjectSchema> = {
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
