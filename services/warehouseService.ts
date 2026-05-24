import { axiosInstance, cleanObject, buildApiParams } from "@/lib/index";
import { PageRequest, WarehouseFilterRequest } from "@/types/index";
import { WarehouseFormValues } from "@/schema/index";

export const getWarehousesApi = async (filter: WarehouseFilterRequest & PageRequest) => {
  const params = buildApiParams(cleanObject(filter))

  const response = await axiosInstance.get('/admin/warehouses', { params });
  return response.data;
};

export const createWarehouseApi = async (request: WarehouseFormValues) => {
  const response = await axiosInstance.post('/admin/warehouses', request);
  return response.data;
};

export const updateWarehouseApi = async (id: number | string, request: WarehouseFormValues) => {
  const response = await axiosInstance.put(`/admin/warehouses/${id}`, request);
  return response.data;
};

export const restoreWarehouseApi = async (id: number | string) => {
  const response = await axiosInstance.put(`/admin/warehouses/${id}/restore`);
  return response.data;
};

export const deleteWarehouseApi = async (id: number | string) => {
  const response = await axiosInstance.delete(`/admin/warehouses/${id}`);
  return response.data;
};

export const updateWarehouseStatusApi = async (id: number | string, status: string) => {
  const response = await axiosInstance.patch(`/admin/warehouses/${id}/status`, { status });
  return response.data;
};