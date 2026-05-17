import { getProductUploadSignatureApi, updateProductStatusApi } from '@/services/index';
import { uploadToCloudinary } from "@/lib/index";
import { createProductApi, deleteProductApi, restoreProductApi, updateProductApi } from "@/services/index";
import { useCrudMutation } from "@/hooks/index";
import { ProductFormValues } from "@/schema/product";

export async function handleProductSubmit(data: ProductFormValues): Promise<ProductFormValues> {
  let imageUrl = data.imageUrl;
  let imagePublicId = data.imagePublicId;

  if (data.imageUrl instanceof File) {
    const uploaded = await uploadToCloudinary(data.imageUrl, getProductUploadSignatureApi);

    imageUrl = uploaded.url
    imagePublicId = uploaded.publicId
  }

  const payload: ProductFormValues = {
    ...data,
    name: data.name.trim(),
    description: data.description?.trim(),
    imageUrl,
    imagePublicId,
    seoTitle: data.seoTitle?.trim(),
    seoDescription: data.seoDescription?.trim(),
    seoKeywords: data.seoKeywords?.trim(),
  };

  return payload;
}

export function useProductCrud() {
  return useCrudMutation<ProductFormValues>({
    queryKey: ["products"],

    mutationFn: async (vars) => {
      const { action, data, id, status } = vars;

      switch (action) {
        case "create": {
          const payload = await handleProductSubmit(data as ProductFormValues);
          return createProductApi(payload) 
        };

        case "update": {
          const payload = await handleProductSubmit(data as ProductFormValues);
          return updateProductApi(payload.id!, payload)
        };

        case "update-status": {
          return updateProductStatusApi(id!, status!)
        };

        case "delete":
          return deleteProductApi(id!);

        case "restore":
          return restoreProductApi(id!);
      }
    },
  });
}