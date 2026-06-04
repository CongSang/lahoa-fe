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
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  UpsertMaterialCategoryDialog
} from "@/components/index"
import { useMemo, useState } from "react"
import { Download, ListFilter, RefreshCcw, SearchIcon, Upload } from "lucide-react"
import { AlertDialog, MATERIAL_CATEGORY_FIELD, MaterialCategory, MaterialCategoryFilterRequest, StatusCommon } from "@/types/index"
import { statusFilterDropdown } from "@/lib/index"
import { getMaterialCategoriesApi } from "@/services/index"
import { useDataTable, useMaterialCategoryCrud } from "@/hooks/index"
import { Controller } from "react-hook-form"
import { getColumns } from "./columns"
import { MaterialCategoryFormValues } from "@/schema/index"

interface DataTableProps {
  initialData?: Partial<MaterialCategoryFormValues>
  openDialog: boolean
  setOpenDialog: (value: boolean) => void
  handleOpenDialog: (data?: Partial<MaterialCategoryFormValues>) => void
}

export function DataTable({ openDialog, setOpenDialog, initialData, handleOpenDialog }: DataTableProps) {
  const [columnVisibility, setColumnVisibility] =useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [alert, setAlert] = useState<AlertDialog<MaterialCategory>>({
    type: "delete",
    open: false,
    title: "",
    description: "",
    item: null
  });

  const { data: apiResponse, tableState, form, isLoading } = useDataTable<MaterialCategory, MaterialCategoryFilterRequest>(
    "material-categories", 
    getMaterialCategoriesApi, 
    {
      defaultFilter: { 
        keyword: "",
        status: null,
      }
    }
  )

  const mutation = useMaterialCategoryCrud();

  const onSubmit = async (formData: MaterialCategoryFormValues) => {
    if(!formData.id) {
      mutation.mutate({ 
        action: "create", 
        data: formData,
        meta: {
          successMessage: "Tạo danh mục thành công",
          errorMessage: "Tạo danh mục thất bại"
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
          successMessage: "Cập nhật danh mục thành công",
          errorMessage: "Cập nhật danh mục thất bại"
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
        successMessage: "Xóa danh mục thành công",
        errorMessage: "Xóa danh mục thất bại"
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
        successMessage: "Khôi phục danh mục thành công",
        errorMessage: "Khôi phục danh mục thất bại"
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

  const handleDelete = (cat: MaterialCategory) => {
    setAlert({ 
      type: "delete", 
      item: cat, 
      title: "Xóa danh mục?", 
      description: `Bạn có chắc chắn xóa danh mục vật liệu ${cat.name}.${" "}
      Hãy chắc chắn rằng đã chuyển tất cả danh mục con sang danh mục mới!`,
      open: true, 
    })
  }

  const handleRestore = (cat: MaterialCategory) => {
    setAlert({ 
      type: "info", 
      item: cat, 
      title: "Khôi phục danh mục?", 
      description: `Bạn có chắc chắn khôi phục danh mục ${cat.name}.`,
      open: true, 
    })
  }

  const columns = useMemo(() => getColumns(
    (cat) => handleOpenDialog(cat),
    (cat) => handleDelete(cat),
    (cat) => handleRestore(cat)
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
          emptyLabel="Chưa có Danh mục vật liệu nào"
          isLoading={isLoading} 
          onReset={handleReset}
          handleOpenDialog={handleOpenDialog}
        />

        <div className="flex-1 text-sm text-muted-foreground">
          Đã chọn <span className="font-semibold text-accent-foreground">
            {Object.keys(rowSelection).length}/{" "}
            {table.getRowCount()}
          </span> danh mục.
        </div>

        <DataTablePagination table={table} prefetchNextPage={tableState.prefetchNextPage} />
      </Card>

      <UpsertMaterialCategoryDialog
        isLoading={mutation.isPending}
        open={openDialog}
        onOpenChange={setOpenDialog}
        initialData={initialData}
        onSubmit={onSubmit}
      />

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