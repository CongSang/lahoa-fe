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
  TooltipRender, 
  DropdownStatus, 
  DataTableViewOptions, 
  DataTablePagination,
  AlertDialogConfirm
} from "@/components/index"
import { useMemo, useState } from "react"
import { Download, ListFilter, RefreshCcw, Search, Upload } from "lucide-react"
import { AlertDialog, Product, ProductFilterRequest, StatusCommon } from "@/types/index"
import { statusFilterDropdown } from "@/lib/index"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getProductsApi } from "@/services/index"
import { useDataTable } from "@/hooks/index"
import { Controller } from "react-hook-form"
import { getColumns } from "./columns"
import { ProductFormValues } from "@/schema/index"
import { useProductCrud } from "@/hooks/form-submit/useProductMutation"
import { getPropertiesApi } from "@/services/index"

interface DataTableProps {
  initialData?: Partial<ProductFormValues>
  openDialog: boolean
  setOpenDialog: (value: boolean) => void
  handleOpenDialog: (data?: Partial<ProductFormValues>) => void
}

export function DataTable({ openDialog, setOpenDialog, initialData, handleOpenDialog }: DataTableProps) {
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
  const queryClient = useQueryClient();

  const { data: apiResponse, tableState, form, isLoading } = useDataTable<Product, ProductFilterRequest>(
    "products", 
    getProductsApi, 
    {
      defaultFilter: { 
        keyword: "",
        status: null,
        categoryId: null,
        minPrice: null,
        maxPrice: null,
        propertyValueIds: null,
      }
    }
  )

  const mutation = useProductCrud();

  const onSubmit = async (formData: ProductFormValues) => {
    if(!formData.id) {
      mutation.mutate({ 
        action: "create", 
        data: formData,
        meta: {
          successMessage: "Tạo sản phẩm thành công",
          errorMessage: "Tạo sản phẩm thất bại"
        }
      },
      {
        onSuccess: () => {
          setTimeout(() => setOpenDialog(false), 300);
        },
        onError: () => {
          setOpenDialog(true);
        },
      })
    } else {
      mutation.mutate({ 
        action: "update", 
        id: formData.id, 
        data: formData,
        meta: {
          successMessage: "Cập nhật sản phẩm thành công",
          errorMessage: "Cập nhật sản phẩm thất bại"
        }
      },{
        onSuccess: () => {
          setTimeout(() => setOpenDialog(false), 300);
        },
        onError: () => {
          setOpenDialog(true);
        },
      })
    }
  };

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
    (product) => handleOpenDialog(product as ProductFormValues),
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

  const { data: properties } = useQuery({
    queryKey: ["properties"],
    queryFn: getPropertiesApi,
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
    <>
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
                autoComplete="off"
              />
            </div>

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
                  items={statusFilterDropdown} 
                  value={field.value ?? StatusCommon.ALL}
                  onChange={(val) => field.onChange(
                    val === StatusCommon.ALL ? null : val
                  )} 
                />
              )}
          />
          </Field>
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
            {table.getFilteredSelectedRowModel().rows.length}/{" "}
            {table.getFilteredRowModel().rows.length}
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