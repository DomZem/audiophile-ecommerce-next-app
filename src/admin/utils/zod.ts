import { ZodEffects, ZodObject, type z, type ZodRawShape } from "zod";

export type ZodObjectSchema =
  | ZodObject<ZodRawShape>
  | ZodEffects<ZodObject<ZodRawShape>>;

export type ZodObjectInfer<TSchema extends ZodObjectSchema> = z.infer<TSchema>;

export type StringOrNumberKeyOnly<T> = Extract<
  {
    [K in keyof T]: T[K] extends string | number ? K : never;
  }[keyof T],
  string | number
>;

export const extractFieldNamesFromSchema = (
  schema: ZodObjectSchema,
): string[] => {
  const baseSchema = schema instanceof ZodEffects ? schema._def.schema : schema;

  if (!(baseSchema instanceof ZodObject)) {
    throw new Error("Schema must be an instance of ZodObject");
  }

  const shape = baseSchema.shape;
  const fieldNames = Object.keys(shape);

  return fieldNames;
};
