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

import { MaterialCategoryFormValues, FieldConfig, materialCategorySchema } from "@/schema/index";
import { StatusCommon } from "@/types/index";
import { statusDropdown } from "@/lib/index";
import { PencilLineIcon, PlusIcon } from "lucide-react";

type UpsertMaterialCategoryDialogProps = {
  isLoading: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Partial<MaterialCategoryFormValues>;
  onSubmit: (data: MaterialCategoryFormValues) => void;
};

export function UpsertMaterialCategoryDialog({
  open,
  isLoading,
  onOpenChange,
  initialData,
  onSubmit,
}: UpsertMaterialCategoryDialogProps) {
  const form = useForm<MaterialCategoryFormValues>({
    resolver: zodResolver(materialCategorySchema) as Resolver<MaterialCategoryFormValues>,
    defaultValues: {
      name: "",
      description: "",
      status: StatusCommon.ACTIVE,
      ...initialData,
    },
  });

  const { handleSubmit, reset } = form;

  const sectionFormConfig: FieldConfig<MaterialCategoryFormValues>[] = [
    { name: "name", label: "Tên danh mục", type: "text", className: "sm:col-span-6", required: true },
    { name: "status", label: "Trạng thái", type: "select", className: "sm:col-span-6", options: statusDropdown, required: true },
    { name: "description", label: "Mô tả", type: "textarea", placeholder: "Mô tả danh mục" },
  ];

  useEffect(() => {
    if (open) {
      reset({
        code: "",
        name: "",
        description: "",
        status: StatusCommon.ACTIVE,
        ...initialData,
      } as MaterialCategoryFormValues);
    }
  }, [open, initialData, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Cập nhật danh mục" : "Tạo danh mục"}
          </DialogTitle>
          <DialogDescription className={!initialData ? "sr-only" : ""}>
            ID: {initialData?.id}
          </DialogDescription>
        </DialogHeader>

        <form
          id="form-material-category"
          onSubmit={handleSubmit((data) => {
            onSubmit(data as MaterialCategoryFormValues);
          })}
          className="space-y-2"
        >
          <div className="-mx-4 no-scrollbar max-h-[60vh] overflow-y-auto px-4 py-1 flex flex-col gap-4">
            <FormSection<MaterialCategoryFormValues>
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