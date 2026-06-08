import { createStockTakeApi } from '@/services/index';
import { StockTakeFormValues } from "@/schema/index";
import { useCrudMutation } from "@/hooks/index";

export function handleStockTakeSubmit(
  data: StockTakeFormValues
): StockTakeFormValues {
  const payload = {
    ...data,
    note: data.note?.trim(),
  };

  return payload;
}

export function useStockTakeCrud() {
  return useCrudMutation<StockTakeFormValues>({
    queryKey: ["stocktakes"],

    mutationFn: async (vars) => {
      const { action, data } = vars;

      switch (action) {
        case "create": {
          const payload = handleStockTakeSubmit(data as StockTakeFormValues);
          return createStockTakeApi(payload) 
        };
      }
    },
  });
}