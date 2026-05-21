import { axiosInstance, cleanObject, buildApiParams } from "@/lib/index";
import { AuditLogFilterRequest, PageRequest } from "@/types/index";

export const getAuditLogsApi = async (filter: AuditLogFilterRequest & PageRequest) => {
  const params = buildApiParams(cleanObject(filter))

  const response = await axiosInstance.get('/admin/audit-logs', { params });
  return response.data;
};