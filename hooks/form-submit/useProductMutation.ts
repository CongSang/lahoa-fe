import { getProductUploadSignatureApi } from '@/services/index';
import { parseNumber, uploadToCloudinary } from "@/lib/index";
import { createProductApi, deleteProductApi, restoreProductApi, updateProductApi } from "@/services/index";
import { useCrudMutation } from "@/hooks/index";
import { ProductFormValues } from "@/schema/product";

export async function handleProductSubmit(data: ProductFormValues): Promise<ProductFormValues> {
  let mainImage = data.mainImage;
  let imagePublicId = data.imagePublicId;

  if (data.mainImage instanceof File) {
    const uploaded = await uploadToCloudinary(data.mainImage, getProductUploadSignatureApi);

    mainImage = uploaded.url
    imagePublicId = uploaded.publicId
  }

  const payload: ProductFormValues = {
    ...data,
    name: data.name.trim(),
    mainImage,
    imagePublicId,
    displayOrder:
      data.displayOrder !== undefined
        ? parseNumber(String(data.displayOrder))
        : undefined,
  };

  return payload;
}

export function useProductCrud() {
  return useCrudMutation<ProductFormValues>({
    queryKey: ["products"],

    mutationFn: async (vars) => {
      const { action, data, id } = vars;

      switch (action) {
        case "create": {
          const payload = await handleProductSubmit(data as ProductFormValues);
          return createProductApi(payload) 
        };

        case "update": {
          const payload = await handleProductSubmit(data as ProductFormValues);
          return updateProductApi(payload.id!, payload)
        };

        case "delete":
          return deleteProductApi(id!);

        case "restore":
          return restoreProductApi(id!);
      }
    },
  });
}