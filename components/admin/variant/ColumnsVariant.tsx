"use client"

import { BadgeCustom, Checkbox, DataTableColumnHeader, Button, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/index"
import { formatNumber } from "@/lib/index"
import { Variant, VARIANT_FIELD } from "@/types/index"
import { StatusCommon } from "@/types/common"
import { ColumnDef } from "@tanstack/react-table"
import { EllipsisIcon } from "lucide-react"

export const getColumnsVariant = (
  onUpdate: (variant: Variant, index: number) => void,
  onEdit?: (variant: Variant, index: number) => void,
  onDelete?: (variant: Variant, index: number) => void
): ColumnDef<Variant>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={VARIANT_FIELD[column.id]} sort={false} />
    ),
  },
  {
    accessorKey: "sku",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={VARIANT_FIELD[column.id]} sort={false} />
    ),
    cell: ({ row }) => <div className="w-50 truncate">{row.original?.sku || ""}</div>,
  },
  {
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={VARIANT_FIELD[column.id]} sort={false} side="right" />
      ),
      cell: ({ row }) => 
        <div className="text-right">
          {formatNumber(row.original.price, { style: "currency", currency: "VND" })}
        </div>,
    },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={VARIANT_FIELD[column.id]} sort={false} side="right" />
    ),
    cell: ({ row }) => 
      <div className="text-right">
        {row.original.stock}
      </div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={VARIANT_FIELD[column.id]} sort={false} />
    ),
    cell: ({ row }) => <StatusCell variant={row.original} onUpdate={(v) => onUpdate(v, row.index)} />,
  },
  {
    accessorKey: "default",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={VARIANT_FIELD[column.id]} sort={false} />
    ),
    cell: ({ row }) => <Checkbox checked={row.original.default} className="cursor-default" />,
  },
  {
    accessorKey: "properties",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={VARIANT_FIELD[column.id]} sort={false} />
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
    id: "actions",
    cell: ({ row }) => {
      const category = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
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
            <DropdownMenuItem onClick={() => onEdit?.(category, row.index)}>
              Chỉnh sửa
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={() => onDelete?.(category, row.index)}>
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]

const StatusCell = ({ variant, onUpdate }: { variant: Variant, onUpdate: (variant: Variant) => void, }) => {

  const onChangeStatus = (status: "ACTIVE" | "INACTIVE") => {
    onUpdate({ ...variant, status })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger 
        asChild 
        disabled={[StatusCommon.DELETED, StatusCommon.OUT_OF_STOCK].includes(variant.status as StatusCommon)}
      >
        <button className="focus:outline-none">
          <BadgeCustom status={variant.status! as StatusCommon} className="hover:brightness-95" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem 
          disabled={variant.status === StatusCommon.ACTIVE} 
          onClick={() => onChangeStatus(StatusCommon.ACTIVE)}
        >
          Hoạt động
        </DropdownMenuItem>
        <DropdownMenuItem 
          disabled={variant.status === StatusCommon.INACTIVE} 
          onClick={() => onChangeStatus(StatusCommon.INACTIVE)}
        > 
          Tạm ngưng
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};