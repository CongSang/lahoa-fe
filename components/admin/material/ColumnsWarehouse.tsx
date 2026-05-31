"use client"

import { InventoryStatusBadge, TooltipRender } from "@/components/index"
import { formatDateTime, formatNumber, formatRelative } from "@/lib/index"
import { MATERIAL_WAREHOUSE_FIELD, MaterialWarehouseInventory } from "@/types/index"
import { ColumnDef } from "@tanstack/react-table"

export const getColumnsWarehouse = (): ColumnDef<MaterialWarehouseInventory>[] => [
  {
    accessorKey: "warehouseId",
    header: ({ column }) => (
      <div>{MATERIAL_WAREHOUSE_FIELD[column.id]}</div>
    ),size: 200,
  },
  {
    accessorKey: "warehouseName",
    header: ({ column }) => (
      <div>{MATERIAL_WAREHOUSE_FIELD[column.id]}</div>
    ),
    cell: ({ row }) => <div className="w-50 truncate">{row.original?.warehouseName || ""}</div>,
    size: 200,
  },
  {
    accessorKey: "onHand",
    header: ({ column }) => (
      <div className="text-right">{MATERIAL_WAREHOUSE_FIELD[column.id]}</div>
    ),
    cell: ({ row }) => 
      <div className="text-right">
        {row.original.onHand}
      </div>,size: 200,
  },
  {
    accessorKey: "reserved",
    header: ({ column }) => (
      <div className="text-right">{MATERIAL_WAREHOUSE_FIELD[column.id]}</div>
    ),
    cell: ({ row }) => 
      <div className="text-right">
        {row.original.reserved}
      </div>,size: 200,
  },
  {
    accessorKey: "available",
    header: ({ column }) => (
      <div className="text-right">{MATERIAL_WAREHOUSE_FIELD[column.id]}</div>
    ),
    cell: ({ row }) => 
      <div className="text-right">
        {row.original.available}
      </div>,size: 200,
  },
  {
    accessorKey: "costPrice",
    header: ({ column }) => (
      <div className="text-right">{MATERIAL_WAREHOUSE_FIELD[column.id]}</div>
    ),
    cell: ({ row }) => 
      <div className="text-right">
        {formatNumber(row.original.costPrice, { style: "currency", currency: "VND" })}
      </div>,size: 200,
  },
  {
    accessorKey: "outOfStock",
    header: ({ column }) => (
      <div>{MATERIAL_WAREHOUSE_FIELD[column.id]}</div>
    ),
    cell: ({ row }) => 
      <InventoryStatusBadge
        lowStock={row.original.lowStock}
        outOfStock={row.original.outOfStock} 
      />,size: 200,
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <div>{MATERIAL_WAREHOUSE_FIELD[column.id]}</div>
    ),
    cell: ({ row }) => 
      <TooltipRender tooltip={formatRelative(row.original.updatedAt)}>
        <div className="truncate">{formatDateTime(row.original.updatedAt) || ""}</div>
      </TooltipRender>,size: 200,
  },
]