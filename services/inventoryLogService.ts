import { axiosInstance, cleanObject, buildApiParams } from "@/lib/index";
import { InventoryLogFilterRequest, PageRequest } from "@/types/index";

export const getInventoryLogsApi = async (filter: InventoryLogFilterRequest & PageRequest) => {
  const params = buildApiParams(cleanObject(filter))

  const response = await axiosInstance.get('/admin/inventory-movements', { params });
  return response.data;
};