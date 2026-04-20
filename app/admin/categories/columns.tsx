"use client"

import { BadgeCustom, Checkbox, DataTableColumnHeader, Button, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, Spinner } from "@/components/index"
import { updateCategoryStatusApi } from "@/services/index"
import { Category, CATEGORY_FIELD } from "@/types/category"
import { StatusCommon } from "@/types/common"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table"
import { Pencil, Trash2 } from "lucide-react"
import toast from "react-hot-toast"

export const getColumns = (
  onEdit?: (category: Category) => void,
  onDelete?: (category: Category) => void
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
    accessorKey: "slug",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={CATEGORY_FIELD[column.id]} />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original
 
      return (
        <div className="flex items-center justify-end gap-2">
          <Button 
            variant="ghost" 
            size="icon-sm" 
            className="text-gray-500"
            onClick={() => onEdit?.(category)}
          >
            <Pencil />
          </Button>
          <Button 
            variant="ghost" 
            size="icon-sm" 
            className="text-gray-500 hover:text-red-600 dark:hover:text-red-400"
            onClick={() => onDelete?.(category)}
          >
            <Trash2 />
          </Button>
        </div>
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