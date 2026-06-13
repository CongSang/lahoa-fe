"use client"

import {
  getCoreRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"

import {
  Button,
  Card,
  DataTableCommon,
  DataTableFilterSheet,
  TooltipRender,
  DataTableViewOptions, 
  DataTablePagination,
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  Field,
  FieldLabel,
  DatePicker,
  SelectCustom,
  InventoryLogDetailDialog
} from "@/components/index"
import { useMemo, useState } from "react"
import { Download, ListFilter, RefreshCcw, SearchIcon, Upload } from "lucide-react"
import { InventoryLog, InventoryLogFilterRequest, INVENTORY_LOG_FIELD, INVENTORY_MOVEMENT_TYPE_OPTIONS, INVENTORY_REFERENCE_TYPE_OPTIONS } from "@/types/index"
import { getInventoryLogsApi, getMaterialDropdownApi, getWarehouseDropdownApi } from "@/services/index"
import { useDataTable } from "@/hooks/index"
import { getColumns } from "./columns"
import { getDateRangeValue, setDateRangeValue } from "@/lib/index"
import { Controller } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"

interface DataTableProps {
  initialData?: Partial<InventoryLog>
  openDialog: boolean
  setOpenDialog: (value: boolean) => void
  handleOpenDialog: (data?: Partial<InventoryLog>) => void
}

export function DataTable({ openDialog, setOpenDialog, initialData, handleOpenDialog }: DataTableProps) {
  const [columnVisibility, setColumnVisibility] =useState<VisibilityState>({})
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: apiResponse, tableState, form, isLoading } = useDataTable<InventoryLog, InventoryLogFilterRequest>(
    "inventory-logs", 
    getInventoryLogsApi, 
    {
      defaultFilter: { 
        keyword: "",
        materialId: undefined,
        warehouseId: undefined,
        type: undefined,
        referenceType: undefined,
        fromDate: "",
        toDate: ""
      }
    }
  )

  const columns = useMemo(() => getColumns(
    (audit) => handleOpenDialog(audit)
  ), [handleOpenDialog]);

  const data = useMemo(() => {
    return apiResponse?.content ?? [];
  }, [apiResponse?.content]);

  const table = useReactTable({
    data: data || [],
    columns,
    enableRowSelection: false,
    pageCount: apiResponse?.totalPages || 0,
    rowCount: apiResponse?.totalElements || 0,
    manualPagination: true, 
    manualSorting: true, 
    onPaginationChange: tableState.setPagination,
    onSortingChange: tableState.setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting: tableState.sorting,
      columnVisibility,
      pagination: tableState.pagination
    },
  })

  const { data: warehouseDropdown } = useQuery({
    queryKey: ["warehouse-dropdown"],
    queryFn: getWarehouseDropdownApi,
  });

  const { data: materialDropdown } = useQuery({
    queryKey: ["material-dropdown"],
    queryFn: getMaterialDropdownApi,
  });

  const handleSearch = () => {
    setIsFilterOpen(false)
    setTimeout(() => {
      form.handleSubmit(form.onSubmit)()
    }, 250)
  }

  const handleReset = () => {
    setIsFilterOpen(false)
    setTimeout(() => {
      form.onReset()
    }, 250)
  }

  return (
    <>
      <Card className="p-4 gap-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-2 max-w-2xl">
            <InputGroup className="max-w-sm">
              <InputGroupInput
                {...form.register("keyword")}
                name="keyword"
                placeholder="Nhập từ khóa..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch();
                }}
                autoComplete="off"
              />
              <InputGroupAddon align="inline-start">
                <SearchIcon className="text-muted-foreground" />
              </InputGroupAddon>
            </InputGroup>

            <Button 
              variant="outline" 
              onClick={() => setIsFilterOpen(true)}
            >
              <ListFilter />
              Bộ lọc
            </Button>
            <TooltipRender tooltip="Làm mới">
              <Button variant="outline" size="icon" onClick={handleReset}>
                <RefreshCcw />
              </Button>
            </TooltipRender>
          </div>

          <div className="flex items-center gap-2">
            <DataTableViewOptions table={table} fieldName={INVENTORY_LOG_FIELD} />
            <TooltipRender tooltip="Xuất Excel">
              <Button variant="outline" size="icon">
                <Upload />
              </Button>
            </TooltipRender>
            <TooltipRender tooltip="Nhập Excel">
              <Button variant="outline" size="icon">
                <Download />
              </Button>
            </TooltipRender>
          </div>
        </div>

        <DataTableFilterSheet
          isOpen={isFilterOpen}
          onOpenChange={setIsFilterOpen}
          onReset={handleReset}
          onApply={handleSearch}
        >
          <Field>
            <FieldLabel>Từ ngày - Đến ngày</FieldLabel>
            <DatePicker 
              mode="range"
              value={getDateRangeValue(
                form,
                {
                  from: "fromDate",
                  to: "toDate"
                }, 
              )}
              onChange={(range) => 
                setDateRangeValue(
                  form, 
                  {
                    from: "fromDate",
                    to: "toDate"
                  }, 
                  range
                )}
              numberOfMonths={2}
              captionLayout="dropdown"
              disableFuture
            />
          </Field>
          <Field>
            <FieldLabel>Loại biến động</FieldLabel>
            <Controller
              control={form.control}
              name="type"
              render={({ field }) => (
                <SelectCustom
                  selection="single"
                  options={INVENTORY_MOVEMENT_TYPE_OPTIONS}
                  value={String(field.value || "")}
                  onChange={field.onChange}
                />
              )}
            />
          </Field>
          <Field>
            <FieldLabel>Loại chứng từ</FieldLabel>
            <Controller
              control={form.control}
              name="referenceType"
              render={({ field }) => (
                <SelectCustom
                  selection="single"
                  options={INVENTORY_REFERENCE_TYPE_OPTIONS}
                  value={String(field.value || "")}
                  onChange={field.onChange}
                />
              )}
            />
          </Field>
          <Field>
            <FieldLabel>Vật liệu</FieldLabel>
            <Controller
              control={form.control}
              name="materialId"
              render={({ field }) => (
                <SelectCustom
                  selection="single"
                  options={materialDropdown}
                  value={field.value || ""}
                  fieldValue="id"
                  onChange={field.onChange}
                />
              )}
            />
          </Field>
          <Field>
            <FieldLabel>Kho</FieldLabel>
            <Controller
              control={form.control}
              name="warehouseId"
              render={({ field }) => (
                <SelectCustom
                  selection="single"
                  options={warehouseDropdown}
                  value={field.value || ""}
                  fieldValue="id"
                  onChange={field.onChange}
                />
              )}
            />
          </Field>
        </DataTableFilterSheet>

        <DataTableCommon 
          table={table} 
          columns={columns}
          isFiltering={tableState.isFiltering}
          emptyLabel="Chưa có biến động nào"
          hideEmptyAction
          isLoading={isLoading} 
          onReset={handleReset}
          handleOpenDialog={handleOpenDialog}
        />

        <DataTablePagination table={table} prefetchNextPage={tableState.prefetchNextPage} />
      </Card>

      <InventoryLogDetailDialog 
        open={openDialog}
        onOpenChange={setOpenDialog}
        inventory={initialData}
      />
    </>
  )
}