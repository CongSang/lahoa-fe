"use client"

import { BadgeCustom, Checkbox, DataTableColumnHeader, Button, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, Spinner, Avatar, AvatarImage, AvatarFallback, TooltipRender } from "@/components/index"
import { APP_URL, formatNumber } from "@/lib/index"
import { updateProductStatusApi } from "@/services/index"
import { Product, PRODUCT_FIELD, StatusCommon } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table"
import { ArchiveRestore, ImageIcon, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import toast from "react-hot-toast"

export const getColumns = (
  onEdit?: (product: Product) => void,
  onDelete?: (product: Product) => void,
  onRestore?: (product: Product) => void
): ColumnDef<Product>[] => [
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
      <DataTableColumnHeader column={column} title={PRODUCT_FIELD[column.id]} />
    ),
  },
  {
    accessorKey: "mainImage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={PRODUCT_FIELD[column.id]} />
    ),
    cell: ({ row }) => {  
      const product = row.original
      return(
        <Avatar>
          <AvatarImage
            src={product.mainImage || undefined}
            alt={product.name}
          />
          <AvatarFallback><ImageIcon size={18} /></AvatarFallback>
        </Avatar>
      )
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={PRODUCT_FIELD[column.id]} />
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={PRODUCT_FIELD[column.id]} side="right" />
    ),
    cell: ({ row }) => <div className="text-right">{formatNumber(row.original.price, { style: "currency", currency: "VND" })}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={PRODUCT_FIELD[column.id]} />
    ),
    cell: ({ row }) => <StatusCell product={row.original} />,
  },
  {
    accessorKey: "primaryCategory",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={PRODUCT_FIELD[column.id]} />
    ),
  },
  {
    accessorKey: "categories",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={PRODUCT_FIELD[column.id]} />
    ),
    cell: ({ row }) => <>{row.original.categories?.[0]?.name || ""}</>,
  },
  {
    accessorKey: "slug",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={PRODUCT_FIELD[column.id]} />
    ),
    cell: ({ row }) => {
      const path = row.original.primaryCategory?.slug ? `${row.original.primaryCategory.slug}/${row.original.slug}` : row.original.slug;

      return (
        <Button variant="link" className="px-0" asChild>
          <Link 
            href={`${APP_URL}/${path}`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {path}
          </Link>
        </Button>
      )
    },
  },
  {
    accessorKey: "seoTitle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={PRODUCT_FIELD[column.id]} />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original
 
      return (
        <>
          {product.status !== StatusCommon.DELETED ? (
            <div className="flex items-center justify-end gap-2">
              <TooltipRender tooltip="Chỉnh sửa">
                <Button 
                  variant="ghost" 
                  size="icon-sm" 
                  className="text-gray-500"
                  onClick={() => onEdit?.(product)}
                >
                  <Pencil />
                </Button>
              </TooltipRender>
              <TooltipRender tooltip="Xóa">
                <Button 
                  variant="ghost" 
                  size="icon-sm" 
                  className="text-gray-500 hover:text-red-600 dark:hover:text-red-400"
                  onClick={() => onDelete?.(product)}
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
                onClick={() => onRestore?.(product)}
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

const StatusCell = ({ product }: { product: Product }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newStatus: string) => updateProductStatusApi(product.id, newStatus),
    onSuccess: () => {
      toast.success("Cập nhật trạng thái thành công");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => toast.error("Có lỗi xảy ra khi cập nhật trạng thái"),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={product.status === StatusCommon.DELETED}>
        {mutation.isPending ? 
          <div className="w-16 flex items-center justify-center "><Spinner /></div>
        : <button disabled={mutation.isPending} className="focus:outline-none">
            <BadgeCustom status={product.status! as StatusCommon} />
          </button>
        }
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem 
          disabled={product.status === StatusCommon.DRAFT} 
          onClick={() => mutation.mutate(StatusCommon.DRAFT)}
        >
          Bản nháp
        </DropdownMenuItem>
        <DropdownMenuItem 
          disabled={product.status === StatusCommon.ACTIVE} 
          onClick={() => mutation.mutate(StatusCommon.ACTIVE)}
        >
          Hoạt động
        </DropdownMenuItem>
        <DropdownMenuItem 
          disabled={product.status === StatusCommon.INACTIVE} 
          onClick={() => mutation.mutate(StatusCommon.INACTIVE)}
        > 
          Tạm ngưng
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};