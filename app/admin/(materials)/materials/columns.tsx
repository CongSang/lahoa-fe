"use client"

import { BadgeCustom, Checkbox, DataTableColumnHeader, Button, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, Avatar, AvatarImage, AvatarFallback, DropdownMenuSeparator, Badge } from "@/components/index"
import { useMaterialCrud } from "@/hooks/index"
import { formatNumber } from "@/lib/index"
import { StatusCommon } from "@/types/common"
import { Material, MATERIAL_FIELD, MATERIAL_UNIT_LABEL } from "@/types/index"
import { ColumnDef } from "@tanstack/react-table"
import { EllipsisIcon, ImageIcon } from "lucide-react"

export const getColumns = (
  onEdit?: (material: Material) => void,
  onDelete?: (material: Material) => void,
  onRestore?: (material: Material) => void
): ColumnDef<Material>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        onClick={(e) => e.stopPropagation()}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={MATERIAL_FIELD[column.id]} />
    ),
  },
  {
    accessorKey: "thumbnail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={MATERIAL_FIELD[column.id]} />
    ),
    cell: ({ row }) => {  
      const category = row.original
      return(
        <Avatar>
          <AvatarImage
            src={category.thumbnail || undefined}
            alt={category.name}
          />
          <AvatarFallback><ImageIcon size={18} /></AvatarFallback>
        </Avatar>
      )
    },
  },
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={MATERIAL_FIELD[column.id]} />
    ),
    cell: ({ row }) => <div className="max-w-50 truncate">{row.original?.code || ""}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={MATERIAL_FIELD[column.id]} />
    ),
    cell: ({ row }) => <div className="w-50 truncate">{row.original?.name || ""}</div>,
  },
  {
    accessorKey: "costPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={MATERIAL_FIELD[column.id]} side="right" />
    ),
    cell: ({ row }) => 
      <div className="text-right">
        {formatNumber(row.original.costPrice, { style: "currency", currency: "VND" })}
      </div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={MATERIAL_FIELD[column.id]} />
    ),
    cell: ({ row }) => <StatusCell material={row.original} />,
  },
  {
    accessorKey: "unit",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={MATERIAL_FIELD[column.id]} />
    ),
    cell: ({ row }) => <div className="truncate">{MATERIAL_UNIT_LABEL[row.original?.unit] || ""}</div>,
  },
  {
    accessorKey: "categoryName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={MATERIAL_FIELD[column.id]} />
    ),
    cell: ({ row }) => 
      <div className="w-50 truncate">
        {row.original?.categoryName || ""}
      </div>,
  },
  {
    accessorKey: "warehouseCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={MATERIAL_FIELD[column.id]} />
    ),
    cell: ({ row }) => 
      <div className="w-25 truncate">
        {row.original?.warehouseCount || 0} kho
      </div>,
  },
  {
    accessorKey: "onHand",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={MATERIAL_FIELD[column.id]} side="right" />
    ),
    cell: ({ row }) => 
      <div className="text-right">
        {row.original.onHand || 0}
      </div>,
  },
  {
    accessorKey: "reserved",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={MATERIAL_FIELD[column.id]} side="right" />
    ),
    cell: ({ row }) => 
      <div className="text-right">
        {row.original.reserved || 0}
      </div>,
  },
  {
    accessorKey: "available",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={MATERIAL_FIELD[column.id]} side="right" />
    ),
    cell: ({ row }) => 
      <div className="text-right">
        {row.original.available || 0}
      </div>,
  },
  {
    accessorKey: "hasLowStockWarehouse",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={MATERIAL_FIELD[column.id]} />
    ),
    cell: ({ row }) => 
      <Badge variant={row.original.hasLowStockWarehouse ? "destructive" : "secondary"}>
        {row.original.hasLowStockWarehouse ? "Cần nhập hàng" : "Không"}
      </Badge>,
  },
  {
    accessorKey: "hasOutOfStockWarehouse",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={MATERIAL_FIELD[column.id]} />
    ),
    cell: ({ row }) => 
      <Badge variant={row.original.hasOutOfStockWarehouse ? "destructive" : "secondary"}>
        {row.original.hasOutOfStockWarehouse ? "Hết hàng" : "Không"}
      </Badge>,
  },
  {
    accessorKey: "lowStockThreshold",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={MATERIAL_FIELD[column.id]} side="right" />
    ),
    cell: ({ row }) => <div className="text-right">{row.original.lowStockThreshold || 0}</div>
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const material = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
              size="icon"
            >
              <EllipsisIcon />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32" onClick={(e) => e.stopPropagation()}>
            {material.status !== StatusCommon.DELETED ? (
              <>
                <DropdownMenuItem onClick={() => onEdit?.(material)}>
                  Chỉnh sửa
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={() => onDelete?.(material)}>
                  Xóa
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem onClick={() => onRestore?.(material)}>
                Khôi phục
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]

const StatusCell = ({ material }: { material: Material }) => {
  const mutation = useMaterialCrud();
  
    const onUpdate = async (status: string) => {
      mutation.mutate({ 
        action: "update-status", 
        id: material.id, 
        status, 
        meta: {
          successMessage: "Đã cập nhật trạng thái",
          errorMessage: "Cập nhật trạng thái thất bại"
        }
      })
    }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger 
        asChild 
        disabled={material.status === StatusCommon.DELETED}
        onClick={(e) => e.stopPropagation()}
      >
        <button disabled={mutation.isPending} className="focus:outline-none">
          <BadgeCustom status={material.status! as StatusCommon} className="hover:brightness-95" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem 
          disabled={material.status === StatusCommon.ACTIVE} 
          onClick={() => onUpdate(StatusCommon.ACTIVE)}
        >
          Hoạt động
        </DropdownMenuItem>
        <DropdownMenuItem 
          disabled={material.status === StatusCommon.INACTIVE} 
          onClick={() => onUpdate(StatusCommon.INACTIVE)}
        > 
          Tạm ngưng
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};