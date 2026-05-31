"use client"

import { BadgeCustom, Checkbox, DataTableColumnHeader, Button, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/index"
import { useWarehouseCrud } from "@/hooks/index"
import { StatusCommon } from "@/types/common"
import { WAREHOUSE_FIELD, Warehouse } from "@/types/index"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, EllipsisIcon, Trash } from "lucide-react"

export const getColumns = (
  onEdit?: (warehouse: Warehouse) => void,
  onDelete?: (warehouse: Warehouse) => void,
  onRestore?: (warehouse: Warehouse) => void
): ColumnDef<Warehouse>[] => [
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
      <DataTableColumnHeader column={column} title={WAREHOUSE_FIELD[column.id]} />
    ),
  },
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={WAREHOUSE_FIELD[column.id]} />
    ),
    cell: ({ row }) => <div className="w-50 truncate">{row.original?.code || ""}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={WAREHOUSE_FIELD[column.id]} />
    ),
    cell: ({ row }) => <div className="w-50 truncate">{row.original?.name || ""}</div>,
  },
  {
    accessorKey: "materialCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={WAREHOUSE_FIELD[column.id]} side="right" />
    ),
    cell: ({ row }) => <div className="text-right">{row.original.materialCount || 0}</div>
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={WAREHOUSE_FIELD[column.id]} />
    ),
    cell: ({ row }) => <StatusCell warehouse={row.original} />,
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={WAREHOUSE_FIELD[column.id]} />
    ),
    cell: ({ row }) => 
      <div className="w-60 line-clamp-2 whitespace-normal">
        {row.original?.address || ""}
      </div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const warehouse = row.original
 
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
          <DropdownMenuContent align="end" className="min-w-40" onClick={(e) => e.stopPropagation()}>
            {warehouse.status !== StatusCommon.DELETED ? (
              <>
                <DropdownMenuItem onClick={() => onEdit?.(warehouse)}>
                  <Edit />
                  Chỉnh sửa
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={() => onDelete?.(warehouse)}>
                  <Trash />
                  Xóa
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem onClick={() => onRestore?.(warehouse)}>
                Khôi phục
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]

const StatusCell = ({ warehouse }: { warehouse: Warehouse }) => {
  const mutation = useWarehouseCrud();
  
    const onUpdate = async (status: string) => {
      mutation.mutate({ 
        action: "update-status", 
        id: warehouse.id, 
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
        disabled={warehouse.status === StatusCommon.DELETED}
        onClick={(e) => e.stopPropagation()}
      >
        <button disabled={mutation.isPending} className="focus:outline-none">
          <BadgeCustom status={warehouse.status! as StatusCommon} className="hover:brightness-95" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem 
          disabled={warehouse.status === StatusCommon.ACTIVE} 
          onClick={() => onUpdate(StatusCommon.ACTIVE)}
        >
          Hoạt động
        </DropdownMenuItem>
        <DropdownMenuItem 
          disabled={warehouse.status === StatusCommon.INACTIVE} 
          onClick={() => onUpdate(StatusCommon.INACTIVE)}
        > 
          Tạm ngưng
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};