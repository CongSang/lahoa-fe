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
  Separator
} from "@/components/index";

import { categorySchema, CategoryFormValues, FieldConfig } from "@/schema/index";
import { Option, StatusCommon } from "@/types/index";
import { statusDropdown } from "@/lib/index";
import { PencilLineIcon, PlusIcon, WandSparkles } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

type UpsertCategoryDialogProps = {
  isLoading: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Partial<CategoryFormValues>;
  parents?: Option[];
  onSubmit: (data: CategoryFormValues) => void;
};

export function UpsertCategoryDialog({
  open,
  isLoading,
  onOpenChange,
  initialData,
  parents = [],
  onSubmit,
}: UpsertCategoryDialogProps) {
  const queryClient = useQueryClient();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema) as Resolver<CategoryFormValues>,
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

  const sectionFormConfig: FieldConfig<CategoryFormValues>[] = [
    { name: "imageUrl", type: "image", label: "Ảnh danh mục", required: true },
    { name: "name", label: "Tên danh mục", type: "text", className: "sm:col-span-6", required: true },
    { name: "status", label: "Trạng thái", type: "select", className: "sm:col-span-6", options: statusDropdown, required: true },
    { name: "parentId", label: "Danh mục cha", type: "select", placeholder: "Chọn danh mục", options: parents, className: "sm:col-span-6" },
    { name: "displayOrder", label: "TT hiển thị", type: "number", className: "sm:col-span-6" },
    { name: "path", label: "Đường dẫn", type: "text", readonly: true },
    { name: "description", label: "Mô tả", type: "textarea", placeholder: "Mô tả danh mục" },
  ];

  const sectionFormSEOConfig: FieldConfig<CategoryFormValues>[] = [
    { name: "seoTitle", label: "Tiêu đề", type: "text", placeholder: "Tiêu đề SEO", className: "sm:col-span-6" },
    { name: "seoKeywords", label: "Từ khóa", type: "text", placeholder: "Từ khóa SEO", className: "col-span-6" },
    { name: "seoDescription", label: "Mô tả", type: "textarea", placeholder: "Mô tả SEO" },
  ]

  useEffect(() => {
    if (open) {
      queryClient.invalidateQueries({ queryKey: ["category-parents"] });

      reset({
        name: "",
        imageUrl: "",
        description: "",
        status: StatusCommon.ACTIVE,
        ...initialData,
        displayOrder: initialData?.displayOrder ? String(initialData?.displayOrder) : undefined,
        parentId: initialData?.parentId ? initialData.parentId : -1 ,
      } as CategoryFormValues);
    }
  }, [open, initialData, reset, queryClient]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Cập nhật danh mục" : "Tạo danh mục"}
          </DialogTitle>
          <DialogDescription className={!initialData ? "sr-only" : ""}>
            #{initialData?.code}
          </DialogDescription>
        </DialogHeader>

        <form
          id="form-category"
          onSubmit={handleSubmit((data) => {
            onSubmit(data as CategoryFormValues);
          })}
          className="space-y-2"
        >
          <div className="-mx-4 no-scrollbar max-h-[60vh] overflow-y-auto px-4 py-1 flex flex-col gap-4">
            <FormSection<CategoryFormValues>
              form={form}
              config={sectionFormConfig}
              disabledAll={isLoading}
            />

            <Separator className="mt-2" />

            <div className="flex justify-between items-center">
              <div className="font-semibold">Thông tin SEO</div>
              <Button variant="ghost" size="xs" type="button" className="text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300">
                <WandSparkles />
                Tự động điền
              </Button>
            </div>

            <FormSection<CategoryFormValues>
              form={form}
              config={sectionFormSEOConfig}
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