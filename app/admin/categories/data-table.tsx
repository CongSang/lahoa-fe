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
  Field,
  FieldLabel,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TooltipRender, 
  DropdownStatus, 
  DataTableViewOptions, 
  DataTablePagination
} from "@/components/index"
import { useMemo, useState } from "react"
import { Download, ListFilter, Search, Upload } from "lucide-react"
import { Category, CategoryFilterRequest, StatusCommon } from "@/types/index"
import { statusDropdown } from "@/lib/index"
import { useQuery } from "@tanstack/react-query"
import { getCategoriesApi, getDropdownParentApi } from "@/services/index"
import { useDataTable } from "@/hooks/index"
import { Controller } from "react-hook-form"
import { getColumns } from "./columns"

export function DataTable() {
  const [columnVisibility, setColumnVisibility] =useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: apiResponse, tableState, form, isLoading } = useDataTable<Category, CategoryFilterRequest>(
    "categories", 
    getCategoriesApi, 
    {
      defaultFilter: { 
        keyword: "",
        status: null,
        parentId: null,
      }
    }
  )

  const columns = useMemo(() => getColumns(
    (cat) => console.log("Edit", cat),
    (cat) => console.log("Delete", cat)
  ), []);

  const data = useMemo(() => {
    return apiResponse?.content ?? [];
  }, [apiResponse?.content]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: data || [],
    columns,
    pageCount: apiResponse?.totalPages || 0,
    manualPagination: true, 
    manualSorting: true, 
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

  const { data: parents } = useQuery({
    queryKey: ["category-parents"],
    queryFn: getDropdownParentApi,
  });

  const handleSearch = () => {
    setIsFilterOpen(false)
    setTimeout(() => {
      form.handleSubmit(form.onSubmit)()
    }, 210)
  }

  const handleReset = () => {
    setIsFilterOpen(false)
    setTimeout(() => {
      form.onReset()
    }, 210)
  }

  return (
    <Card className="shadow p-4 gap-3">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-2 max-w-2xl">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              {...form.register("keyword")}
              name="keyword"
              placeholder="Nhập từ khóa..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
              className="pl-7.5"
            />
          </div>

          <Button 
            variant="outline" 
            onClick={() => setIsFilterOpen(true)}
          >
            <ListFilter />
            Bộ lọc
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <DataTableViewOptions table={table} />
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
          <FieldLabel>Trạng thái</FieldLabel>
          <Controller
            control={form.control}
            name="status"
            render={({ field }) => (
              <DropdownStatus 
                items={statusDropdown} 
                value={field.value ?? StatusCommon.ALL}
                onChange={(val) => field.onChange(
                  val === StatusCommon.ALL ? null : val
                )} 
              />
            )}
        />
        </Field>
        <Field>
          <FieldLabel>Danh mục cha</FieldLabel>
          <Controller
            control={form.control}
            name="parentId"
            render={({ field }) => (
              <Select
                value={field.value?.toString() ?? "ALL"}
                onValueChange={(val) => field.onChange(
                  val === "ALL" ? null : Number(val)
                )}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ALL">Tất cả</SelectItem>
                    <SelectItem value="-1">Danh mục gốc</SelectItem>
                    {parents?.map((p: Category) => (
                      <SelectItem key={p.id} value={p.id.toString()}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </Field>
      </DataTableFilterSheet>

      <DataTableCommon 
        table={table} 
        columns={columns}
        isFiltering={tableState.isFiltering}
        emptyLabel="Chưa có Danh mục nào"
        isLoading={isLoading} 
        onReset={handleReset} 
      />

      <div className="flex-1 text-sm text-muted-foreground">
        Đã chọn <span className="font-semibold text-accent-foreground">
          {table.getFilteredSelectedRowModel().rows.length}/{" "}
          {apiResponse?.totalElements || 0}
        </span> danh mục.
      </div>

      <DataTablePagination table={table} prefetchNextPage={tableState.prefetchNextPage} />
    </Card>
  )
}