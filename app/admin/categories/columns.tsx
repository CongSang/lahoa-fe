"use client"

import { BadgeCustom, Checkbox, DataTableColumnHeader, Button, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, Avatar, AvatarImage, AvatarFallback, DropdownMenuSeparator } from "@/components/index"
import { useCategoryCrud } from "@/hooks/form-submit"
import { APP_URL } from "@/lib/index"
import { Category, CATEGORY_FIELD } from "@/types/category"
import { StatusCommon } from "@/types/common"
import { ColumnDef } from "@tanstack/react-table"
import { EllipsisIcon, ImageIcon } from "lucide-react"
import Link from "next/link"

export const getColumns = (
  onEdit?: (category: Category) => void,
  onDelete?: (category: Category) => void,
  onRestore?: (category: Category) => void
): ColumnDef<Category>[] => [
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
      <DataTableColumnHeader column={column} title={CATEGORY_FIELD[column.id]} />
    ),
  },
  {
    accessorKey: "imageUrl",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={CATEGORY_FIELD[column.id]} />
    ),
    cell: ({ row }) => {  
      const category = row.original
      return(
        <Avatar>
          <AvatarImage
            src={category.imageUrl || undefined}
            alt={category.name}
          />
          <AvatarFallback><ImageIcon size={18} /></AvatarFallback>
        </Avatar>
      )
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={CATEGORY_FIELD[column.id]} />
    ),
    cell: ({ row }) => <div className="w-50 truncate">{row.original?.name || ""}</div>,
  },
  {
    accessorKey: "productCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={CATEGORY_FIELD[column.id]} side="right" />
    ),
    cell: ({ row }) => <div className="text-right">{row.original.productCount || 0}</div>
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={CATEGORY_FIELD[column.id]} />
    ),
    cell: ({ row }) => <StatusCell category={row.original} />,
  },
  {
    accessorKey: "parent",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={CATEGORY_FIELD[column.id]} />
    ),
    cell: ({ row }) => <div className="max-w-50 truncate">{row.original?.parent?.name || ""}</div>,
  },
  {
    accessorKey: "path",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={CATEGORY_FIELD[column.id]} />
    ),
    cell: ({ row }) => (
      <Button 
        variant="link" 
        className="px-0 truncate" 
        asChild
        onClick={(e) => e.stopPropagation()}
      >
        <Link 
          href={`${APP_URL}/${row.original.path}`} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          {row.original.path}
        </Link>
      </Button>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={CATEGORY_FIELD[column.id]} />
    ),
    cell: ({ row }) => 
      <div className="w-60 line-clamp-2 whitespace-normal">
        {row.original?.description || ""}
      </div>,
  },
  {
    accessorKey: "seoTitle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={CATEGORY_FIELD[column.id]} />
    ),
    cell: ({ row }) => <div className="w-50 truncate">{row.original?.name || ""}</div>,
  },
  {
    accessorKey: "seoKeywords",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={CATEGORY_FIELD[column.id]} />
    ),
    cell: ({ row }) => <div className="w-50 truncate">{row.original?.seoKeywords || ""}</div>,
  },
  {
    accessorKey: "seoDescription",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={CATEGORY_FIELD[column.id]} />
    ),
    cell: ({ row }) => 
      <div className="w-60 line-clamp-2 whitespace-normal">
        {row.original?.seoDescription || ""}
      </div>,
  },
  {
    accessorKey: "displayOrder",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={CATEGORY_FIELD[column.id]} side="right" />
    ),
    cell: ({ row }) => <div className="text-right">{row.original.displayOrder || 0}</div>
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
          <DropdownMenuContent align="end" className="w-32">
            {category.status !== StatusCommon.DELETED ? (
              <>
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

const StatusCell = ({ category }: { category: Category }) => {
  const mutation = useCategoryCrud();
  
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
      <DropdownMenuContent align="start">
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