import { axiosInstance } from "../lib";


export const getPropertiesApi = async () => {
  const response = await axiosInstance.get('/properties/filters');
  return response.data;
};