import { WarehouseFormValues } from "@/schema/index";
import { createWarehouseApi, deleteWarehouseApi, restoreWarehouseApi, updateWarehouseApi, updateWarehouseStatusApi } from "@/services/index";
import { useCrudMutation } from "@/hooks/index";

export function handleWarehouseSubmit(
  data: WarehouseFormValues
): WarehouseFormValues {
  const payload = {
    ...data,
    name: data.name.trim(),
    code: data.code?.trim(),
    address: data.address?.trim(),
  };

  return payload;
}

export function useWarehouseCrud() {
  return useCrudMutation<WarehouseFormValues>({
    queryKey: ["warehouses"],

    mutationFn: async (vars) => {
      const { action, data, id, status } = vars;

      switch (action) {
        case "create": {
          const payload = handleWarehouseSubmit(data as WarehouseFormValues);
          return createWarehouseApi(payload) 
        };

        case "update": {
          const payload = handleWarehouseSubmit(data as WarehouseFormValues);
          return updateWarehouseApi(payload.id!, payload)
        };

        case "update-status":
          return updateWarehouseStatusApi(id!, status!);

        case "delete":
          return deleteWarehouseApi(id!);

        case "restore":
          return restoreWarehouseApi(id!);
      }
    },
  });
}