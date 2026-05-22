import { axiosInstance, cleanObject, buildApiParams } from "@/lib/index";
import { CategoryFilterRequest, PageRequest } from "@/types/index";
import { CategoryFormValues } from "@/schema/index";

export const getCategoriesApi = async (filter: CategoryFilterRequest & PageRequest) => {
  const params = buildApiParams(cleanObject(filter))

  const response = await axiosInstance.get('/admin/categories', { params });
  return response.data;
};

export const getDropdownParentApi = async () => {
  const response = await axiosInstance.get('/admin/categories/dropdown-parent');
  return response.data;
};

export const getDropdownCategoryApi = async () => {
  const response = await axiosInstance.get('/admin/categories/dropdown');
  return response.data;
};

export const createCategoryApi = async (request: CategoryFormValues) => {
  const response = await axiosInstance.post('/admin/categories', request);
  return response.data;
};

export const updateCategoryApi = async (id: number | string, request: CategoryFormValues) => {
  const response = await axiosInstance.put(`/admin/categories/${id}`, request);
  return response.data;
};

export const restoreCategoryApi = async (id: number | string) => {
  const response = await axiosInstance.put(`/admin/categories/${id}/restore`);
  return response.data;
};

export const deleteCategoryApi = async (id: number | string) => {
  const response = await axiosInstance.delete(`/admin/categories/${id}`);
  return response.data;
};

export const updateCategoryStatusApi = async (id: number | string, status: string) => {
  const response = await axiosInstance.patch(`/admin/categories/${id}/status`, { status });
  return response.data;
};

export const getCategoryUploadSignatureApi = async () => {
  const response = await axiosInstance.get(`/admin/categories/upload-signature`);
  return response.data;
};

export const getCategoryTreeApi = async () => {
  const response = await axiosInstance.get('/categories/tree');
  return response.data;
};

export const getCategoryBySlugApi = async (slug: string) => {
  const response = await axiosInstance.get(`/categories/${slug}`);
  return response.data;
};