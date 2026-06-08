import { z } from "zod";

export const materialImportDetailSchema = z.object({
  id: z.string().optional(),

  materialId: z
    .string()
    .min(1, "Vật liệu không được để trống"),

  materialName: z.string().optional(),
  materialStatus: z.string().optional(),

  quantity: z.coerce
    .number()
    .positive("Số lượng nhập phải lớn hơn 0"),

  subtotal: z.string().optional(),

  unitCost: z.string()
    .min(1, "Giá tiền không được để trống")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    }, {
      message: "Giá tiền phải lớn hơn 0",
    }),
});

export const materialImportSchema = z.object({
  id: z.string().optional(),

  warehouseId: z
    .string()
    .min(1, "Kho tiếp nhận không được để trống"),

  supplier: z
    .string()
    .trim()
    .min(1, "Nhà cung cấp không được để trống"),

  note: z.string().optional(),

  details: z
    .array(materialImportDetailSchema)
    .min(1, "Danh sách vật liệu nhập kho không được để trống"),
});

export type MaterialImportFormValues = z.infer<
  typeof materialImportSchema
>;

export type MaterialImportDetailFormValues = z.infer<
  typeof materialImportDetailSchema
>;