import { ZodEffects, ZodObject, type z, type ZodRawShape } from "zod";

export type SchemaType =
  | ZodObject<ZodRawShape>
  | ZodEffects<ZodObject<ZodRawShape>>;

export type SchemaRowType<TSchema extends SchemaType> = z.infer<TSchema>;

export type StringOrNumberKeyOnly<T> = Extract<
  {
    [K in keyof T]: T[K] extends string | number ? K : never;
  }[keyof T],
  string | number
>;

export const extractFieldNamesFromSchema = (schema: SchemaType): string[] => {
  const baseSchema = schema instanceof ZodEffects ? schema._def.schema : schema;

  if (!(baseSchema instanceof ZodObject)) {
    throw new Error("Schema must be an instance of ZodObject");
  }

  const shape = baseSchema.shape;
  const fieldNames = Object.keys(shape);

  return fieldNames;
};
