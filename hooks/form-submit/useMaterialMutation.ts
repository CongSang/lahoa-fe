import { deleteMaterialApi, getMaterialUploadSignatureApi, restoreMaterialApi, updateMaterialApi, updateMaterialStatusApi } from "@/services/index";
import { useCrudMutation } from "@/hooks/index";
import { MaterialFormValues } from "@/schema/index";
import { createMaterialApi } from "@/services/index";
import { uploadToCloudinary } from "@/lib/index";

export async function handleMaterialSubmit(data: MaterialFormValues): Promise<MaterialFormValues> {
  let thumbnail = data.thumbnail;
  let thumbnailPublicId = data.thumbnailPublicId;

  if (data.thumbnail instanceof File) {
    const uploaded = await uploadToCloudinary(data.thumbnail, getMaterialUploadSignatureApi);

    thumbnail = uploaded.url
    thumbnailPublicId = uploaded.publicId
  }

  const payload = {
    ...data,
    name: data.name.trim(),
    thumbnail,
    thumbnailPublicId,
    lowStockThreshold: data.lowStockThreshold ? data.lowStockThreshold : 0
  };

  return payload;
}

export function useMaterialCrud() {
  return useCrudMutation<MaterialFormValues>({
    queryKey: ["materials"],

    mutationFn: async (vars) => {
      const { action, data, id, status } = vars;

      switch (action) {
        case "create": {
          const payload = await handleMaterialSubmit(data as MaterialFormValues);
          return createMaterialApi(payload) 
        };

        case "update": {
          const payload = await handleMaterialSubmit(data as MaterialFormValues);
          return updateMaterialApi(payload.id!, payload)
        };

        case "update-status":
          return updateMaterialStatusApi(id!, status!);

        case "delete":
          return deleteMaterialApi(id!);

        case "restore":
          return restoreMaterialApi(id!);
      }
    },
  });
}