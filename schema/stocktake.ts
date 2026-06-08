import { z } from "zod";

export const stockTakeDetailSchema = z.object({
  id: z.string().optional(),

  materialId: z
    .string()
    .min(1, "Vật liệu không được để trống"),

  materialName: z.string().optional(),
  materialStatus: z.string().optional(),

  unit: z.string().optional(),

  actualQty: z.coerce
    .number()
    .positive("Số lượng nhập phải lớn hơn 0"),

  systemQty: z.number().optional(),

  difference: z.number().optional(),
});

export const stockTakeSchema = z.object({
  id: z.string().optional(),

  warehouseId: z
    .string()
    .min(1, "Kho tiếp nhận không được để trống"),

  note: z.string().optional(),

  details: z
    .array(stockTakeDetailSchema)
    .min(1, "Danh sách vật liệu kiểm kê không được để trống"),
});

export type StockTakeFormValues = z.infer<
  typeof stockTakeSchema
>;

export type StockTakeDetailFormValues = z.infer<
  typeof stockTakeDetailSchema
>;