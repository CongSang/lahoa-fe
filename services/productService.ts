import { axiosInstance, cleanObject, buildApiParams, transformProperty } from "@/lib/index";
import { PageRequest, ProductFilterRequest } from "@/types/index";
import { ProductFormValues } from "@/schema/index";

export const getProductsApi = async (filter: ProductFilterRequest & PageRequest) => {
  const cleanParams = cleanObject({
    ...filter,
    propertyValueIds: transformProperty(filter.propertyValueIds)
  })
  const params = buildApiParams(cleanParams)

  const response = await axiosInstance.get('/products', { params });
  return response.data;
};

export const createProductApi = async (request: ProductFormValues) => {
  const response = await axiosInstance.post('/products', request);
  return response.data;
};

export const updateProductApi = async (id: number | string, request: ProductFormValues) => {
  const response = await axiosInstance.put(`/products/${id}`, request);
  return response.data;
};

export const restoreProductApi = async (id: number | string) => {
  const response = await axiosInstance.put(`/products/${id}/restore`);
  return response.data;
};

export const deleteProductApi = async (id: number | string) => {
  const response = await axiosInstance.delete(`/products/${id}`);
  return response.data;
};

export const updateProductStatusApi = async (id: number | string, status: string) => {
  const response = await axiosInstance.patch(`/products/${id}/status`, { status });
  return response.data;
};

export const getProductUploadSignatureApi = async () => {
  const response = await axiosInstance.get(`/products/upload-signature`);
  return response.data;
};