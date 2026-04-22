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
  AutoForm,
  DialogDescription,
  Spinner
} from "@/components/index";

import { categorySchema, CategoryFormInput, CategoryFormOutput, FieldConfig } from "@/schema/index";
import { SelectType, StatusCommon } from "@/types/index";
import { statusDropdown } from "@/lib/data";

type UpsertCategoryDialogProps = {
  isLoading: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Partial<CategoryFormInput>;
  parents?: SelectType[];
  onSubmit: (data: CategoryFormOutput) => void;
};

export function UpsertCategoryDialog({
  open,
  isLoading,
  onOpenChange,
  initialData,
  parents = [],
  onSubmit,
}: UpsertCategoryDialogProps) {
  const form = useForm<CategoryFormInput>({
    resolver: zodResolver(categorySchema) as Resolver<CategoryFormInput>,
    defaultValues: {
      name: "",
      imageUrl: "",
      parentId: null,
      description: "",
      displayOrder: undefined,
      status: StatusCommon.ACTIVE,
      ...initialData,
    },
  });

  const { handleSubmit, reset } = form;

  const categoryFormConfig: FieldConfig<CategoryFormInput>[] = [
    { name: "imageUrl", label: "Ảnh", type: "image" },
    { name: "name", label: "Tên danh mục", type: "text" },
    { name: "parentId", label: "Danh mục cha", type: "select", placeholder: "Chọn danh mục", options: parents },
    { name: "displayOrder", label: "TT hiển thị", type: "number", className: "col-span-6" },
    { name: "status", label: "Trạng thái", type: "select", className: "col-span-6", options: statusDropdown },
    { name: "slug", label: "Đường dẫn", type: "text", disabled: true },
    { name: "description", label: "Mô tả", type: "textarea", placeholder: "Mô tả danh mục" },
  ];

  useEffect(() => {
    if (open) {
      reset({
        name: "",
        imageUrl: "",
        parentId: null,
        description: "",
        status: StatusCommon.ACTIVE,
        ...initialData,
        displayOrder: initialData?.displayOrder ? String(initialData?.displayOrder) : undefined,
      });
    }
  }, [open, initialData, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Cập nhật danh mục" : "Tạo danh mục"}
          </DialogTitle>
          <DialogDescription>
            Id: {initialData?.id}
          </DialogDescription>
        </DialogHeader>

        <form
          id="form-category"
          onSubmit={handleSubmit((data) => {
            onSubmit(data as CategoryFormOutput);
          })}
          className="space-y-2"
        >
          <AutoForm<CategoryFormInput>
            form={form}
            config={categoryFormConfig}
            disabledAll={isLoading}
          />

          <DialogFooter>
            <DialogClose asChild disabled={isLoading}>
              <Button type="button" variant="outline" disabled={isLoading}>
                Huỷ
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading} className="sm:w-20">
              {isLoading ? <div className="flex items-center justify-center "><Spinner /></div> :
              initialData ? "Cập nhật" : "Tạo mới"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}