import { createMaterialReceiptApi } from '@/services/index';
import { MaterialImportFormValues } from "@/schema/index";
import { useCrudMutation } from "@/hooks/index";

export function handleMaterialReceiptSubmit(
  data: MaterialImportFormValues
): MaterialImportFormValues {
  const payload = {
    ...data,
    supplier: data.supplier?.trim(),
    note: data.note?.trim(),
  };

  return payload;
}

export function useMaterialReceiptCrud() {
  return useCrudMutation<MaterialImportFormValues>({
    queryKey: ["material-receipts"],

    mutationFn: async (vars) => {
      const { action, data } = vars;

      switch (action) {
        case "create": {
          const payload = handleMaterialReceiptSubmit(data as MaterialImportFormValues);
          return createMaterialReceiptApi(payload) 
        };
      }
    },
  });
}