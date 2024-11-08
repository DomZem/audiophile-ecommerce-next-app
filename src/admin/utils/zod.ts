import { type z, type ZodEffects, type ZodObject, type ZodRawShape } from "zod";

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
