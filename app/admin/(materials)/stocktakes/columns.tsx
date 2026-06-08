"use client"

import { Checkbox, DataTableColumnHeader, TooltipRender, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, Button, InventoryDifferenceBadge } from "@/components/index"
import { formatDateTime, formatRelative } from "@/lib/index"
import { STOCK_TAKE_FIELD, StockTake } from "@/types/index"
import { ColumnDef } from "@tanstack/react-table"
import { EllipsisIcon, FileDown, FileText, LayoutList } from "lucide-react"

export const getColumns = (
  onDetail?: (stocktake: StockTake) => void,
): ColumnDef<StockTake>[] => [
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
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={STOCK_TAKE_FIELD[column.id]} />
    ),
    cell: ({ row }) => <div className="w-50 truncate">{row.original?.code || ""}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={STOCK_TAKE_FIELD[column.id]} />
    ),
    cell: ({ row }) => 
      <TooltipRender tooltip={formatRelative(row.original.createdAt)}>
        <div className="w-50 truncate">{formatDateTime(row.original.createdAt) || ""}</div>
      </TooltipRender>
  },
  {
    accessorKey: "warehouseName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={STOCK_TAKE_FIELD[column.id]} />
    ),
    cell: ({ row }) => <div className="w-50 truncate">{row.original?.warehouseName || ""}</div>,
  },
  {
    accessorKey: "totalItems",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={STOCK_TAKE_FIELD[column.id]} />
    ),
    cell: ({ row }) => <div className="w-50 truncate">{row.original?.totalItems || 0} loại</div>,
  },
  {
    accessorKey: "totalDifference",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={STOCK_TAKE_FIELD[column.id]} side="right" />
    ),
    cell: ({ row }) => 
      <div className="w-50 truncate text-right">
        <InventoryDifferenceBadge value={Number(row.original.totalDifference) || 0} />
      </div>,
  },
  {
    accessorKey: "note",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={STOCK_TAKE_FIELD[column.id]} />
    ),
    cell: ({ row }) => 
      <div className="w-60 line-clamp-2 whitespace-normal">
        {row.original?.note || ""}
      </div>,
  },
  {
    accessorKey: "createdBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={STOCK_TAKE_FIELD[column.id]} />
    ),
    cell: ({ row }) => <div className="w-50 truncate">{row.original?.createdBy || ""}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const stocktake = row.original
 
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
            <DropdownMenuItem onClick={() => onDetail?.(stocktake)}>
              <LayoutList />
              Xem chi tiết
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileText />
              In phiếu PDF
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileDown />
              Tải file Excel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]