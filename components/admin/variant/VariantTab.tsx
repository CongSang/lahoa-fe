"use client"
import { ProductFormValues, VariantFormValues } from "@/schema/index";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { DataTableVariant } from "./DataTableVariant";
import { Alert, AlertDescription, AlertTitle } from "@/components/index";
import { AlertCircleIcon } from "lucide-react";
import { UpsertVariantDialog } from "./UpsertVariantDialog";
import { useState } from "react";
import { mapFormToVariants } from "@/services/product";
import { useQuery } from "@tanstack/react-query";
import { getPropertiesApi } from "@/services/index";

interface VariantTabProps {
  form: UseFormReturn<ProductFormValues>;
  isLoading: boolean
}

export const VariantTab = ({ form, isLoading }: VariantTabProps) => {
  const [open, setOpen] = useState(false);
  const [rowEdit, setRowEdit] = useState<number | undefined>(undefined);
  const [initialData, setInitialData] = useState<Partial<VariantFormValues> | undefined>(undefined);
  
  const handleOpenDialog = (data?: Partial<VariantFormValues>, index?: number) => {
    setRowEdit(index)
    setInitialData(data)
    setOpen(true)
  }

  const variantError = form.formState.errors.variants;

  const { append, remove, update } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const { data: properties } = useQuery({
    queryKey: ["selected-properties-dropdown"],
    queryFn: () => getPropertiesApi(false),
  });
  
  const onSubmit = (data: VariantFormValues) => {
    if(rowEdit !== undefined) {
      onUpdate(data, rowEdit)
    } else {
      append({ ...data })
    }
  };

  const onDelete = (index: number) => {
    remove(index)
  };

  const onUpdate = (data: VariantFormValues, index: number) => {
    update(index, { ...data })
  }
  

  return (
    <>
      <div className="space-y-3">
        {(["too_big", "too_small", "custom"].includes(variantError?.type || "")) && (
          <Alert variant="destructive" className="w-full border-destructive/5 bg-destructive/5 text-destructive">
            <AlertCircleIcon />
            <AlertTitle>Lỗi</AlertTitle>
            <AlertDescription>
              {variantError?.message}
            </AlertDescription>
          </Alert>
        )}

        <DataTableVariant 
          data={mapFormToVariants(form.getValues("variants"), properties)} 
          handleOpenDialog={handleOpenDialog} 
          onRowDelete={onDelete} 
          onRowUpdate={onUpdate} 
        />
      </div>

      <UpsertVariantDialog 
        isLoading={isLoading}
        open={open}
        onOpenChange={setOpen}
        initialData={initialData}
        onSubmit={onSubmit}
        propertyOptions={properties}
      />
    </>
  )
}
