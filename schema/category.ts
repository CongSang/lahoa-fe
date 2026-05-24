import { z } from "zod";

const statusEnum = z.enum(["ACTIVE", "INACTIVE", "DELETED"]);

export const categorySchema = z.object({
  id: z.string().optional(),

  name: z
    .string()
    .min(1, "Tên danh mục không được để trống")
    .max(255, "Tên danh mục tối đa 255 ký tự"),

  imageUrl: z
    .union([
      z.instanceof(File),
      z.string(),
      z.null()
    ])
    .refine((val) => !!val, "Ảnh danh mục không được để trống")
    .refine((file) => {
      if (file instanceof File) {
        return file.size < 10_000_000; // <10MB
      }
      return true;
    }, "File quá lớn"),

  imagePublicId: z.string().nullable().optional(),

  parentId: z.number().nullable().optional(),

  status: statusEnum.default("ACTIVE"),

  description: z
    .string()
    .max(500, "Mô tả tối đa 500 ký tự")
    .optional(),

  path: z.string().nullable().optional(),

  displayOrder: z.preprocess(
    (val) => val === "" ? undefined : val,
    z.coerce.number().optional()
  ),
  
  seoTitle: z
    .string()
    .max(60, "Tiêu đề SEO tối đa 60 ký tự")
    .optional(),

  seoDescription: z
    .string()
    .max(160, "Mô tả SEO tối đa 160 ký tự")
    .optional(),

  seoKeywords: z
    .string()
    .max(255, "Từ khóa SEO tối đa 255 ký tự")
    .optional(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;