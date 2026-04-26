import { parseNumber, uploadToCloudinary } from "@/lib/index";
import { CategoryFormOutput } from "@/schema/category";
import { createCategoryApi, deleteCategoryApi, restoreCategoryApi, updateCategoryApi } from "@/services/index";
import { useCrudMutation } from "@/hooks/index";

export async function handleCategorySubmit(data: CategoryFormOutput): Promise<CategoryFormOutput> {
  let imageUrl = data.imageUrl;

  if (data.imageUrl instanceof File) {
    imageUrl = await uploadToCloudinary(data.imageUrl);
  }

  const payload = {
    ...data,
    name: data.name.trim(),
    imageUrl,
    parentId: data.parentId !== -1 ? data.parentId : null,
    displayOrder:
      data.displayOrder !== undefined
        ? parseNumber(String(data.displayOrder))
        : undefined,
  };

  return payload;
}

export function useCategoryCrud() {
  return useCrudMutation<CategoryFormOutput>({
    queryKey: ["categories"],

    mutationFn: async (vars) => {
      const { action, data, id } = vars;

      switch (action) {
        case "create": {
          const payload = await handleCategorySubmit(data as CategoryFormOutput);
          return createCategoryApi(payload) 
        };

        case "update": {
          const payload = await handleCategorySubmit(data as CategoryFormOutput);
          return updateCategoryApi(payload.id!, payload)
        };

        case "delete":
          return deleteCategoryApi(id!);

        case "restore":
          return restoreCategoryApi(id!);
      }
    },
  });
}