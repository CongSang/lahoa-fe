"use client";

import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/index";
import { FieldConfig } from "@/schema/index";
import { createFieldRenderers } from "./FieldRenderers";

export interface RenderFieldProps<TFieldValues extends FieldValues = FieldValues> {
  form: UseFormReturn<TFieldValues>;
  fieldConfig: FieldConfig<TFieldValues>
  disabledAll?: boolean
}

export function RenderField<TFieldValues extends FieldValues>({ form, fieldConfig, disabledAll }: RenderFieldProps<TFieldValues>) {
  const { control } = form;
  const { name, label, type, required, render} = fieldConfig;

  const fieldRenderers = createFieldRenderers<TFieldValues>();

  const Renderer= render || fieldRenderers[fieldConfig.type];

  return (
    <Controller
      control={control}
      name={name as Path<TFieldValues>}
      render={({ field, fieldState }) => (
        <Field>
          {label && type !== "checkbox" && 
            <FieldLabel htmlFor={field.name}>
              {label}{required && <span className="text-red-500">*</span>}
            </FieldLabel>}

          <Renderer
            field={field}
            fieldState={fieldState}
            form={form}
            config={fieldConfig}
            disabledAll={disabledAll}
          />
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  );
}