import { axiosInstance, cleanObject } from "@/lib/index";
import { CategoryFilterRequest, CategoryRequest, PageRequest } from "@/types/index";

export const getCategoriesApi = async (filter: CategoryFilterRequest & PageRequest) => {
  const params = cleanObject(filter)

  const response = await axiosInstance.get('/categories', { params });
  return response.data;
};

export const getDropdownParentApi = async () => {
  const response = await axiosInstance.get('/categories/dropdown');
  return response.data;
};

export const getCategoryTreeApi = async () => {
  const response = await axiosInstance.get('/categories/tree');
  return response.data;
};

export const createCategoryApi = async (request: CategoryRequest) => {
  const response = await axiosInstance.post('/categories', request);
  return response.data;
};

export const updateCategoryApi = async (id: number, request: CategoryRequest) => {
  const response = await axiosInstance.put(`/categories/${id}`, request);
  return response.data;
};

export const deleteCategoryApi = async (id: number) => {
  const response = await axiosInstance.delete(`/categories/${id}`);
  return response.data;
};

export const updateCategoryStatusApi = async (id: number, status: string) => {
  const response = await axiosInstance.patch(`/categories/${id}/status`, { status });
  return response.data;
};