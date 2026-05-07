import { z } from "zod";
import { statusEnum } from "./common";

export const categorySchema = z.object({
  id: z.string().optional(),

  name: z.string().min(1, "Tên danh mục không được để trống"),

  imageUrl: z
    .union([
      z.instanceof(File),
      z.string(),
      z.null()
    ])
    .refine((val) => !!val, "Ảnh danh mục không được để trống")
    .refine((file) => {
      if (file instanceof File) {
        return file.size < 5_000_000; // <5MB
      }
      return true;
    }, "File quá lớn"),

  imagePublicId: z.string().nullable().optional(),

  parentId: z.number().nullable().optional(),

  status: statusEnum.default("ACTIVE"),

  description: z.string().optional(),

  path: z.string().optional(),

  displayOrder: z
    .string()
    .optional()
    .transform((val) =>
      val ? Number(val.replace(/[.,]/g, "")) : undefined
    ),
  
  
  seoTitle: z.string().optional(),

  seoDescription: z.string().optional(),

  seoKeywords: z.string().optional(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;