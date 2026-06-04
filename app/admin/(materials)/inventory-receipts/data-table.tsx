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
  SelectCustom,
  DatePicker,
} from "@/components/index"
import { useMemo, useState } from "react"
import { Download, ListFilter, RefreshCcw, SearchIcon, Upload } from "lucide-react"
import { InventoryReceipt, InventoryReceiptFilterRequest, MATERIAL_CATEGORY_FIELD } from "@/types/index"
import { getMaterialCategoryDropdownApi, getMaterialReceiptsApi, getWarehouseDropdownApi } from "@/services/index"
import { useDataTable } from "@/hooks/index"
import { getColumns } from "./columns"
import { MaterialImportFormValues } from "@/schema/index"
import { useQuery } from "@tanstack/react-query"
import { Controller } from "react-hook-form"
import { getDateRangeValue, setDateRangeValue } from "@/lib/index"

interface DataTableProps {
  handleOpenDialog: (data?: Partial<MaterialImportFormValues>) => void
}

export function DataTable({ handleOpenDialog }: DataTableProps) {
  const [columnVisibility, setColumnVisibility] =useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: apiResponse, tableState, form, isLoading } = useDataTable<InventoryReceipt, InventoryReceiptFilterRequest>(
    "material-receipts", 
    getMaterialReceiptsApi, 
    {
      defaultFilter: { 
        keyword: "",
        categoryId: undefined,
        warehouseId: undefined,
        fromDate: "",
        toDate: "",
      }
    }
  )

  const columns = useMemo(() => getColumns(
    (receipt) => handleOpenDialog({ id: receipt.id })
  ), [handleOpenDialog]);

  const data = useMemo(() => {
    return apiResponse?.content ?? [];
  }, [apiResponse?.content]);

  const table = useReactTable({
    data: data || [],
    columns,
    pageCount: apiResponse?.totalPages || 0,
    rowCount: apiResponse?.totalElements || 0,
    manualPagination: true, 
    manualSorting: true, 
    getRowId: row => row.id.toString(),
    onPaginationChange: tableState.setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onSortingChange: tableState.setSorting,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting: tableState.sorting,
      columnVisibility,
      rowSelection,
      pagination: tableState.pagination
    },
  })

  const { data: categoryDropdown } = useQuery({
    queryKey: ["material-category-dropdown"],
    queryFn: getMaterialCategoryDropdownApi,
  });

  const { data: warehouseDropdown } = useQuery({
    queryKey: ["warehouse-dropdown"],
    queryFn: getWarehouseDropdownApi,
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
            <DataTableViewOptions table={table} fieldName={MATERIAL_CATEGORY_FIELD} />
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
            <FieldLabel>Danh mục vật liệu</FieldLabel>
            <Controller
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <SelectCustom
                  selection="single"
                  options={categoryDropdown}
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
          emptyLabel="Chưa có hóa đơn vật liệu nào"
          isLoading={isLoading} 
          onReset={handleReset}
          handleOpenDialog={handleOpenDialog}
        />

        <div className="flex-1 text-sm text-muted-foreground">
          Đã chọn <span className="font-semibold text-accent-foreground">
            {Object.keys(rowSelection).length}/{" "}
            {table.getRowCount()}
          </span> hóa đơn.
        </div>

        <DataTablePagination table={table} prefetchNextPage={tableState.prefetchNextPage} />
      </Card>
    </>
  )
}