"use client";

import { useEffect } from "react";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  FormSection,
  DialogDescription,
  Spinner,
} from "@/components/index";

import { WarehouseFormValues, FieldConfig, warehouseSchema } from "@/schema/index";
import { StatusCommon } from "@/types/index";
import { statusDropdown } from "@/lib/index";
import { PencilLineIcon, PlusIcon } from "lucide-react";

type UpsertWarehouseDialogProps = {
  isLoading: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Partial<WarehouseFormValues>;
  onSubmit: (data: WarehouseFormValues) => void;
};

export function UpsertWarehouseDialog({
  open,
  isLoading,
  onOpenChange,
  initialData,
  onSubmit,
}: UpsertWarehouseDialogProps) {
  const form = useForm<WarehouseFormValues>({
    resolver: zodResolver(warehouseSchema) as Resolver<WarehouseFormValues>,
    defaultValues: {
      code: "",
      name: "",
      address: "",
      status: StatusCommon.ACTIVE,
      ...initialData,
    },
  });

  const { handleSubmit, reset } = form;

  const sectionFormConfig: FieldConfig<WarehouseFormValues>[] = [
    { name: "code", label: "Mã kho", type: "text", required: true },
    { name: "name", label: "Tên kho", type: "text", className: "sm:col-span-6", required: true },
    { name: "status", label: "Trạng thái", type: "select", className: "sm:col-span-6", options: statusDropdown, required: true },
    { name: "address", label: "Địa chỉ", type: "textarea", placeholder: "Địa chỉ kho" },
  ];

  useEffect(() => {
    if (open) {
      reset({
        code: "",
        name: "",
        address: "",
        status: StatusCommon.ACTIVE,
        ...initialData,
      } as WarehouseFormValues);
    }
  }, [open, initialData, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Cập nhật kho" : "Tạo kho"}
          </DialogTitle>
          <DialogDescription className={!initialData ? "sr-only" : ""}>
            ID: {initialData?.id}
          </DialogDescription>
        </DialogHeader>

        <form
          id="form-material-category"
          onSubmit={handleSubmit((data) => {
            onSubmit(data as WarehouseFormValues);
          })}
          className="space-y-2"
        >
          <div className="-mx-4 no-scrollbar max-h-[60vh] overflow-y-auto px-4 py-1 flex flex-col gap-4">
            <FormSection<WarehouseFormValues>
              form={form}
              config={sectionFormConfig}
              disabledAll={isLoading}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild disabled={isLoading}>
              <Button type="button" variant="outline" disabled={isLoading}>
                Huỷ
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading || (initialData && !form.formState.isDirty)}>
              {isLoading 
                ? <Spinner /> 
                : initialData 
                  ? <PencilLineIcon /> 
                  : <PlusIcon />}
              {
                initialData
                  ? "Cập nhật"
                  : "Tạo mới"
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}