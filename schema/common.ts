import { SelectItemOption } from "@/types/index";
import z from "zod";

export type FieldType =
  | "text"
  | "password"
  | "textarea"
  | "number"
  | "image"
  | "select"
  | "group-select"
  | "combobox"
  | "multi-combobox";

export type Selection = "single" | "multiple"

export type FieldConfig<T> = {
  name: keyof T;
  label?: string;
  type: FieldType;
  placeholder?: string;
  disabled?: boolean;
  className?: string; 
  options?: SelectItemOption[]
  selection?: Selection
};

export type SectionConfig<T> = {
  title?: string;
  description?: string;
  fields: FieldConfig<T>[];
  columns?: number;
  className?: string;
};

export const statusEnum = z.enum(["ACTIVE", "INACTIVE", "DELETED"]);