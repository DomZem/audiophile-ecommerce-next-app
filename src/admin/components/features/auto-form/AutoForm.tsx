"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ZodEffects,
  type ZodObject,
  type ZodRawShape,
  type TypeOf,
  type z,
} from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/Form";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { cn } from "~/lib/utils";
import { type Path, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/Select";
import { Textarea } from "../../ui/Textarea";
import { mapSchemaToFormFields } from "~/admin/utils/auto-form";
import { type ChangeEvent } from "react";

type InputType =
  | "text"
  | "number"
  | "checkbox"
  | "date"
  | "textarea"
  | "select"
  | "password";

type BaseFieldConfig = {
  type?: Exclude<InputType, "select">;
  label?: string;
  description?: string;
  placeholder?: string;
};

type SelectFieldConfig = {
  type: "select";
  label?: string;
  description?: string;
  placeholder?: string;
  options: { label: string; value: string | number }[];
};

type FieldConfig = BaseFieldConfig | SelectFieldConfig;

interface AutoFormProps<
  TSchema extends ZodObject<ZodRawShape> | ZodEffects<ZodObject<ZodRawShape>>,
> {
  schema: TSchema;
  onSubmit: (data: z.infer<TSchema>) => void;
  className?: string;
  mapLabel?: (fieldName: string) => string;
  fieldsConfig?: Partial<Record<keyof z.infer<TSchema>, FieldConfig>>;
}

export const AutoForm = <
  TSchema extends ZodObject<ZodRawShape> | ZodEffects<ZodObject<ZodRawShape>>,
>({
  schema,
  onSubmit,
  className,
  mapLabel,
  fieldsConfig,
}: AutoFormProps<TSchema>) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-8", className)}
      >
        {Object.entries(mapSchemaToFormFields(schema)).map(
          ([fieldName, formField]) => {
            const fieldConfig = fieldsConfig?.[fieldName];

            return (
              <FormField
                control={form.control}
                name={fieldName as Path<TypeOf<TSchema>>}
                key={fieldName}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>
                        {fieldConfig?.label ??
                          `${mapLabel?.(fieldName)} ${formField.isRequired ? "*" : ""}` ??
                          fieldName}
                      </FormLabel>

                      {fieldConfig?.type === "select" ? (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  fieldConfig.placeholder ??
                                  `Select the ${field.name}`
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {fieldConfig.options.map((option) => (
                              <SelectItem
                                value={option.value.toString()}
                                key={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : fieldConfig?.type === "textarea" ? (
                        <FormControl>
                          <Textarea className="resize-none" {...field} />
                        </FormControl>
                      ) : (
                        <FormControl>
                          <Input
                            type={fieldConfig?.type ?? formField.type}
                            placeholder={fieldConfig?.placeholder}
                            {...field}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              const value =
                                fieldConfig?.type === "number" ||
                                formField.type === "number"
                                  ? Number(e.target.value)
                                  : e.target.value;
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                      )}

                      <FormMessage />

                      {fieldConfig?.description && (
                        <FormDescription>
                          {fieldConfig.description}
                        </FormDescription>
                      )}
                    </FormItem>
                  );
                }}
              />
            );
          },
        )}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
