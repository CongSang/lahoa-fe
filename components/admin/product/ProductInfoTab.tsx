'use client'

import { Button, FormSection, Separator } from "@/components/index"
import { productStatusDropdown } from "@/lib/status";
import { FieldConfig, ProductFormValues } from "@/schema/index";
import { getDropdownCategoryApi, getPropertiesApi } from "@/services/index";
import { useQuery } from "@tanstack/react-query";
import { WandSparkles } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface ProductInfoTabProps {
  form: UseFormReturn<ProductFormValues>;
  isLoading?: boolean
}

export function ProductInfoTab({ form, isLoading }: ProductInfoTabProps) {
  const { data: categories } = useQuery({
    queryKey: ["categories-dropdown"],
    queryFn: getDropdownCategoryApi,
  });

  const { data: properties } = useQuery({
    queryKey: ["filtered-properties-dropdown"],
    queryFn: () => getPropertiesApi(true),
  });

  const sectionInfoConfig: FieldConfig<ProductFormValues>[] = [
    { name: "imageUrl", label: "Ảnh sản phẩm", type: "image-square", required: true },
    { name: "name", label: "Tên sản phẩm", type: "text", className: "sm:col-span-6 lg:col-span-3", required: true },
    { name: "basePrice", label: "Giá cơ bản", type: "price", className: "sm:col-span-6 lg:col-span-3", required: true },
    { name: "primaryCategoryId", label: "Danh mục chính", type: "group-select-command", 
      selection: "single", className: "sm:col-span-6 lg:col-span-3", options: categories, required: true },
    { name: "categoryIds", label: "Danh mục", type: "group-select-command", 
      selection: "multiple", className: "sm:col-span-6 lg:col-span-3", options: categories, required: true },
    { name: "propertyValueIds", label: "Thuộc tính", type: "group-select-command", 
      selection: "multiple", className: "sm:col-span-6 lg:col-span-3", options: properties, required: true },
    { name: "status", label: "Trạng thái", type: "select", className: "sm:col-span-6 lg:col-span-3", options: productStatusDropdown, required: true },
    { name: "displayOrder", label: "TT hiển thị", type: "number", className: "sm:col-span-6 lg:col-span-3" },
    { name: "slug", label: "Đường dẫn", type: "text", className: "sm:col-span-6 lg:col-span-3", readonly: true },
    { name: "description", label: "Mô tả", type: "textarea", placeholder: "Mô tả sản phẩm" },
  ]

  const sectionSEOConfig: FieldConfig<ProductFormValues>[] = [
    { name: "seoTitle", label: "Tiêu đề", type: "text", placeholder: "Tiêu đề SEO", className: "col-span-6" },
    { name: "seoKeywords", label: "Từ khóa", type: "text", placeholder: "Từ khóa SEO", className: "col-span-6" },
    { name: "seoDescription", label: "Mô tả", type: "textarea", placeholder: "Mô tả SEO" },
  ]

  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-12 lg:col-span-full flex flex-col gap-4">
        <FormSection<ProductFormValues>
          form={form}
          config={sectionInfoConfig}
          disabledAll={isLoading}
        />

        <Separator />
      </div>

      <div className="col-span-12 lg:col-span-full">
        <div className="flex justify-between items-center mb-2">
          <div className="font-semibold">Thông tin SEO</div>
          <Button 
            variant="ghost" 
            size="xs" 
            type="button" 
            className="text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
            disabled={isLoading}
          >
            <WandSparkles />
            Tự động điền
          </Button>
        </div>

        <FormSection<ProductFormValues>
          form={form}
          config={sectionSEOConfig}
          disabledAll={isLoading}
        />
      </div>
    </div>
  )
}
