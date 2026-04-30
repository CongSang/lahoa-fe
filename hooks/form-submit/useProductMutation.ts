import { getProductUploadSignatureApi } from '@/services/index';
import { parseNumber, uploadToCloudinary } from "@/lib/index";
import { createProductApi, deleteProductApi, restoreProductApi, updateProductApi } from "@/services/index";
import { useCrudMutation } from "@/hooks/index";
import { ProductFormOutput } from "@/schema/product";

export async function handleProductSubmit(data: ProductFormOutput): Promise<ProductFormOutput> {
  let mainImage = data.mainImage;
  let imagePublicId = data.imagePublicId;

  if (data.mainImage instanceof File) {
    const uploaded = await uploadToCloudinary(data.mainImage, getProductUploadSignatureApi);

    mainImage = uploaded.url
    imagePublicId = uploaded.publicId
  }

  const payload: ProductFormOutput = {
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
  return useCrudMutation<ProductFormOutput>({
    queryKey: ["products"],

    mutationFn: async (vars) => {
      const { action, data, id } = vars;

      switch (action) {
        case "create": {
          const payload = await handleProductSubmit(data as ProductFormOutput);
          return createProductApi(payload) 
        };

        case "update": {
          const payload = await handleProductSubmit(data as ProductFormOutput);
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