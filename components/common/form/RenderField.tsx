"use client";

import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldLabel,
  ImageUpload,
  Input,
  Textarea,
  GroupSelect,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  InputNumber
} from "@/components/index";
import { SelectType } from "@/types/index";
import { FieldConfig } from "@/schema/index";
import { parseValueSelect } from "@/lib/index";

export interface RenderFieldProps<TFieldValues extends FieldValues = FieldValues> {
  form: UseFormReturn<TFieldValues>;
  fieldConfig: FieldConfig<TFieldValues>
  disabledAll?: boolean
}

export function RenderField<TFieldValues extends FieldValues>({ form, fieldConfig, disabledAll }: RenderFieldProps<TFieldValues>) {
  const { control } = form;
  const { name, label, type, placeholder, disabled, options } = fieldConfig;

  return (
    <Controller
      control={control}
      name={name as Path<TFieldValues>}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {(() => {
            switch (type) {
              case "text":
                return (
                  <>
                    <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
                    <Input
                      type="text"
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      disabled={disabled || disabledAll}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </>
                );

              case "textarea":
                return (
                  <>
                    <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
                    <Textarea
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder={placeholder}
                      rows={4}
                      disabled={disabled || disabledAll}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </>
                );

              case "number":
                return (
                  <>
                    <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
                    <InputNumber
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                      format="decimal"
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      placeholder="0"
                      disabled={disabled || disabledAll}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </>
                );

              case "image":
                return (
                  <>
                    <ImageUpload
                      disabled={disabled || disabledAll}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {fieldState.invalid && (
                      <FieldError className="text-center" errors={[fieldState.error]} />
                    )}
                  </>
                );

              case "select":
                return (
                  <>
                    <FieldLabel>{fieldConfig.label}</FieldLabel>
                    <Select
                      {...field}
                      value={String(field.value) ?? undefined}
                      onValueChange={(val) => field.onChange(parseValueSelect(val))}
                      disabled={disabled || disabledAll}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={fieldConfig.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {options?.length && options?.map((p: SelectType) => (
                            <SelectItem key={p.value} value={p.value.toString()}>
                              {p.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </>
                );

              case "group-select":
                return (
                  <>
                    <FieldLabel>{fieldConfig.label}</FieldLabel>
                    <GroupSelect
                      placeholder={fieldConfig.placeholder}
                      data={[]}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {fieldState.invalid && (
                      <FieldError className="text-center" errors={[fieldState.error]} />
                    )}
                  </>
                );

              default:
                return null;
            }
          })()}
        </Field>
      )}
    />
  );
}