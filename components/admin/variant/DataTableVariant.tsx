"use client"

import {
  getCoreRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"

import {
  AlertDialogConfirm,
  Button,
  DataTableCommon,
  DataTableViewOptions,
} from "@/components/index"
import { useMemo, useState } from "react"
import { AlertDialog, Variant, VARIANT_FIELD } from "@/types/index"
import { getColumnsVariant } from "./ColumnsVariant"
import { VariantFormValues } from "@/schema/index"
import { Plus } from "lucide-react"
import { mapVariantToForm } from "@/services/index"

interface DataTableProps {
  handleOpenDialog: (data?: Partial<VariantFormValues>, index?: number) => void
  onRowDelete: (index: number) => void
  onRowUpdate: (data: VariantFormValues, index: number) => void
  data: Variant[]
}

export function DataTableVariant({ data, handleOpenDialog, onRowDelete, onRowUpdate }: DataTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [alert, setAlert] = useState<AlertDialog<number>>({
    type: "delete",
    open: false,
    title: "",
    description: "",
    item: null
  });

  const handleDelete = (variant: Variant, index: number) => {
    setAlert({ 
      type: "delete", 
      item: index, 
      title: "Xóa biến thể?", 
      description: `Bạn có chắc chắn xóa biến thể ${variant.sku}.${" "}
                    Thay đổi chỉ được lưu khi nhấn tạo hoặc cập nhật sản phẩm.`,
      open: true, 
    })
  }

  const columns = useMemo(() => getColumnsVariant(
    (variant, index) => onRowUpdate(mapVariantToForm(variant), index),
    (variant, index) => handleOpenDialog(mapVariantToForm(variant), index),
    (variant, index) => variant.id ? handleDelete(variant, index) : onRowDelete(index)
  ), [handleOpenDialog, onRowDelete, onRowUpdate]);

  const table = useReactTable({
    data: data || [],
    columns,
    enableRowSelection: false,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility,
    },
  })

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <div className="font-semibold">Biến thể sản phẩm</div>

        <div className="flex items-center justify-start gap-2">
          <DataTableViewOptions table={table} fieldName={VARIANT_FIELD} />
          <Button 
            type="button" 
            variant="outline" 
            size="icon" 
            disabled={data?.length >= 3}
            onClick={() => handleOpenDialog()}
          >
            <Plus />
          </Button>
        </div>
      </div>

      <DataTableCommon 
        table={table} 
        columns={columns}
        isLoading={false}
        hideImportExcel
        isFiltering={() => data?.length ? true : false}
        emptyLabel="Chưa có biến thể nào"
        onReset={() => {}}
        handleOpenDialog={handleOpenDialog}
      />

      <AlertDialogConfirm
        type={alert.type}
        isLoading={false}
        open={alert.open} 
        setOpen={(open) => setAlert({ ...alert, open })} 
        onConfirm={() => {
          if (alert.item) {
            if (alert.type === "delete") onRowDelete(alert.item)
          }
        }}
        title={alert.title}
        description={alert.description}
      />
    </>
  )
}