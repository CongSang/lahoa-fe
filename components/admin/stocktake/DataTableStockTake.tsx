/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Spinner,
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow,
  Tabs,
  TabsList,
  TabsTrigger,
  getColumnsStockTake,
} from "@/components/index"
import { useEffect, useMemo, useState } from "react"
import { useFieldArray, useFormContext, useWatch } from "react-hook-form"
import { MaterialImportDetailFormValues } from "@/schema/material-receipt"
import { useQuery } from "@tanstack/react-query"
import { getMaterialsForStocktakeApi } from "@/services/index"
import { SearchIcon } from "lucide-react"
import { StockTakeDetailFormValues } from "@/schema/index"

interface DataTableStockTakeProps {
  loading?: boolean
  loadingData: boolean
  disabledEdit?: boolean 
}

export function DataTableStockTake({ loading, loadingData, disabledEdit }: DataTableStockTakeProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const { control, formState, setValue } = useFormContext();

  const detailsError = formState.errors.details;

  const details = useWatch({
    control,
    name: "details",
    defaultValue: [],
  });

  const {
    fields,
  } = useFieldArray({
    control,
    name: "details",
  });

  const warehouseId = useWatch({
    control,
    name: "warehouseId",
  });

  const { data: materials = [], isLoading } = useQuery({
    queryKey: [
      "stocktake-materials",
      warehouseId,
    ],
    queryFn: () => getMaterialsForStocktakeApi(warehouseId!),
    enabled: !!warehouseId && !disabledEdit,
  });

  const columns = useMemo(() => getColumnsStockTake(
    loading,
    disabledEdit,
    control,
  ), [control, disabledEdit, loading]);

  const table = useReactTable({
    data: details as MaterialImportDetailFormValues[],
    columns,
    enableRowSelection: false,
    onColumnFiltersChange: setColumnFilters,
    getRowId: (row: any) => row.id?.toString(),
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnVisibility,
      columnFilters
    },
  })

  useEffect(() => {
    if (!materials?.length) return;

    setValue("details", materials);

  }, [setValue, materials]);

  return (
    <>
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className={disabledEdit ? "text-muted-foreground text-xs" : "font-medium"}>Danh sách vật liệu</div>
      </div>

      {!disabledEdit && (
        <InputGroup className="max-w-sm">
          <InputGroupInput
            placeholder="Tìm kiếm theo tên vật liệu..."
            onChange={event => table.getColumn("materialName")?.setFilterValue(event.target.value)}
            autoComplete="off"
            value={(table.getColumn("materialName")?.getFilterValue() as string) ?? ""}
          />
          <InputGroupAddon align="inline-start">
            <SearchIcon className="text-muted-foreground" />
          </InputGroupAddon>
        </InputGroup>
      )}

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
            {(isLoading || loadingData) ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-8 text-center">
                    <div className="flex flex-col items-center gap-2 py-2">
                      <Spinner />
                    </div>
                </TableCell>
              </TableRow>
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
                      <p className='text-accent-foreground'>Chưa có vật liệu nhập</p>
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
    </>
  )
}