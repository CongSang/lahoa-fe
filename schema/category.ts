import { z } from "zod";

export const categorySchema = z.object({
  id: z.number().optional(),
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

  parentId: z.number().nullable().optional(),
  status: z.string().optional(),
  description: z.string().optional(),
  path: z.string().optional(),

  displayOrder: z
    .string()
    .optional()
    .transform((val) =>
      val ? Number(val.replace(/[.,]/g, "")) : undefined
    ),
});

export type CategoryFormInput = z.input<typeof categorySchema>;
export type CategoryFormOutput = z.output<typeof categorySchema>;