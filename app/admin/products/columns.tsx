"use client"

import { BadgeCustom, Checkbox, DataTableColumnHeader, Button, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, Avatar, AvatarImage, AvatarFallback, DropdownMenuSeparator } from "@/components/index"
import { useProductCrud } from "@/hooks/form-submit"
import { APP_URL, formatNumber } from "@/lib/index"
import { Product, PRODUCT_FIELD, StatusCommon } from "@/types/index"
import { ColumnDef } from "@tanstack/react-table"
import { EllipsisIcon, ImageIcon } from "lucide-react"
import Link from "next/link"

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
        onClick={(e) => e.stopPropagation()}
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
    cell: ({ row }) => <div className="w-50 truncate">{row.original?.name || ""}</div>,
  },

  {
    accessorKey: "variants",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={PRODUCT_FIELD[column.id]} />
    ),
    cell: ({ row }) => 
      <div className="w-30 truncate">
        {row.original.variants?.flatMap((variant) => 
            variant.properties
        ).flatMap((p) => 
            p.values
        ).map((val) => val.label).join(", ")}
      </div>
  },
  {
    accessorKey: "basePrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={PRODUCT_FIELD[column.id]} side="right" />
    ),
    cell: ({ row }) => 
      <div className="text-right w-25">
        {formatNumber(row.original.basePrice, { style: "currency", currency: "VND" })}
      </div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={PRODUCT_FIELD[column.id]} />
    ),
    cell: ({ row }) => <StatusCell product={row.original} />,
  },
  {
    accessorKey: "properties",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={PRODUCT_FIELD[column.id]} />
    ),
    cell: ({ row }) => (
      <div className="space-y-0.5 w-40">
        {row.original.properties?.map((property) => (
          <div key={property.id} className="flex gap-2">
            <span className="font-medium shrink-0">
              {property.name}:
            </span>

            <span className="wrap-break-word">
              {property.values.map(v => v.label).join(", ")}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "primaryCategory",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={PRODUCT_FIELD[column.id]} />
    ),
    cell: ({ row }) => <div className="max-w-50 truncate">{row.original.primaryCategory?.name || ""}</div>,
  },
  {
    accessorKey: "categories",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={PRODUCT_FIELD[column.id]} />
    ),
    cell: ({ row }) => (
      <div className="max-w-50 truncate">
        {row.original.categories?.map(v => v.name).join(", ")}
      </div>
    ),
  },
  {
    accessorKey: "slug",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={PRODUCT_FIELD[column.id]} />
    ),
    cell: ({ row }) => {
      const path = row.original.primaryCategory?.slug ? `${row.original.primaryCategory.slug}/${row.original.slug}` : row.original.slug;

      return (
        <Button 
          variant="link" 
          className="px-0 truncate" 
          asChild 
          onClick={(e) => e.stopPropagation()}
        >
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
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={PRODUCT_FIELD[column.id]} />
    ),
    cell: ({ row }) => 
      <div className="w-60 line-clamp-2 whitespace-normal">
        {row.original?.description || ""}
      </div>,
  },
  {
    accessorKey: "seoTitle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={PRODUCT_FIELD[column.id]} />
    ),
    cell: ({ row }) => <div className="w-50 truncate">{row.original?.seoTitle || ""}</div>,
  },
  {
    accessorKey: "seoKeywords",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={PRODUCT_FIELD[column.id]} />
    ),
    cell: ({ row }) => <div className="w-50 truncate">{row.original?.seoKeywords || ""}</div>,
  },
  {
    accessorKey: "seoDescription",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={PRODUCT_FIELD[column.id]} />
    ),
    cell: ({ row }) => 
      <div className="w-60 line-clamp-2 whitespace-normal">
        {row.original?.seoDescription || ""}
      </div>,
  },
  {
    accessorKey: "displayOrder",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={PRODUCT_FIELD[column.id]} side="right" />
    ),
    cell: ({ row }) => <div className="text-right">{row.original.displayOrder || 0}</div>
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original
 
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
            {product.status !== StatusCommon.DELETED ? (
              <>
                <DropdownMenuItem onClick={() => onEdit?.(product)}>
                  Chỉnh sửa
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={() => onDelete?.(product)}>
                  Xóa
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem onClick={() => onRestore?.(product)}>
                Khôi phục
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]

const StatusCell = ({ product }: { product: Product }) => {
  const mutation = useProductCrud();

  const onUpdate = async (status: string) => {
    mutation.mutate({ 
      action: "update-status", 
      id: product.id, 
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
        disabled={product.status === StatusCommon.DELETED}
        onClick={(e) => e.stopPropagation()}
      > 
        <button disabled={mutation.isPending} className="focus:outline-none">
          <BadgeCustom status={product.status as StatusCommon} className="hover:brightness-95" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem 
          disabled={product.status === StatusCommon.ACTIVE} 
          onClick={() => onUpdate(StatusCommon.ACTIVE)}
        >
          Hoạt động
        </DropdownMenuItem>
        <DropdownMenuItem 
          disabled={product.status === StatusCommon.INACTIVE} 
          onClick={() => onUpdate(StatusCommon.INACTIVE)}
        > 
          Tạm ngưng
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};