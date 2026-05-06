import { Option } from "@/types/index";
import z from "zod";

export type FieldType =
  | "text"
  | "password"
  | "textarea"
  | "number"
  | "image"
  | "select"
  | "group-select-command"
  | "multi-select-command"
  | "select-command"

export type Selection = "single" | "multiple"

export type FieldConfig<T> = {
  name: keyof T;
  label?: string;
  type: FieldType;
  placeholder?: string;
  disabled?: boolean;
  className?: string; 
  options?: Option[]
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