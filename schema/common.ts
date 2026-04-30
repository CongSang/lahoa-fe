import { SelectType } from "@/types/index";
import z from "zod";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "image"
  | "select"
  | "group-select";

export type FieldConfig<T> = {
  name: keyof T;
  label: string;
  type: FieldType;
  placeholder?: string;
  disabled?: boolean;
  className?: string; 
  options?: SelectType[]
};

export type SectionConfig<T> = {
  title?: string;
  description?: string;
  fields: FieldConfig<T>[];
  columns?: number;
  className?: string;
};

export const statusEnum = z.enum(["ACTIVE", "INACTIVE", "DELETED"]);