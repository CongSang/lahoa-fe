import { InventoryReceiptFilterRequest, PageRequest } from "@/types/index";
import { axiosInstance, buildApiParams, cleanObject } from "@/lib/index";
import { MaterialImportFormValues } from "@/schema/index";


export const getMaterialReceiptsApi = async (filter: InventoryReceiptFilterRequest & PageRequest) => {
  const params = buildApiParams(cleanObject(filter))

  const response = await axiosInstance.get('/admin/material-receipts', { params });
  return response.data;
};

export const getMaterialReceiptByIdApi = async (id: string) => {
  const response = await axiosInstance.get(`/admin/material-receipts/${id}`);
  return response.data;
};

export const createMaterialReceiptApi = async (request: MaterialImportFormValues) => {
  const response = await axiosInstance.post('/admin/material-receipts', request);
  return response.data;
};