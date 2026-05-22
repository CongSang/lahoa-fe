import { axiosInstance } from "../lib";


export const getPropertiesApi = async (isFilterable: boolean) => {
  const response = await axiosInstance.get(
    '/admin/properties/filters', 
    { params: { isFilterable } }
  );
  return response.data;
};