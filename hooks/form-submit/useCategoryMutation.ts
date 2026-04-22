import { parseNumber, uploadToCloudinary } from "@/lib/index";
import { CategoryFormOutput } from "@/schema/category";
import { createCategoryApi, updateCategoryApi } from "@/services/index";
import { Category, PageResponse } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function handleCategorySubmit(data: CategoryFormOutput): Promise<CategoryFormOutput> {
  let imageUrl = data.imageUrl;

  if (data.imageUrl instanceof File) {
    imageUrl = await uploadToCloudinary(data.imageUrl);
  }

  const payload = {
    ...data,
    imageUrl,
    parentId: data.parentId ?? undefined,
    displayOrder:
      data.displayOrder !== undefined
        ? parseNumber(String(data.displayOrder))
        : undefined,
  };

  return payload;
}

export function useCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: CategoryFormOutput) => {
      const payload = await handleCategorySubmit(formData);
      const res = await (!payload.id 
        ? createCategoryApi(payload) 
        : updateCategoryApi(payload.id, payload)
      )

      return res
    },

    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["categories"] });

      const prev = queryClient.getQueryData(["categories"]);

      queryClient.setQueryData(["categories"], (old: PageResponse<Category>) => ({
        ...old,
        content: [newData, ...(old?.content || [])],
      }));

      return { prev };
    },

    onError: (_err, _newData, context) => {
      queryClient.setQueryData(["categories"], context?.prev);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}