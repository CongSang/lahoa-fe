import { z } from "zod";
import { StatusCommon } from "../types";

const statusProductEnum = z.enum(["ACTIVE", "INACTIVE", "DELETED"]);
const statusVariantEnum = z.enum(["ACTIVE", "INACTIVE", "DELETED", "OUT_OF_STOCK"]);

export const variantSchema = z.object({
  id: z.string().optional(),
  sku: z.string().nullable().optional(),
  price: z.string()
    .min(1, "Giá tiền không được để trống")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    }, {
      message: "Giá tiền phải lớn hơn 0",
    }),
  default: z.boolean().optional(),
  status: statusVariantEnum.default("ACTIVE"),

  propertyValueIds: z
    .array(z.string().min(1, "Phải chọn ít nhất 1 thuộc tính"))
    .min(1, "Biến thể phải có ít nhất 1 thuộc tính"),
});

export const productSchema = z.object({
  id: z.string().optional(),

  name: z
    .string()
    .min(1, "Tên sản phẩm không được để trống")
    .max(255, "Tên sản phẩm tối đa 255 ký tự"),

  slug: z.string().optional(),

  basePrice: z.string()
    .min(1, "Giá tiền không được để trống")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    }, {
      message: "Giá tiền phải lớn hơn 0",
    }),

  description: z
    .string()
    .max(500, "Mô tả tối đa 500 ký tự")
    .optional(),

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

  primaryCategoryId: z
    .string()
    .min(1, "Phải chọn danh mục chính"),

  categoryIds: z
    .array(z.string())
    .min(1, "Phải chọn ít nhất 1 danh mục"),

  status: statusProductEnum.default("ACTIVE"),

  displayOrder: z.coerce.number().nullable().optional(),

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

  propertyValueIds: z
    .array(z.string())
    .min(1, "Phải chọn ít nhất 1 thuộc tính"),

  variants: z
    .array(variantSchema)
    .min(1, "Phải có ít nhất 1 biến thể")
    .max(3, "Chỉ thêm được tối đa 3 biến thể"),
})
.superRefine((data, ctx) => {
  const defaultVariants = data.variants.filter(v => v.default);

  if (defaultVariants.length === 0) {
    ctx.addIssue({
      code: "custom",
      path: ["variants"],
      message: "Phải có 1 biến thể được đánh dấu mặc định",
    });
  }

  if (defaultVariants.length > 1) {
    ctx.addIssue({
      code: "custom",
      path: ["variants"],
      message: "Chỉ có thể đánh dấu mặc định 1 biến thể",
    });
  }

  if (!data.categoryIds.includes(data.primaryCategoryId)) {
    ctx.addIssue({
      code: "custom",
      path: ["primaryCategoryId"],
      message: "Danh mục chính phải nằm trong danh sách danh mục",
    });
  }
});

export type VariantFormValues = z.infer<typeof variantSchema>;
export type ProductFormValues = z.infer<typeof productSchema>;

export const productInitialValues: ProductFormValues = {
  name: "",
  slug: "",
  basePrice: "",
  description: "",
  imageUrl: null,
  imagePublicId: "",
  status: StatusCommon.ACTIVE,
  displayOrder: undefined,
  seoTitle: "",
  seoDescription: "",
  seoKeywords: "",
  primaryCategoryId: "",
  categoryIds: [],
  propertyValueIds: [],
  variants: [
    // {
    //   sku: "",
    //   price: "",
    //   status: StatusCommon.ACTIVE,
    //   default: true,
    //   propertyValueIds: [""],
    // },
  ],
};