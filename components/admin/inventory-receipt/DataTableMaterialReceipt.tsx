/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"

import {
  DataTableSkeleton,
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow,
  getColumnsMaterialReceipt,
} from "@/components/index"
import { useMemo, useState } from "react"
import { useFieldArray, useFormContext, useWatch } from "react-hook-form"
import { MaterialImportDetailFormValues } from "@/schema/material-receipt"
import { formatNumber } from "@/lib/index"
import { useQuery } from "@tanstack/react-query"
import { getMaterialDropdownApi } from "@/services/index"

interface DataTableMaterialReceiptProps {
  loading?: boolean
  loadingData: boolean
  disabledEdit?: boolean 
}

export function DataTableMaterialReceipt({ loading, loadingData, disabledEdit }: DataTableMaterialReceiptProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const { control, formState } = useFormContext();

  const detailsError = formState.errors.details;

  const details = useWatch({
    control,
    name: "details",
    defaultValue: [],
  });

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "details",
  });

  const { data: materialDropdown } = useQuery({
    queryKey: ["material-dropdown"],
    queryFn: getMaterialDropdownApi,
    enabled: !disabledEdit
  });

  const columns = useMemo(() => getColumnsMaterialReceipt(
    loading,
    disabledEdit,
    materialDropdown,
    control,
    (index) => remove(index),
    () => append({ materialId: "", quantity: "", unitCost: "" }),
  ), [append, control, disabledEdit, loading, materialDropdown, remove]);

  const table = useReactTable({
    data: fields as MaterialImportDetailFormValues[],
    columns,
    enableRowSelection: false,
    getRowId: (row: any) => row.id?.toString(),
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility,
    },
  })

  const totalCost = useMemo(() => {
    return (details ?? []).reduce(
      (sum: number, item: MaterialImportDetailFormValues) =>
        sum +
        Number(item.quantity ?? 0) *
        Number(item.unitCost ?? 0),
      0
    );
  }, [details]);

  return (
    <>
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className={disabledEdit ? "text-muted-foreground text-xs" : "font-medium"}>Danh sách vật liệu</div>
      </div>

      <div className="rounded-sm border mb-2">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted/50 hover:bg-muted/50">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} style={{ width: header.getSize() }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loadingData ? (
              <DataTableSkeleton columns={columns.length} rows={3} />
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-8 text-center">
                    <div className="flex flex-col items-center gap-2 py-2">
                      <p className='text-accent-foreground'>Chưa nhập vật liệu</p>
                    </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {detailsError && (
        <div role="alert" data-slot="field-error" className="text-sm font-normal text-destructive">
          {(detailsError?.message  || detailsError.root?.message) as string }
        </div>
      )}

      <div className="font-semibold flex justify-end gap-1">
        Tổng tiền:
        <span className="text-destructive">
          {formatNumber(totalCost ?? 0, {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </div>
    </>
  )
}