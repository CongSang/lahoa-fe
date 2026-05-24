"use client"

import { BadgeCustom, Checkbox, DataTableColumnHeader, Button, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/index"
import { useMaterialCategoryCrud } from "@/hooks/form-submit"
import { StatusCommon } from "@/types/common"
import { MATERIAL_CATEGORY_FIELD, MaterialCategory } from "@/types/index"
import { ColumnDef } from "@tanstack/react-table"
import { EllipsisIcon } from "lucide-react"
import Link from "next/link"

export const getColumns = (
  onEdit?: (category: MaterialCategory) => void,
  onDelete?: (category: MaterialCategory) => void,
  onRestore?: (category: MaterialCategory) => void
): ColumnDef<MaterialCategory>[] => [
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
      <DataTableColumnHeader column={column} title={MATERIAL_CATEGORY_FIELD[column.id]} />
    ),
  },
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={MATERIAL_CATEGORY_FIELD[column.id]} />
    ),
    cell: ({ row }) => <div className="w-50 truncate">{row.original?.code || ""}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={MATERIAL_CATEGORY_FIELD[column.id]} />
    ),
    cell: ({ row }) => <div className="w-50 truncate">{row.original?.name || ""}</div>,
  },
  {
    accessorKey: "materialCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={MATERIAL_CATEGORY_FIELD[column.id]} side="right" />
    ),
    cell: ({ row }) => <div className="text-right">{row.original.materialCount || 0}</div>
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={MATERIAL_CATEGORY_FIELD[column.id]} />
    ),
    cell: ({ row }) => <StatusCell category={row.original} />,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={MATERIAL_CATEGORY_FIELD[column.id]} />
    ),
    cell: ({ row }) => 
      <div className="w-60 line-clamp-2 whitespace-normal">
        {row.original?.description || ""}
      </div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original
 
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
            {category.status !== StatusCommon.DELETED ? (
              <>
                <DropdownMenuItem asChild>
                  <Link
                    href={`/admin/materials?categoryId=${category.id}`}
                  >
                    Xem nguyên liệu
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit?.(category)}>
                  Chỉnh sửa
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={() => onDelete?.(category)}>
                  Xóa
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem onClick={() => onRestore?.(category)}>
                Khôi phục
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]

const StatusCell = ({ category }: { category: MaterialCategory }) => {
  const mutation = useMaterialCategoryCrud();
  
    const onUpdate = async (status: string) => {
      mutation.mutate({ 
        action: "update-status", 
        id: category.id, 
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
        disabled={category.status === StatusCommon.DELETED}
        onClick={(e) => e.stopPropagation()}
      >
        <button disabled={mutation.isPending} className="focus:outline-none">
          <BadgeCustom status={category.status! as StatusCommon} className="hover:brightness-95" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem 
          disabled={category.status === StatusCommon.ACTIVE} 
          onClick={() => onUpdate(StatusCommon.ACTIVE)}
        >
          Hoạt động
        </DropdownMenuItem>
        <DropdownMenuItem 
          disabled={category.status === StatusCommon.INACTIVE} 
          onClick={() => onUpdate(StatusCommon.INACTIVE)}
        > 
          Tạm ngưng
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};