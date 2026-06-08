"use client"

import { Badge, Field, FieldError, InputNumber } from "@/components/index"
import { StockTakeDetailFormValues } from "@/schema/index"
import { MATERIAL_UNIT_LABEL, STOCK_TAKE_DETAIL_FIELD, StatusCommon } from "@/types/index"
import { ColumnDef } from "@tanstack/react-table"
import { Control, Controller } from "react-hook-form"
import { InventoryDifferenceBadge } from "./InventoryDifferenceBadge"

export const getColumnsStockTake = (
  loading?: boolean,
  disableEdit?: boolean,
  control?: Control,
): ColumnDef<StockTakeDetailFormValues>[] => [
  {
    size: 300,
    accessorKey: "materialName",
    header: () => (
      <div>Vật liệu</div>
    ),
    cell: ({ row }) => {
      const receipt = row.original

      return <div className="flex items-center gap-2">
        {receipt.materialName}
        {receipt.materialStatus === StatusCommon.DELETED && (
          <Badge variant="destructive">Ngừng kinh doanh</Badge>
        )}
      </div>
    }
  },
  {
    size: 50,
    accessorKey: "unit",
    header: ({ column }) => (
      <div className="text-right">{STOCK_TAKE_DETAIL_FIELD[column.id]}</div>
    ),
    cell: ({ row }) =>
      <div className="text-right">
        {row.original?.unit ? MATERIAL_UNIT_LABEL[row.original?.unit] : ""}
      </div>
  },
  {
    size: 200,
    accessorKey: "systemQty",
    header: ({ column }) => (
      <div className="text-right">{STOCK_TAKE_DETAIL_FIELD[column.id]}</div>
    ),
    cell: ({ row }) =>
      <div className="text-right">
        {row.original.systemQty || 0}
      </div>
  },
  {
    size: 200,
    accessorKey: "actualQty",
    header: ({ column }) => (
      <div className="text-right">{STOCK_TAKE_DETAIL_FIELD[column.id]}</div>
    ),
    cell: ({ row }) => {
      if (!disableEdit) {
        return (
          <Controller
            control={control}
            name={`details.${row.index}.actualQty`}
            render={({ field, fieldState }) => (
              <Field className="w-25 ml-auto">
                <InputNumber
                  {...field}
                  aria-invalid={fieldState.invalid}
                  value={field.value}
                  onChange={field.onChange}
                  format="decimal"
                  id={field.name}
                  autoComplete="off"
                  placeholder="0"
                  className="text-right w-25"
                  disabled={loading}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        )
      } else {
        return <div className="text-right">
          {row.original.actualQty || 0}
        </div>
      }
    }
  },
  {
    size: 200,
    accessorKey: "difference",
    header: ({ column }) => (
      <div className="text-right">{STOCK_TAKE_DETAIL_FIELD[column.id]}</div>
    ),
    cell: ({ row }) => {
      if (!disableEdit) {
        const rowData = row.original;

        const actualQty = Number(
          rowData.actualQty ?? 0
        );

        const systemQty = Number(
          rowData.systemQty ?? 0
        );

        return <div className="text-right">
          <InventoryDifferenceBadge value={actualQty - systemQty} />
        </div>
      } else {
        return <div className="text-right">
          <InventoryDifferenceBadge value={Number(row.original.difference) || 0} />
        </div>
      }
    }
  },
]