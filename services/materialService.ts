import { axiosInstance, cleanObject, buildApiParams } from "@/lib/index";
import { PageRequest } from "@/types/index";
import { MaterialFormValues } from "@/schema/index";
import { MaterialFilterRequest } from "@/types/index";

export const getMaterialsApi = async (filter: MaterialFilterRequest & PageRequest) => {
  const params = buildApiParams(cleanObject(filter))

  const response = await axiosInstance.get('/admin/materials', { params });
  return response.data;
};

export const createMaterialApi = async (request: MaterialFormValues) => {
  const response = await axiosInstance.post('/admin/materials', request);
  return response.data;
};

export const updateMaterialApi = async (id: number | string, request: MaterialFormValues) => {
  const response = await axiosInstance.put(`/admin/materials/${id}`, request);
  return response.data;
};

export const restoreMaterialApi = async (id: number | string) => {
  const response = await axiosInstance.put(`/admin/materials/${id}/restore`);
  return response.data;
};

export const deleteMaterialApi = async (id: number | string) => {
  const response = await axiosInstance.delete(`/admin/materials/${id}`);
  return response.data;
};

export const updateMaterialStatusApi = async (id: number | string, status: string) => {
  const response = await axiosInstance.patch(`/admin/materials/${id}/status`, { status });
  return response.data;
};


export const getMaterialUploadSignatureApi = async () => {
  const response = await axiosInstance.get(`/admin/materials/upload-signature`);
  return response.data;
};