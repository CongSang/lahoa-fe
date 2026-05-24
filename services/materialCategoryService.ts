import { axiosInstance, cleanObject, buildApiParams } from "@/lib/index";
import { PageRequest, MaterialCategoryFilterRequest } from "@/types/index";
import { MaterialCategoryFormValues } from "@/schema/index";

export const getMaterialCategoriesApi = async (filter: MaterialCategoryFilterRequest & PageRequest) => {
  const params = buildApiParams(cleanObject(filter))

  const response = await axiosInstance.get('/admin/material-categories', { params });
  return response.data;
};

export const getMaterialCategoryDropdownApi = async () => {
  const response = await axiosInstance.get('/admin/material-categories/dropdown');
  return response.data;
};

export const createMaterialCategoryApi = async (request: MaterialCategoryFormValues) => {
  const response = await axiosInstance.post('/admin/material-categories', request);
  return response.data;
};

export const updateMaterialCategoryApi = async (id: number | string, request: MaterialCategoryFormValues) => {
  const response = await axiosInstance.put(`/admin/material-categories/${id}`, request);
  return response.data;
};

export const restoreMaterialCategoryApi = async (id: number | string) => {
  const response = await axiosInstance.put(`/admin/material-categories/${id}/restore`);
  return response.data;
};

export const deleteMaterialCategoryApi = async (id: number | string) => {
  const response = await axiosInstance.delete(`/admin/material-categories/${id}`);
  return response.data;
};

export const updateMaterialCategoryStatusApi = async (id: number | string, status: string) => {
  const response = await axiosInstance.patch(`/admin/material-categories/${id}/status`, { status });
  return response.data;
};