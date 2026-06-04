import { z } from "zod";

const statusEnum = z.enum(["ACTIVE", "INACTIVE", "DELETED"]);

export const materialCategorySchema = z.object({
  id: z.string().optional(),

  name: z
    .string()
    .min(1, "Tên danh mục không được để trống")
    .max(255, "Tên danh mục tối đa 255 ký tự"),

  status: statusEnum.default("ACTIVE"),

  description: z
    .string()
    .max(500, "Mô tả tối đa 500 ký tự")
    .optional(),
});

export type MaterialCategoryFormValues = z.infer<typeof materialCategorySchema>;