import { MaterialCategoryFormValues } from "@/schema/index";
import { createMaterialCategoryApi, deleteMaterialCategoryApi, restoreMaterialCategoryApi, updateMaterialCategoryApi, updateMaterialCategoryStatusApi } from "@/services/index";
import { useCrudMutation } from "@/hooks/index";

export function handleMaterialCategorySubmit(
  data: MaterialCategoryFormValues
): MaterialCategoryFormValues {
  const payload = {
    ...data,
    name: data.name.trim(),
    description: data.description?.trim(),
  };

  return payload;
}

export function useMaterialCategoryCrud() {
  return useCrudMutation<MaterialCategoryFormValues>({
    queryKey: ["material-categories"],

    mutationFn: async (vars) => {
      const { action, data, id, status } = vars;

      switch (action) {
        case "create": {
          const payload = handleMaterialCategorySubmit(data as MaterialCategoryFormValues);
          return createMaterialCategoryApi(payload) 
        };

        case "update": {
          const payload = handleMaterialCategorySubmit(data as MaterialCategoryFormValues);
          return updateMaterialCategoryApi(payload.id!, payload)
        };

        case "update-status":
          return updateMaterialCategoryStatusApi(id!, status!);

        case "delete":
          return deleteMaterialCategoryApi(id!);

        case "restore":
          return restoreMaterialCategoryApi(id!);
      }
    },
  });
}