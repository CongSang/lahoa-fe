'use client'

import { Badge, Button, Card, FormSection, Spinner } from "@/components/index"
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { FieldConfig, StockTakeFormValues, stockTakeSchema } from "@/schema/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStockTakeCrud } from "@/hooks/index";
import { useQuery } from "@tanstack/react-query";
import { getStockTakeByIdApi, getWarehouseDropdownApi } from "@/services/index";
import { DataTableStockTake } from "./DataTableStockTake";
import { PlusIcon } from "lucide-react";
import { useEffect } from "react";
import { StatusCommon } from "@/types/common";
import { formatDateTime } from "@/lib/datetime";

interface StockTakeFormProps {
  mode: "create" | "detail"
  stocktakeId?: string;
}

export const StockTakeForm = ({ stocktakeId, mode }: StockTakeFormProps) => {
  const form = useForm<StockTakeFormValues>({
    resolver: zodResolver(stockTakeSchema) as Resolver<StockTakeFormValues>,
    defaultValues: {
      warehouseId: "",
      note: "",
      details: [],
    },
  });

  const { handleSubmit, reset } = form;

  const { data: stocktake, isLoading } = useQuery({
    queryKey: ["stocktake", stocktakeId],
    queryFn: () => getStockTakeByIdApi(stocktakeId!),
    enabled: mode === "detail" && !!stocktakeId,
  });

  const mutation = useStockTakeCrud();

  const onSubmit = async (formData: StockTakeFormValues) => {
    mutation.mutate({ 
      action: "create", 
      data: formData,
      meta: {
        successMessage: "Tạo phiếu thành công",
        errorMessage: "Tạo phiếu thất bại"
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

  const sectionFormConfig: FieldConfig<StockTakeFormValues>[] = [
    { 
      name: "warehouseId", 
      label: "Kho tiếp nhận", 
      type: "select-command", 
      className: "sm:col-span-7", 
      options: warehouseDropdown,
      readonly: mode === "detail",
      placeholder: "Chọn giá trị"
    },
    { 
      name: "note", 
      label: "Ghi chú", 
      type: "textarea", 
      className: "sm:col-span-7",
      readonly: mode === "detail"
    },
  ]

  useEffect(() => {
    if (mode === "detail" && stocktake) {
      form.reset(stocktake);
    }
  }, [stocktake, mode, form]);

  return (
    <>
      {mode === "detail" && (
        <h2 className="text-xl font-bold tracking-tight text-foreground mb-4 leading-8">
          Chi tiết phiếu kiểm kê <span className="text-rose-600 dark:text-rose-400">#{stocktake?.code}</span>
        </h2>
      )}

      <Card className="p-4">
        <form 
          id='form-stocktake' 
          onSubmit={handleSubmit(
            (data) => onSubmit(data),
            (error) => console.log("error", error)
          )}
          className="space-y-3"
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-lg">Thông tin phiếu kiểm kê</h3>

            {mode === "create" && (
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? <Spinner /> : <PlusIcon />}
                Cân bằng kho
              </Button>
            )}
          </div>

          {mode === "create" ? (
            <FormSection<StockTakeFormValues>
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

                <div className="font-medium flex items-center gap-1">
                  {stocktake?.warehouseName || '-'}
                  {stocktake.warehouseStatus === StatusCommon.DELETED && (
                    <Badge variant="destructive">Đã đóng cửa</Badge>
                  )}
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6">
                <label className="text-muted-foreground text-xs">
                  Ngày tạo
                </label>

                <div className="font-medium">
                  {formatDateTime(stocktake?.createdAt) || '-'}
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6">
                <label className="text-muted-foreground text-xs">
                  Người tạo
                </label>

                <div className="font-medium">
                  {stocktake?.createdBy || '-'}
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6">
                <label className="text-muted-foreground text-xs">
                  Ghi chú
                </label>

                <div className="font-medium">
                  {stocktake?.note || '-'}
                </div>
              </div>
            </div>
          )}

          <FormProvider {...form}>
            <DataTableStockTake 
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
