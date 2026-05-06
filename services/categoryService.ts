import { axiosInstance, cleanObject, buildApiParams } from "@/lib/index";
import { CategoryFilterRequest, PageRequest } from "@/types/index";
import { CategoryFormValues } from "@/schema/index";

export const getCategoriesApi = async (filter: CategoryFilterRequest & PageRequest) => {
  const params = buildApiParams(cleanObject(filter))

  const response = await axiosInstance.get('/categories', { params });
  return response.data;
};

export const getDropdownParentApi = async () => {
  const response = await axiosInstance.get('/categories/dropdown-parent');
  return response.data;
};

export const getDropdownCategoryApi = async () => {
  const response = await axiosInstance.get('/categories/dropdown');
  return response.data;
};

export const getCategoryTreeApi = async () => {
  const response = await axiosInstance.get('/categories/tree');
  return response.data;
};

export const createCategoryApi = async (request: CategoryFormValues) => {
  const response = await axiosInstance.post('/categories', request);
  return response.data;
};

export const updateCategoryApi = async (id: number | string, request: CategoryFormValues) => {
  const response = await axiosInstance.put(`/categories/${id}`, request);
  return response.data;
};

export const restoreCategoryApi = async (id: number | string) => {
  const response = await axiosInstance.put(`/categories/${id}/restore`);
  return response.data;
};

export const deleteCategoryApi = async (id: number | string) => {
  const response = await axiosInstance.delete(`/categories/${id}`);
  return response.data;
};

export const updateCategoryStatusApi = async (id: number | string, status: string) => {
  const response = await axiosInstance.patch(`/categories/${id}/status`, { status });
  return response.data;
};

export const getCategoryUploadSignatureApi = async () => {
  const response = await axiosInstance.get(`/categories/upload-signature`);
  return response.data;
};