'use client'

import { Button, Card, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Spinner, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/index"
import { ProductInfoTab } from "./ProductInfoTab"
import { Resolver, useForm } from "react-hook-form";
import { ProductFormValues, productSchema, productInitialValues } from "@/schema/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilLineIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { VariantTab } from "../variant/VariantTab";
import { useProductCrud } from "@/hooks/index";
import { getProductByIdApi, mapProductToForm } from "@/services/index";
import { useQuery } from "@tanstack/react-query";

interface UpsertProductFormProps {
  mode: "create" | "edit";
  productId?: string;
}

export const UpsertProductForm = ({ mode, productId }: UpsertProductFormProps) => {
  const [activeTab, setActiveTab] = useState("basic");

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as Resolver<ProductFormValues>,
    defaultValues: productInitialValues,
  });

  const { data: product } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductByIdApi(productId!),
    enabled: mode === "edit" && !!productId,
  });

  const mutation = useProductCrud();

  const onSubmit = async (formData: ProductFormValues) => {
    if(mode === "create") {
      mutation.mutate({ 
        action: "create", 
        data: formData,
        meta: {
          successMessage: "Tạo sản phẩm thành công",
          errorMessage: "Tạo sản phẩm thất bại"
        }
      },
      {
        onSuccess: () => {
          form.reset(productInitialValues)
        },
      })
    } else {
      mutation.mutate({ 
        action: "update", 
        id: formData.id, 
        data: formData,
        meta: {
          successMessage: "Cập nhật sản phẩm thành công",
          errorMessage: "Cập nhật sản phẩm thất bại"
        }
      },{
        onSuccess: (data) => {
          form.reset(mapProductToForm(data))
        },
      })
    }
  };

  useEffect(() => {
    if (mode === "edit" && product) {
      form.reset(mapProductToForm(product));
    }
  }, [product, mode, form]);

  return (
    <Card className="p-4">
      <form id='form-product' onSubmit={form.handleSubmit(
        (data) => onSubmit(data),
        (error) => console.log("error", error)
      )}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-col justify-start gap-6">
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="view-selector" className="sr-only">
              View
            </Label>
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger
                className="flex w-fit lg:hidden"
                id="view-selector"
              >
                <SelectValue placeholder="Select a view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Thông tin</SelectItem>
                <SelectItem value="variants">Biến thể</SelectItem>
              </SelectContent>
            </Select>
            <TabsList className="hidden lg:flex">
              <TabsTrigger value="basic">Thông tin</TabsTrigger>
              <TabsTrigger value="variants">Biến thể</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Button type="submit" disabled={mutation.isPending || (mode === "edit" && !form.formState.isDirty)}>
                {mutation.isPending ? <Spinner /> :
                  mode === "edit" ? <PencilLineIcon /> : <PlusIcon />}
                {
                  mode === "edit"
                    ? "Cập nhật"
                    : "Tạo mới"
                }
              </Button>
            </div>
          </div>

          <TabsContent value="basic" className="space-y-2">
              <ProductInfoTab form={form} isLoading={mutation.isPending} />
          </TabsContent>
          <TabsContent value="variants" className="space-y-2">
              <VariantTab form={form} isLoading={mutation.isPending} />
          </TabsContent>
        </Tabs>
      </form>
    </Card>
  )
}
