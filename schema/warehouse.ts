import { z } from "zod";

const statusEnum = z.enum(["ACTIVE", "INACTIVE", "DELETED"]);

export const warehouseSchema = z.object({
  id: z.string().optional(),

  code: z
    .string()
    .min(1, "Mã kho không được để trống")
    .max(255, "Mã kho tối đa 255 ký tự"),

  name: z
    .string()
    .min(1, "Tên kho không được để trống")
    .max(255, "Tên kho tối đa 255 ký tự"),

  status: statusEnum.default("ACTIVE"),

  address: z
    .string()
    .min(1, "Địa chỉ kho không được để trống")
    .max(500, "Địa chỉ kho tối đa 500 ký tự"),
});

export type WarehouseFormValues = z.infer<typeof warehouseSchema>;