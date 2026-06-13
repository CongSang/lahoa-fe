"use client"

import { Badge, Button, DataTableColumnHeader, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, InventoryDifferenceBadge, TooltipRender } from "@/components/index"
import { InventoryLog, INVENTORY_LOG_FIELD, INVENTORY_MOVEMENT_TYPE_LABELS, INVENTORY_MOVEMENT_TYPE_BADGES, INVENTORY_REFERENCE_TYPE_LABELS, StatusCommon } from "@/types/index"
import { formatDateTime, formatRelative } from "@/lib/index"
import { ColumnDef } from "@tanstack/react-table"
import { EllipsisIcon, LayoutList } from "lucide-react"
import Link from "next/link"

export const getColumns = (
  onOpenDetail?: (audit: InventoryLog) => void
): ColumnDef<InventoryLog>[] => [
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={INVENTORY_LOG_FIELD[column.id]} />
    ),
    cell: ({ row }) => <div className="w-30 truncate">{row.original?.code || ""}</div>,
  },
  {
    accessorKey: "materialName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={INVENTORY_LOG_FIELD[column.id]} />
    ),
    cell: ({ row }) => {
      const materialId = row.original.materialId;
      const materialName = row.original.materialName;
      const materialStatus = row.original.materialStatus;

      return (
        <div className="min-w-50 truncate flex items-center gap-1">
          <Link 
            href={`/inventory/materials/${materialId}`} 
            className="text-foreground hover:text-blue-600 hover:underline underline-offset-4 font-normal"
          >
            {materialName}
          </Link>

          {materialStatus === StatusCommon.DELETED && (
            <Badge variant="destructive">Ngừng kinh doanh</Badge>
          )}
        </div>
      );
    }
  },
  {
    accessorKey: "warehouseName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={INVENTORY_LOG_FIELD[column.id]} />
    ),
    cell: ({ row }) => {
      const warehouseId = row.original.warehouseId;
      const warehouseName = row.original.warehouseName;
      const warehouseStatus = row.original.warehouseStatus;

      return (
        <div className="min-w-40 truncate flex items-center gap-1">
          <Link 
            href={`/inventory/warehouses/${warehouseId}`} 
            className="text-foreground hover:text-blue-600 hover:underline underline-offset-4 font-normal"
          >
            {warehouseName}
          </Link>

          {warehouseStatus === StatusCommon.DELETED && (
            <Badge variant="destructive">Đã đóng cửa</Badge>
          )}
        </div>
      );
    }
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={INVENTORY_LOG_FIELD[column.id]} />
    ),
    cell: ({ row }) => {
    const type = row.original.type
    const label = INVENTORY_MOVEMENT_TYPE_LABELS[type] || type
    const badgeStyle = INVENTORY_MOVEMENT_TYPE_BADGES[type]

    return (
      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${badgeStyle?.className}`}>
        {label}
      </span>
    )
  }
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={INVENTORY_LOG_FIELD[column.id]} side="right" />
    ),
    cell: ({ row }) => 
      <div className="text-right">
        <InventoryDifferenceBadge value={Number(row.original.quantity) || 0} />
      </div>,
  },
  {
    accessorKey: "beforeOnHand",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={INVENTORY_LOG_FIELD[column.id]} side="right" />
    ),
    cell: ({ row }) => 
      <div className="text-right">
        {row.original.beforeOnHand}
      </div>,
  },
  {
    accessorKey: "afterOnHand",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={INVENTORY_LOG_FIELD[column.id]} side="right" />
    ),
    cell: ({ row }) => 
      <div className="text-right">
        {row.original.afterOnHand}
      </div>,
  },
  {
    accessorKey: "beforeReserved",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={INVENTORY_LOG_FIELD[column.id]} side="right" />
    ),
    cell: ({ row }) => 
      <div className="text-right">
        {row.original.beforeReserved}
      </div>,
  },
  {
    accessorKey: "afterReserved",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={INVENTORY_LOG_FIELD[column.id]} side="right" />
    ),
    cell: ({ row }) => 
      <div className="text-right">
        {row.original.afterReserved}
      </div>,
  },
  {
    accessorKey: "actorName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={INVENTORY_LOG_FIELD[column.id]} />
    ),
    cell: ({ row }) => 
      <div className="w-50 truncate">
        {row.original?.actorName + " (" + row.original.actorEmail + ") " || ""}
      </div>,
  },
  {
    accessorKey: "referenceType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={INVENTORY_LOG_FIELD[column.id]} />
    ),
    cell: ({ row }) => {
      const refType = row.original.referenceType
      return <div className="w-40 truncate">{INVENTORY_REFERENCE_TYPE_LABELS[refType] || refType}</div>
    }
  },
  {
    accessorKey: "referenceId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={INVENTORY_LOG_FIELD[column.id]} />
    ),
    cell: ({ row }) => {
      const refId = row.original.referenceId;
      const refCode = row.original.referenceCode;
      const refType = row.original.referenceType;

      if (!refId) return <span className="text-muted-foreground">-</span>;

      let path = "";
      if (refType === "PURCHASE_ORDER") path = `/admin/inventory-receipts/${refId}`;
      if (refType === "STOCKTAKE") path = `/admin/stocktakes/${refId}`;
      if (refType === "ORDER") path = `/orders/${refId}`;

      // Nếu có path hợp lệ thì hiển thị link màu xanh, có gạch chân khi hover
      if (path) {
        return (
          <div className="w-50 truncate">
            <Link 
              href={path} 
              className="text-blue-600 underline-offset-4 hover:underline font-medium dark:text-blue-400"
            >
              #{refCode}
            </Link>
          </div>
        );
      }

      return <div className="w-50 truncate">#{refId}</div>;
    }
  },
  {
    accessorKey: "note",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={INVENTORY_LOG_FIELD[column.id]} />
    ),
    cell: ({ row }) => 
      <div className="w-60 line-clamp-2 whitespace-normal">
        {row.original?.note || ""}
      </div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={INVENTORY_LOG_FIELD[column.id]} />
    ),
    cell: ({ row }) => 
      <TooltipRender tooltip={formatRelative(row.original.createdAt)}>
        <div className="truncate">{formatDateTime(row.original.createdAt) || ""}</div>
      </TooltipRender>
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const audit = row.original
 
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
            <DropdownMenuItem onClick={() => onOpenDetail?.(audit)}>
              <LayoutList />
              Xem chi tiết
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]