/* eslint-disable @typescript-eslint/no-explicit-any */

import { ControllerFieldState, ControllerRenderProps, FieldValues, UseFormReturn } from "react-hook-form";

export type FieldType =
  | "text"
  | "password"
  | "textarea"
  | "number"
  | "price"
  | "image"
  | "image-square"
  | "select"
  | "group-select-command"
  | "select-command"
  | "radio"
  | "checkbox"

export type Selection = "single" | "multiple"

export type RendererProps<T extends FieldValues = FieldValues> = (props: {
  field: ControllerRenderProps<T>;
  fieldState: ControllerFieldState;
  form: UseFormReturn<T>;
  config: FieldConfig<T>;
  disabledAll?: boolean;
}) => React.ReactNode;

export type FieldConfig<T extends FieldValues = FieldValues> = {
  name: keyof T;
  label?: string;
  type: FieldType;
  placeholder?: string;
  readonly?: boolean;
  className?: string;
  options?: any
  selection?: Selection
  required?: boolean
  render?: RendererProps<T>;
};