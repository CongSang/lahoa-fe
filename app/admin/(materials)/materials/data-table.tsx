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
  UpsertMaterialDialog,
  SelectCustom,
  Switch,
  WarehouseInventoryDialog,
} from "@/components/index"
import { useMemo, useState } from "react"
import { Download, ListFilter, RefreshCcw, SearchIcon, Upload } from "lucide-react"
import { AlertDialog, Material, MATERIAL_FIELD, MaterialFilterRequest, StatusCommon } from "@/types/index"
import { statusFilterDropdown } from "@/lib/index"
import { getMaterialCategoryDropdownApi, getMaterialsApi, getWarehouseDropdownApi } from "@/services/index"
import { useDataTable, useMaterialCrud } from "@/hooks/index"
import { Controller } from "react-hook-form"
import { getColumns } from "./columns"
import { MaterialFormValues } from "@/schema/index"
import { useQuery } from "@tanstack/react-query"

interface DataTableProps {
  initialData?: Partial<MaterialFormValues>
  openDialog: boolean
  setOpenDialog: (value: boolean) => void
  handleOpenDialog: (data?: Partial<MaterialFormValues>) => void
}

export function DataTable({ openDialog, setOpenDialog, initialData, handleOpenDialog }: DataTableProps) {
  const [columnVisibility, setColumnVisibility] =useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [warehouse, setWarehouse] = useState<{ open: boolean, material: Material | null }>({
    open: false,
    material: null
  });
  const [alert, setAlert] = useState<AlertDialog<Material>>({
    type: "delete",
    open: false,
    title: "",
    description: "",
    item: null
  });

  const { data: apiResponse, tableState, form, isLoading } = useDataTable<Material, MaterialFilterRequest>(
    "materials", 
    getMaterialsApi, 
    {
      defaultFilter: { 
        keyword: "",
        categoryId: undefined,
        warehouseId: undefined,
        status: null,
        lowStock: undefined,
        outOfStock: undefined
      }
    }
  )

  const mutation = useMaterialCrud();

  const onSubmit = async (formData: MaterialFormValues) => {
    if(!formData.id) {
      mutation.mutate({ 
        action: "create", 
        data: formData,
        meta: {
          successMessage: "Tạo nguyên liệu thành công",
          errorMessage: "Tạo nguyên liệu thất bại"
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
          successMessage: "Cập nhật nguyên liệu thành công",
          errorMessage: "Cập nhật nguyên liệu thất bại"
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
        successMessage: "Xóa nguyên liệu thành công",
        errorMessage: "Xóa nguyên liệu thất bại"
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
        successMessage: "Khôi phục nguyên liệu thành công",
        errorMessage: "Khôi phục nguyên liệu thất bại"
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

  const handleDelete = (material: Material) => {
    setAlert({ 
      type: "delete", 
      item: material, 
      title: "Xóa nguyên liệu?", 
      description: `Bạn có chắc chắn xóa nguyên liệu ${material.name}.${" "}`,
      open: true, 
    })
  }

  const handleRestore = (material: Material) => {
    setAlert({ 
      type: "info", 
      item: material, 
      title: "Khôi phục nguyên liệu?", 
      description: `Bạn có chắc chắn khôi phục nguyên liệu ${material.name}.`,
      open: true, 
    })
  }

  const handleOpenWarehouseDetail = (material: Material) => {
    setWarehouse({ material, open: true })
  }

  const columns = useMemo(() => getColumns(
    (material) => handleOpenDialog(material),
    (material) => handleDelete(material),
    (material) => handleRestore(material),
    (material) => handleOpenWarehouseDetail(material),
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
            <DataTableViewOptions table={table} fieldName={MATERIAL_FIELD} />
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
            <FieldLabel>Danh mục nguyên liệu</FieldLabel>
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

          <Field orientation="horizontal">
            <FieldLabel htmlFor="low-stock">Tồn kho thấp</FieldLabel>
            <Controller
              control={form.control}
              name="lowStock"
              render={({ field }) => (
                <Switch 
                  id="low-stock" 
                  checked={field.value} 
                  onCheckedChange={field.onChange} 
                />
              )}
            />
          </Field>

          <Field orientation="horizontal">
            <FieldLabel htmlFor="out-of-stock">Hết hàng</FieldLabel>
            <Controller
              control={form.control}
              name="outOfStock"
              render={({ field }) => (
                <Switch 
                  id="out-of-stock"
                  checked={field.value} 
                  onCheckedChange={field.onChange} 
                />
              )}
            />
          </Field>
        </DataTableFilterSheet>

        <DataTableCommon 
          table={table} 
          columns={columns}
          isFiltering={tableState.isFiltering}
          emptyLabel="Chưa có nguyên liệu nào"
          isLoading={isLoading} 
          onReset={handleReset}
          handleOpenDialog={handleOpenDialog}
        />

        <div className="flex-1 text-sm text-muted-foreground">
          Đã chọn <span className="font-semibold text-accent-foreground">
            {Object.keys(rowSelection).length}/{" "}
            {table.getRowCount()}
          </span> nguyên liệu.
        </div>

        <DataTablePagination table={table} prefetchNextPage={tableState.prefetchNextPage} />
      </Card>

      <UpsertMaterialDialog
        isLoading={mutation.isPending}
        open={openDialog}
        onOpenChange={setOpenDialog}
        initialData={initialData}
        dropdown={categoryDropdown}
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

      <WarehouseInventoryDialog 
        open={warehouse.open} 
        onOpenChange={(open) =>
          setWarehouse(prev => ({
            ...prev,
            open,
          }))
        }
        material={warehouse.material}
      />
    </>
  )
}