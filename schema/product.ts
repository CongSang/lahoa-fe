import { z } from "zod";
import { statusEnum } from "@/schema/index";

export const productPropertyValueSchema = z.object({
  propertyValueId: z.string().min(1, "Property value is required"),
});

export const variantSchema = z.object({
  id: z.string().optional(),
  sku: z.string().min(1, "SKU is required"),
  price: z.string()
    .min(1, "Vui lòng nhập giá tiền")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    }, {
      message: "Giá tiền phải lớn hơn 0",
    }),
  stock: z.number().int().min(0).optional(),
  isDefault: z.boolean().optional(),

  propertyValueIds: z
    .array(z.string())
    .min(1, "Variant must have at least 1 property"),
});

export const productSchema = z.object({
  id: z.string().optional(),

  name: z.string().min(1, "Name is required"),

  slug: z.string().optional(),

  basePrice: z.string()
    .min(1, "Vui lòng nhập giá tiền")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    }, {
      message: "Giá tiền phải lớn hơn 0",
    }),

  description: z.string().optional(),

  mainImage: z
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

  imagePublicId: z.string().optional(),

  status: statusEnum.default("ACTIVE"),

  displayOrder: z
    .string()
    .optional()
    .transform((val) =>
      val ? Number(val.replace(/[.,]/g, "")) : undefined
    ),

  seoTitle: z.string().max(255).optional(),

  seoDescription: z.string().max(500).optional(),

  seoKeywords: z.string().optional(),

  propertyValues: z
    .array(productPropertyValueSchema)
    .optional(),

  variants: z
    .array(variantSchema)
    .optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;