import {
  type EnumLike,
  ZodBoolean,
  ZodDate,
  ZodDefault,
  ZodEffects,
  ZodEnum,
  ZodNativeEnum,
  ZodNullable,
  ZodNumber,
  ZodObject,
  ZodOptional,
  ZodString,
  type ZodTypeAny,
} from "zod";
import { type SchemaType } from "./zod";

export type FormInputFieldType =
  | "string"
  | "number"
  | "date"
  | "boolean"
  | "select";

export type FormInputField =
  | {
      type: Exclude<FormInputFieldType, "select">;
      isRequired: boolean;
    }
  | {
      type: "select";
      isRequired: boolean;
      options: { label: string; value: string | number }[];
    };

// Recursive function to unwrap the underlying type
const getBaseField = (field: ZodTypeAny): ZodTypeAny => {
  if (
    field instanceof ZodOptional ||
    field instanceof ZodNullable ||
    field instanceof ZodDefault
  ) {
    return getBaseField(field._def.innerType as ZodTypeAny);
  } else if (field instanceof ZodEffects) {
    return getBaseField(field._def.schema as ZodTypeAny);
  }

  return field;
};

export const getFieldType = (field: ZodTypeAny): FormInputFieldType => {
  const baseField = getBaseField(field); // Get the actual base type

  if (baseField instanceof ZodNumber) return "number";
  if (baseField instanceof ZodDate) return "date";
  if (baseField instanceof ZodBoolean) return "boolean";
  if (baseField instanceof ZodString) return "string";
  if (baseField instanceof ZodNativeEnum || baseField instanceof ZodEnum)
    return "select";

  return "string";
};

export const mapSchemaToFormFields = (
  schema: SchemaType,
): Record<string, FormInputField> => {
  const result: Record<string, FormInputField> = {};

  // Extract the base schema if wrapped in ZodEffects.
  // ZodEffects ocurs when using .refine() or .transform() methods on the field. ;P
  const baseSchema = schema instanceof ZodEffects ? schema._def.schema : schema;

  if (baseSchema instanceof ZodObject) {
    const shape = baseSchema.shape;

    for (const key in shape) {
      const field = shape[key]!;
      const type = getFieldType(field);

      const isRequired = !(
        field instanceof ZodOptional || field instanceof ZodNullable
      );

      if (type === "select") {
        const field = shape[key]!;

        const typeName: "ZodEnum" | "ZodNativeEnum" = (
          field as ZodEnum<string> | ZodNativeEnum<EnumLike>
        )._def.typeName;

        let options: { label: string; value: string | number }[] = [];

        if (typeName === "ZodEnum") {
          options = Object.entries(field._def.values).map(([label, value]) => ({
            label: label.toLowerCase(),
            value,
          }));
        } else {
          const zodNativeEnumField = field as ZodNativeEnum<EnumLike>;

          options = Object.entries(zodNativeEnumField._def.values).map(
            ([label, value]) => ({
              label: label.toLowerCase(),
              value,
            }),
          );
        }

        result[key] = {
          type,
          isRequired,
          options,
        };
      } else {
        result[key] = { type, isRequired };
      }
    }
  } else {
    throw new Error("Unsupported schema type");
  }

  return result;
};

// export const getSchemaDefaultValues = <TSchema extends SchemaType>(
//   schema: SchemaType,
// ): Record<> => {
//   const formFields = Object.entries(mapSchemaToFormFields(schema));

//   const result: Record<string, any> = {};

//   formFields.forEach(([fieldName, fieldConfig]) => {
//     if (fieldConfig.type !== "select") {
//       result[fieldName] = "";
//     }
//   });
// };
