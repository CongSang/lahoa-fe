'use client'

import { Button, Card, FormSection, Spinner } from "@/components/index"
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { FieldConfig, MaterialImportFormValues, materialImportSchema } from "@/schema/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMaterialReceiptCrud } from "@/hooks/index";
import { useQuery } from "@tanstack/react-query";
import { getMaterialReceiptByIdApi, getWarehouseDropdownApi } from "@/services/index";
import { DataTableMaterialReceipt } from "./DataTableMaterialReceipt";
import { PlusIcon } from "lucide-react";
import { useEffect } from "react";

interface MaterialReceiptFormProps {
  mode: "create" | "detail"
  receiptId?: string;
}

export const MaterialReceiptForm = ({ receiptId, mode }: MaterialReceiptFormProps) => {
  const form = useForm<MaterialImportFormValues>({
    resolver: zodResolver(materialImportSchema) as Resolver<MaterialImportFormValues>,
    defaultValues: {
      warehouseId: "",
      supplier: "",
      note: "",
      details: [],
    },
  });

  const { handleSubmit, reset } = form;

  const { data: receipt, isLoading } = useQuery({
    queryKey: ["material-receipt", receiptId],
    queryFn: () => getMaterialReceiptByIdApi(receiptId!),
    enabled: mode === "detail" && !!receiptId,
  });

  const mutation = useMaterialReceiptCrud();

  const onSubmit = async (formData: MaterialImportFormValues) => {
    mutation.mutate({ 
      action: "create", 
      data: formData,
      meta: {
        successMessage: "Tạo hóa đơn thành công",
        errorMessage: "Tạo hóa đơn thất bại"
      }
    },
    {
      onSuccess: () => {
        reset()
      },
    })
  };

  const { data: warehouseDropdown } = useQuery({
    queryKey: ["warehouse-dropdown"],
    queryFn: getWarehouseDropdownApi,
    enabled: mode === "create",
  });

  const sectionFormConfig: FieldConfig<MaterialImportFormValues>[] = [
    { 
      name: "warehouseId", 
      label: "Kho tiếp nhận", 
      type: "select-command", 
      className: "sm:col-span-6", 
      options: warehouseDropdown,
      readonly: mode === "detail"
    },
    { 
      name: "supplier", 
      label: "Nhà cung cấp", 
      placeholder: "Tên NCC", 
      type: "text", 
      className: "sm:col-span-6",
      readonly: mode === "detail"
    },
    { 
      name: "note", 
      label: "Ghi chú", 
      type: "textarea", 
      className: "lg:col-span-6",
      readonly: mode === "detail"
    },
  ]

  useEffect(() => {
    if (mode === "detail" && receipt) {
      form.reset(receipt);
    }
  }, [receipt, mode, form]);

  return (
    <>
      {mode === "detail" && (
        <h2 className="text-xl font-bold tracking-tight text-foreground mb-4 leading-8">
          Chi tiết hóa đơn <span className="text-rose-600 dark:text-rose-400">#{receipt?.code}</span>
        </h2>
      )}

      <Card className="p-4">
        <form 
          id='form-material-receipt' 
          onSubmit={handleSubmit(
            (data) => onSubmit(data),
            (error) => console.log("error", error)
          )}
          className="space-y-3"
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-lg">Thông tin phiếu</h3>

            {mode === "create" && (
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? <Spinner /> : <PlusIcon />}
                Tạo hóa đơn
              </Button>
            )}
          </div>

          {mode === "create" ? (
            <FormSection<MaterialImportFormValues>
              form={form}
              config={sectionFormConfig}
              disabledAll={mutation.isPending}
            />
          ) : (
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-12 sm:col-span-6">
                <label className="text-muted-foreground text-xs">
                  Kho tiếp nhận
                </label>

                <div className="font-medium">
                  {receipt?.warehouseName || '-'}
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6">
                <label className="text-muted-foreground text-xs">
                  Nhà cung cấp
                </label>

                <div className="font-medium">
                  {receipt?.supplier || '-'}
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6">
                <label className="text-muted-foreground text-xs">
                  Ghi chú
                </label>

                <div className="font-medium">
                  {receipt?.note || '-'}
                </div>
              </div>
            </div>
          )}

          <FormProvider {...form}>
            <DataTableMaterialReceipt 
              loading={mutation.isPending} 
              loadingData={isLoading} 
              disabledEdit={mode === "detail"} 
            />
          </FormProvider>
        </form>
      </Card>
    </>
  )
}
