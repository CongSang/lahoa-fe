import { parseNumber, uploadToCloudinary } from "@/lib/index";
import { CategoryFormOutput } from "@/schema/index";
import { createCategoryApi, deleteCategoryApi, getCategoryUploadSignatureApi, restoreCategoryApi, updateCategoryApi } from "@/services/index";
import { useCrudMutation } from "@/hooks/index";

export async function handleCategorySubmit(data: CategoryFormOutput): Promise<CategoryFormOutput> {
  let imageUrl = data.imageUrl;
  let imagePublicId = data.imagePublicId;

  if (data.imageUrl instanceof File) {
    const uploaded = await uploadToCloudinary(data.imageUrl, getCategoryUploadSignatureApi);

    imageUrl = uploaded.url
    imagePublicId = uploaded.publicId
  }

  const payload = {
    ...data,
    name: data.name.trim(),
    imageUrl,
    imagePublicId,
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