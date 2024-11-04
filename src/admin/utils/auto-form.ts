import {
  ZodBoolean,
  ZodDate,
  ZodDefault,
  ZodEffects,
  ZodNullable,
  ZodNumber,
  ZodObject,
  ZodOptional,
  type ZodRawShape,
  ZodString,
  type ZodTypeAny,
} from "zod";

export type FormFieldType = "string" | "number" | "date" | "boolean";

export type FormField = {
  type: FormFieldType;
  isRequired: boolean;
};

// Recursive function to unwrap the underlying type
const getBaseField = (field: ZodTypeAny): ZodTypeAny => {
  if (
    field instanceof ZodOptional ||
    field instanceof ZodNullable ||
    field instanceof ZodDefault
  ) {
    return getBaseField(field._def.innerType as ZodTypeAny);
  }

  return field;
};

export const getFieldType = (field: ZodTypeAny): FormFieldType => {
  const baseField = getBaseField(field); // Get the actual base type

  if (baseField instanceof ZodNumber) return "number";
  if (baseField instanceof ZodDate) return "date";
  if (baseField instanceof ZodBoolean) return "boolean";
  if (baseField instanceof ZodString) return "string";

  return "string";
};

export const mapSchemaToFormFields = <
  TSchema extends ZodObject<ZodRawShape> | ZodEffects<ZodObject<ZodRawShape>>,
>(
  schema: TSchema,
): Record<string, FormField> => {
  const result: Record<string, FormField> = {};

  // Extract the base schema if wrapped in ZodEffects.
  // ZodEffects ocurs when using .refine() or .transform() methods. ;P
  const baseSchema = schema instanceof ZodEffects ? schema._def.schema : schema;

  if (baseSchema instanceof ZodObject) {
    const shape = baseSchema.shape;

    for (const key in shape) {
      const field = shape[key]!;

      const type = getFieldType(field);
      const isRequired = !(
        field instanceof ZodOptional || field instanceof ZodNullable
      );

      result[key] = { type, isRequired };
    }
  } else {
    throw new Error("Unsupported schema type");
  }

  return result;
};
