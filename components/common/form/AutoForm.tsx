"use client";

import { RenderField } from "@/components/index";
import { cn } from "@/lib/index";
import { FieldConfig } from "@/schema/index";
import { FieldValues, UseFormReturn } from "react-hook-form";

export interface AutoFormProps<TFieldValues extends FieldValues = FieldValues> {
  form: UseFormReturn<TFieldValues>;
  config: FieldConfig<TFieldValues>[]
  disabledAll?: boolean
}

export function AutoForm<TFieldValues extends FieldValues>({ form, config, disabledAll }: AutoFormProps<TFieldValues>) {
  return (
    <div className="grid grid-cols-12 gap-2">
      {config.map((field: FieldConfig<TFieldValues>, index) => (
        <div key={index} className={cn("col-span-12", field.className)}>
          <RenderField
            fieldConfig={field}
            form={form}
            disabledAll={disabledAll}
          />
        </div>
      ))}
    </div>
  );
}