/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Spinner
} from "@/components/index";

import { FieldConfig, VariantFormValues, variantSchema } from "@/schema/index";
import { GroupOptions, StatusCommon } from "@/types/index";
import { statusDropdown } from "@/lib/index";
import { PencilLineIcon, PlusIcon } from "lucide-react";

type UpsertVariantDialogProps = {
  isLoading: boolean;
  open: boolean;
  propertyOptions?: any;
  onOpenChange: (open: boolean) => void;
  initialData?: Partial<VariantFormValues>;
  onSubmit: (data: VariantFormValues) => void;
};

export function UpsertVariantDialog({
  open,
  isLoading,
  propertyOptions,
  onOpenChange,
  initialData,
  onSubmit,
}: UpsertVariantDialogProps) {
  const form = useForm<VariantFormValues>({
    resolver: zodResolver(variantSchema) as Resolver<VariantFormValues>,
    defaultValues: {
      sku: "",
      price: "",
      status: StatusCommon.ACTIVE,
      default: false,
      propertyValueIds: [""],
      ...initialData,
    },
  });

  const { handleSubmit, reset } = form;

  const sectionVariantConfig: FieldConfig<VariantFormValues>[] =  [
    { name: "sku", label: "SKU", type: "text", readonly: true },
    { name: "price", label: "Giá", type: "price", className: "lg:col-span-6", required: true },
    { name: "status", label: "Trạng thái", type: "select", className: "lg:col-span-6", options: statusDropdown, required: true },
    ...(propertyOptions?.map((property: GroupOptions, index: number) => ({
      name: `propertyValueIds.${index}`,
      type: "radio",
      label: property.name,
      options: property.values,
      required: true
    })) || []),
    { name: "default", type: "checkbox", label: "Đánh dấu mặc định", className: "mt-4", placeholder: "Biến thể mặc định sẽ ưu tiên hiển thị ở trang chi tiết" },
  ]

  const submitVariant = handleSubmit((data) => {
    onSubmit(data);
    onOpenChange(false)
  });

  useEffect(() => {
    if (open) {
      reset({
        sku: "",
        price: "",
        status: StatusCommon.ACTIVE,
        default: false,
        propertyValueIds: [""],
        ...initialData,
      } as VariantFormValues);
    }
  }, [open, initialData, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Cập nhật biến thể" : "Tạo biến thể"}
          </DialogTitle>
          <DialogDescription className={!initialData?.id ? "sr-only" : ""}>
            ID: {initialData?.id}
          </DialogDescription>
        </DialogHeader>

        <form
          id="form-variant"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            submitVariant(e)
          }}
          className="space-y-2"
        >
          <div className="-mx-4 no-scrollbar max-h-[60vh] overflow-y-auto px-4 py-1 flex flex-col gap-4">
            <FormSection<VariantFormValues>
              form={form}
              config={sectionVariantConfig}
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