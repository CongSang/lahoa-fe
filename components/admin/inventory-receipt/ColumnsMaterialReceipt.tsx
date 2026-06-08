"use client"

import { Badge, Button, Field, FieldError, InputNumber, SelectCustom } from "@/components/index"
import { formatNumber } from "@/lib/number-format"
import { MaterialImportDetailFormValues } from "@/schema/index"
import { INVENTORY_RECEIPT_DETAIL_FIELD, Option, StatusCommon } from "@/types/index"
import { ColumnDef } from "@tanstack/react-table"
import { PlusCircleIcon, Trash } from "lucide-react"
import { Control, Controller } from "react-hook-form"

export const getColumnsMaterialReceipt = (
  loading?: boolean,
  disableEdit?: boolean,
  materialDropdown?: Option[],
  control?: Control,
  onDelete?: (index: number) => void,
  onAppend?: () => void
): ColumnDef<MaterialImportDetailFormValues>[] => [
  {
    size: 400,
    accessorKey: "materialId",
    header: () => (
      <div>Vật liệu</div>
    ),
    cell: ({ row }) => {
      if (!disableEdit) {
        return (
          <Controller
            control={control}
            name={`details.${row.index}.materialId`}
            render={({ field, fieldState }) => (
              <Field>
                <SelectCustom
                  aria-invalid={fieldState.invalid}
                  selection="single"
                  options={materialDropdown}
                  value={field.value || ""}
                  fieldValue="id"
                  onChange={field.onChange}
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
        const receipt = row.original

        return <div className="flex items-center gap-2">
          {receipt.materialName}
          {receipt.materialStatus === StatusCommon.DELETED && (
            <Badge variant="destructive">Ngừng kinh doanh</Badge>
          )}
        </div>
      }
    }
  },
  {
    size: 200,
    accessorKey: "quantity",
    header: ({ column }) => (
      <div className="text-right">{INVENTORY_RECEIPT_DETAIL_FIELD[column.id]}</div>
    ),
    cell: ({ row }) => {
      if (!disableEdit) {
        return (
          <Controller
            control={control}
            name={`details.${row.index}.quantity`}
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
        return <div className="text-right">{row.original.quantity}</div>
      }
    }
  },
  {
    size: 200,
    accessorKey: "unitCost",
    header: ({ column }) => (
      <div className="text-right">{INVENTORY_RECEIPT_DETAIL_FIELD[column.id]}</div>
    ),
    cell: ({ row }) => {
      if (!disableEdit) {
        return (
          <Controller
            control={control}
            name={`details.${row.index}.unitCost`}
            render={({ field, fieldState }) => (
              <Field>
                <InputNumber
                  {...field}
                  aria-invalid={fieldState.invalid}
                  value={field.value}
                  onChange={field.onChange}
                  format="currency"
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
        return <div className="text-right">{formatNumber(row.original.unitCost ?? 0, {
            style: "currency",
            currency: "VND",
          })}</div>
      }
    }
  },
  {
    size: 300,
    accessorKey: "subtotal",
    header: ({ column }) => (
      <div className="text-right">{INVENTORY_RECEIPT_DETAIL_FIELD[column.id]}</div>
    ),
    cell: ({ row }) => {
      if (!disableEdit) {
        const rowData = control ? control._getWatch(`details.${row.index}`) : null;

        const quantity = Number(
          rowData.quantity ?? 0
        );

        const unitCost = Number(
          rowData.unitCost ?? 0
        );

        return <div className="text-right">
          {formatNumber(
            quantity * unitCost,
            {
              style: "currency",
              currency: "VND",
            }
          )}
        </div>
      } else {
        return <div className="text-right">{formatNumber(row.original.subtotal ?? 0, {
          style: "currency",
          currency: "VND",
        })}</div>
      }
    }
  },
  {
    size: 50,
    id: "actions",
    header: () => {
      if(!disableEdit) {
        return (
          <Button
            type="button"
            variant="ghost"
            className="text-green-700 dark:text-green-300"
            size="icon-sm"
            onClick={() => onAppend?.()}
          >
            <PlusCircleIcon />
          </Button>
        )
      }
    },
    cell: ({ row }) => {
      if(!disableEdit) {
        return (
          <Button
            type="button"
            variant="ghost"
            className="text-destructive"
            size="icon-sm"
            onClick={() => onDelete?.(row.index)}
          >
            <Trash />
          </Button>
        )
      }
    },
  }
]