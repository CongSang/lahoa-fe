import { uploadToCloudinary } from "@/lib/index";
import { CategoryFormValues } from "@/schema/index";
import { createCategoryApi, deleteCategoryApi, getCategoryUploadSignatureApi, restoreCategoryApi, updateCategoryApi, updateCategoryStatusApi } from "@/services/index";
import { useCrudMutation } from "@/hooks/index";

export async function handleCategorySubmit(data: CategoryFormValues): Promise<CategoryFormValues> {
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
    description: data.description?.trim(),
    seoTitle: data.seoTitle?.trim(),
    seoDescription: data.seoDescription?.trim(),
    seoKeywords: data.seoKeywords?.trim(),
  };

  return payload;
}

export function useCategoryCrud() {
  return useCrudMutation<CategoryFormValues>({
    queryKey: ["categories"],

    mutationFn: async (vars) => {
      const { action, data, id, status } = vars;

      switch (action) {
        case "create": {
          const payload = await handleCategorySubmit(data as CategoryFormValues);
          return createCategoryApi(payload) 
        };

        case "update": {
          const payload = await handleCategorySubmit(data as CategoryFormValues);
          return updateCategoryApi(payload.id!, payload)
        };

        case "update-status":
          return updateCategoryStatusApi(id!, status!);

        case "delete":
          return deleteCategoryApi(id!);

        case "restore":
          return restoreCategoryApi(id!);
      }
    },
  });
}