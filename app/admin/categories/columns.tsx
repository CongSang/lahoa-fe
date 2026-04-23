"use client"

import { BadgeCustom, Checkbox, DataTableColumnHeader, Button, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, Spinner, Avatar, AvatarImage, AvatarFallback, TooltipRender } from "@/components/index"
import { APP_URL } from "@/lib/index"
import { updateCategoryStatusApi } from "@/services/index"
import { Category, CATEGORY_FIELD } from "@/types/category"
import { StatusCommon } from "@/types/common"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table"
import { ArchiveRestore, ImageIcon, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import toast from "react-hot-toast"

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
            src={category.imageUrl}
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
  },
  {
    accessorKey: "productCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={CATEGORY_FIELD[column.id]} />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={CATEGORY_FIELD[column.id]} />
    ),
    cell: ({ row }) => <StatusCell category={row.original} />,
  },
  {
    accessorKey: "displayOrder",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={CATEGORY_FIELD[column.id]} />
    ),
  },
  {
    accessorKey: "parent",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={CATEGORY_FIELD[column.id]} />
    ),
    cell: ({ row }) => <>{row.original.parent?.name}</>,
  },
  {
    accessorKey: "slug",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={CATEGORY_FIELD[column.id]} />
    ),
    cell: ({ row }) => (
      <Button variant="link" className="px-0">
        <Link 
          href={`${APP_URL}/${row.original.slug}`} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          {row.original.slug}
        </Link>
      </Button>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original
 
      return (
        <>
          {category.status !== StatusCommon.DELETED ? (
            <div className="flex items-center justify-end gap-2">
              <TooltipRender tooltip="Chỉnh sửa">
                <Button 
                  variant="ghost" 
                  size="icon-sm" 
                  className="text-gray-500"
                  onClick={() => onEdit?.(category)}
                >
                  <Pencil />
                </Button>
              </TooltipRender>
              <TooltipRender tooltip="Xóa">
                <Button 
                  variant="ghost" 
                  size="icon-sm" 
                  className="text-gray-500 hover:text-red-600 dark:hover:text-red-400"
                  onClick={() => onDelete?.(category)}
                >
                  <Trash2 />
                </Button>
              </TooltipRender>
            </div>
          ) : (
            <TooltipRender tooltip="Khôi phục">
              <Button 
                variant="ghost" 
                size="icon-sm" 
                className="text-gray-500"
                onClick={() => onRestore?.(category)}
              >
                <ArchiveRestore />
              </Button>
            </TooltipRender>
          )}
        </>
      )
    },
  }
]

const StatusCell = ({ category }: { category: Category }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newStatus: string) => updateCategoryStatusApi(category.id, newStatus),
    onSuccess: () => {
      toast.success("Cập nhật trạng thái thành công");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => toast.error("Có lỗi xảy ra khi cập nhật trạng thái"),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {mutation.isPending ? 
          <div className="w-16 flex items-center justify-center "><Spinner /></div>
        : <button disabled={mutation.isPending} className="focus:outline-none">
            <BadgeCustom status={category.status!} />
          </button>
        }
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem 
          disabled={category.status === StatusCommon.ACTIVE} 
          onClick={() => mutation.mutate(StatusCommon.ACTIVE)}
        >
          Hoạt động
        </DropdownMenuItem>
        <DropdownMenuItem 
          disabled={category.status === StatusCommon.INACTIVE} 
          onClick={() => mutation.mutate(StatusCommon.INACTIVE)}
        > 
          Tạm ngưng
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};