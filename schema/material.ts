import { z } from "zod";

const statusEnum = z.enum(["ACTIVE", "INACTIVE", "DELETED"]);

export const materialSchema = z.object({
  id: z.string().optional(),

  thumbnail: z
    .union([
      z.instanceof(File),
      z.string(),
      z.null()
    ])
    .refine((file) => {
      if (file instanceof File) {
        return file.size < 10_000_000; // <10MB
      }
      return true;
    }, "File quá lớn"),

  thumbnailPublicId: z.string().nullable().optional(),

  categoryId: z.string().nullable().optional(),

  code: z.string().nullable().optional(),

  name: z
    .string()
    .min(1, "Tên danh mục không được để trống")
    .max(255, "Tên danh mục tối đa 255 ký tự"),

  status: statusEnum.default("ACTIVE"),

  unit: z
    .string()
    .min(1, "Đơn vị không được để trống"),

  lowStockThreshold: z.coerce.number().nullable().optional(),
});

export type MaterialFormValues = z.infer<typeof materialSchema>;