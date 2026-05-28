/* eslint-disable @typescript-eslint/no-explicit-any */
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
  TooltipRender, 
  DropdownStatus, 
  DataTableViewOptions, 
  DataTablePagination,
  AlertDialogConfirm,
  SelectCustom,
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputNumber,
} from "@/components/index"
import { useMemo, useState } from "react"
import { Download, ListFilter, RefreshCcw, SearchIcon, Upload } from "lucide-react"
import { AlertDialog, Product, PRODUCT_FIELD, ProductFilterRequest, Property, StatusCommon } from "@/types/index"
import { statusFilterDropdown } from "@/lib/index"
import { useQuery } from "@tanstack/react-query"
import { getDropdownCategoryApi, getProductsApi, mapProductToForm } from "@/services/index"
import { useDataTable } from "@/hooks/index"
import { Controller } from "react-hook-form"
import { getColumns } from "./columns"
import { ProductFormValues } from "@/schema/index"
import { useProductCrud } from "@/hooks/index"
import { getPropertiesApi } from "@/services/index"

interface DataTableProps {
  handleOpenDialog: (data?: Partial<ProductFormValues>) => void
}

export function DataTable({ handleOpenDialog }: DataTableProps) {
  const [columnVisibility, setColumnVisibility] =useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [alert, setAlert] = useState<AlertDialog<Product>>({
    type: "delete",
    open: false,
    title: "",
    description: "",
    item: null
  });

  const { data: apiResponse, tableState, form, isLoading } = useDataTable<Product, ProductFilterRequest>(
    "products", 
    getProductsApi, 
    {
      defaultFilter: { 
        keyword: "",
        status: null,
        categoryId: null,
        minPrice: "",
        maxPrice: "",
        propertyValueIds: {},
      }
    }
  )

  const mutation = useProductCrud();

  const onDelete = async (id: number | string) => {
    mutation.mutate({ 
      action: "delete", 
      id: id, 
      meta: {
        successMessage: "Xóa sản phẩm thành công",
        errorMessage: "Xóa sản phẩm thất bại"
      }
    },{
      onSuccess: () => {
        setAlert({ ...alert, open: false })
      },
      onError: () => {       
        setAlert({ ...alert, open: false })
      },
    })
  }

  const onRestore = async (id: number | string) => {
    mutation.mutate({ 
      action: "restore", 
      id: id, 
      meta: {
        successMessage: "Khôi phục sản phẩm thành công",
        errorMessage: "Khôi phục sản phẩm thất bại"
      }
    },{
      onSuccess: () => {
        setAlert({ ...alert, open: false })
      },
      onError: () => {       
        setAlert({ ...alert, open: false })
      },
    })
  }

  const handleDelete = (product: Product) => {
    setAlert({ 
      type: "delete", 
      item: product, 
      title: "Xóa sản phẩm?", 
      description: `Bạn có chắc chắn xóa sản phẩm ${product.name}.${" "}
      Khi bạn xóa sản phẩm này các biến thể của sản phẩm cũng sẽ bị xóa.`,
      open: true, 
    })
  }

  const handleRestore = (product: Product) => {
    setAlert({ 
      type: "info", 
      item: product, 
      title: "Khôi phục sản phẩm?", 
      description: `Bạn có chắc chắn khôi phục sản phẩm ${product.name}.`,
      open: true, 
    })
  }

  const columns = useMemo(() => getColumns(
    (product) => handleOpenDialog(mapProductToForm(product)),
    (product) => handleDelete(product),
    (product) => handleRestore(product)
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

  const { data: productProperties } = useQuery({
    queryKey: ["filtered-properties-dropdown"],
    queryFn: () => getPropertiesApi(true),
  });

  const { data: categories } = useQuery({
    queryKey: ["categories-dropdown"],
    queryFn: getDropdownCategoryApi,
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
                className="pl-7.5"
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
            <DataTableViewOptions table={table} fieldName={PRODUCT_FIELD} />
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
                  items={statusFilterDropdown} 
                  value={field.value ?? StatusCommon.ALL}
                  onChange={(val) => field.onChange(
                    val === StatusCommon.ALL ? null : val
                  )} 
                />
              )}
          />
          </Field>

          <Field>
            <FieldLabel>Danh mục</FieldLabel>
            <Controller
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <SelectCustom
                  selection="single"
                  hasGroups
                  groupOptions={categories}
                  value={String(field.value)}
                  fieldValue="id"
                  onChange={(val) => {
                    field.onChange(val)
                  }}
                />
              )}
            />
          </Field>

          <div className="flex items-center justify-start gap-2">
            <Field>
              <FieldLabel>Giá tối thiểu</FieldLabel>
              <Controller
                control={form.control}
                name="minPrice"
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                    format="currency"
                    id={field.name}
                    autoComplete="off"
                    placeholder="0"
                  />
                )}
              />
            </Field>

            <span className="mt-6">-</span>

            <Field>
              <FieldLabel>Giá tối đa</FieldLabel>
              <Controller
                control={form.control}
                name="maxPrice"
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                    format="currency"
                    id={field.name}
                    autoComplete="off"
                    placeholder="0"
                  />
                )}
              />
            </Field>
          </div>

          {productProperties && productProperties.length > 0 && productProperties.map((property: Property) => (
            <Field key={property.id}>
              <FieldLabel>{property.name}</FieldLabel>
              <Controller
                control={form.control}
                name={`propertyValueIds.p_${property.id}` as any}
                render={({ field }) => (
                  <SelectCustom
                    selection="multiple"
                    options={property.values}
                    value={field.value}
                    fieldValue="id"
                    onChange={(val) => {
                      const current = form.getValues("propertyValueIds") || {}

                      form.setValue("propertyValueIds", {
                        ...current,
                        [`p_${property.id}`]: val
                      } as Record<string, string[]>)
                    }}
                  />
                )}
              />
            </Field>
          ))}
        </DataTableFilterSheet>

        <DataTableCommon 
          table={table} 
          columns={columns}
          isFiltering={tableState.isFiltering}
          emptyLabel="Chưa có sản phẩm nào"
          isLoading={isLoading} 
          onReset={handleReset}
          handleOpenDialog={handleOpenDialog}
        />

        <div className="flex-1 text-sm text-muted-foreground">
          Đã chọn <span className="font-semibold text-accent-foreground">
            {Object.keys(rowSelection).length}/{" "}
            {table.getRowCount()}
          </span> sản phẩm.
        </div>

        <DataTablePagination table={table} prefetchNextPage={tableState.prefetchNextPage} />
      </Card>

      <AlertDialogConfirm
        type={alert.type}
        isLoading={mutation.isPending}
        open={alert.open} 
        setOpen={(open) => setAlert({ ...alert, open })} 
        onConfirm={() => {
          if (alert.item) {
            if (alert.type === "delete") onDelete(alert.item.id)
            else onRestore(alert.item.id)
          }
        }}
        title={alert.title}
        description={alert.description}
      />
    </>
  )
}