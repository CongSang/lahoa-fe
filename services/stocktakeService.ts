import { PageRequest, StockTakeFilterRequest } from "@/types/index";
import { axiosInstance, buildApiParams, cleanObject } from "@/lib/index";
import { StockTakeFormValues } from "@/schema/index";


export const getStockTakesApi = async (filter: StockTakeFilterRequest & PageRequest) => {
  const params = buildApiParams(cleanObject(filter))

  const response = await axiosInstance.get('/admin/stocktakes', { params });
  return response.data;
};

export const getStockTakeByIdApi = async (id: string) => {
  const response = await axiosInstance.get(`/admin/stocktakes/${id}`);
  return response.data;
};

export const createStockTakeApi = async (request: StockTakeFormValues) => {
  const response = await axiosInstance.post('/admin/stocktakes', request);
  return response.data;
};

export const getMaterialsForStocktakeApi = async (warehouseId: string) => {
  const response = await axiosInstance.get(`/admin/stocktakes/warehouses/${warehouseId}/materials`);
  return response.data;
};