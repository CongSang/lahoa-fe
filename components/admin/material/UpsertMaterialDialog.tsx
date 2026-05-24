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

import { FieldConfig, MaterialFormValues, materialSchema } from "@/schema/index";
import { MATERIAL_UNIT_OPTIONS, Option, StatusCommon } from "@/types/index";
import { statusDropdown } from "@/lib/index";
import { PencilLineIcon, PlusIcon } from "lucide-react";

type UpsertMaterialDialogProps = {
  isLoading: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Partial<MaterialFormValues>;
  dropdown: Option[]
  onSubmit: (data: MaterialFormValues) => void;
};

export function UpsertMaterialDialog({
  open,
  isLoading,
  onOpenChange,
  initialData,
  dropdown,
  onSubmit,
}: UpsertMaterialDialogProps) {
  const form = useForm<MaterialFormValues>({
    resolver: zodResolver(materialSchema) as Resolver<MaterialFormValues>,
    defaultValues: {
      code: "",
      name: "",
      thumbnail: "",
      categoryId: "",
      unit: "",
      defaultCost: "",
      lowStockThreshold: undefined,
      status: StatusCommon.ACTIVE,
      ...initialData,
    },
  });

  const { handleSubmit, reset } = form;

  const sectionFormConfig: FieldConfig<MaterialFormValues>[] = [
    { name: "thumbnail", type: "image", label: "Ảnh nguyên liệu", required: true },
    { name: "code", label: "Mã nguyên liệu", type: "text", readonly: true },
    { name: "name", label: "Tên nguyên liệu", type: "text", className: "sm:col-span-6", required: true },
    { name: "defaultCost", label: "Giá vốn", type: "price",  className: "sm:col-span-6", required: true },
    { name: "unit", label: "Đơn vị", type: "select",  className: "sm:col-span-6", options: MATERIAL_UNIT_OPTIONS, required: true },
    { name: "categoryId", label: "Danh mục", type: "select-command",  className: "sm:col-span-6", options: dropdown, required: true },
    { name: "status", label: "Trạng thái", type: "select", className: "sm:col-span-6", options: statusDropdown, required: true },
    { name: "lowStockThreshold", label: "Ngưỡng cảnh báo tồn kho thấp", type: "number",  className: "sm:col-span-6" },
  ];

  useEffect(() => {
    if (open) {
      reset({
        code: "",
        name: "",
        thumbnail: "",
        categoryId: "",
        unit: "",
        defaultCost: "",
        lowStockThreshold: undefined,
        status: StatusCommon.ACTIVE,
        ...initialData,
      } as MaterialFormValues);
    }
  }, [open, initialData, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Cập nhật nguyên liệu" : "Tạo nguyên liệu"}
          </DialogTitle>
          <DialogDescription className={!initialData ? "sr-only" : ""}>
            ID: {initialData?.id}
          </DialogDescription>
        </DialogHeader>

        <form
          id="form-material"
          onSubmit={handleSubmit((data) => {
            onSubmit(data as MaterialFormValues);
          })}
          className="space-y-2"
        >
          <div className="-mx-4 no-scrollbar max-h-[60vh] overflow-y-auto px-4 py-1 flex flex-col gap-4">
            <FormSection<MaterialFormValues>
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
              {isLoading ? <Spinner /> :
                initialData ? <PencilLineIcon /> : <PlusIcon />}
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