"use client"

import { Badge, Button, DataTableColumnHeader, TooltipRender } from "@/components/index"
import { AuditLog, AUDIT_LOG_FIELD, AUDIT_ACTION_LABEL, AUDIT_ENTITY_LABEL } from "@/types/index"
import { formatDateTime, formatRelative, getAuditActionClass, getAuditEntityRoute } from "@/lib/index"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

export const getColumns = (): ColumnDef<AuditLog>[] => [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       onClick={(e) => e.stopPropagation()}
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={AUDIT_LOG_FIELD[column.id]} />
    ),
  },
  {
    accessorKey: "entityId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={AUDIT_LOG_FIELD[column.id]} />
    ),
    cell: ({ row }) => <div className="w-50 truncate">{row.original?.entityId || ""}</div>,
  },
  {
    accessorKey: "entityName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={AUDIT_LOG_FIELD[column.id]} />
    ),
    cell: ({ row }) => <div className="truncate">{AUDIT_ENTITY_LABEL[row.original?.entityName] || ""}</div>,
  },
  {
    accessorKey: "entityLabel",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={AUDIT_LOG_FIELD[column.id]} />
    ),
    cell: ({ row }) => {
    const audit =
      row.original

    const href =  getAuditEntityRoute(
      audit.entityName,
      audit.entityId
    )

    if (!href) {
      return (
        <span>
          {audit.entityLabel}
        </span>
      )
    }

    return (
      <Button
        variant="link" 
        className="px-0 truncate"
        onClick={(e) => e.stopPropagation()}
      >
        <Link
          href={href}
          className="font-medium"
        >
          {audit.entityLabel}
        </Link>
      </Button>
    )
  }
  },
  {
    accessorKey: "action",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={AUDIT_LOG_FIELD[column.id]} />
    ),
    cell: ({ row }) => 
      <Badge
        className={getAuditActionClass(
          row.original.action
        )}
      >
        {AUDIT_ACTION_LABEL[row.original.action]}
      </Badge>,
  },
  {
    accessorKey: "oldData",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={AUDIT_LOG_FIELD[column.id]} />
    ),
    cell: ({ row }) => <div className="w-50 truncate">{row.original?.oldData || ""}</div>,
  },
  {
    accessorKey: "newData",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={AUDIT_LOG_FIELD[column.id]} />
    ),
    cell: ({ row }) => <div className="w-50 truncate">{row.original?.newData || ""}</div>,
  },
  {
    accessorKey: "changedFields",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={AUDIT_LOG_FIELD[column.id]} />
    ),
    cell: ({ row }) => 
      <div className="w-50 truncate">
        {row.original?.changedFields || ""}
      </div>,
  },
  {
    accessorKey: "userId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={AUDIT_LOG_FIELD[column.id]} />
    ),
    cell: ({ row }) => <div className="truncate">{row.original?.userId || ""}</div>,
  },
  {
    accessorKey: "userEmail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={AUDIT_LOG_FIELD[column.id]} />
    ),
    cell: ({ row }) => <div className="w-50 truncate">{row.original?.userEmail || ""}</div>,
  },
  {
    accessorKey: "ipAddress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={AUDIT_LOG_FIELD[column.id]} />
    ),
    cell: ({ row }) => 
      <div className="w-50 truncate">
        {row.original?.ipAddress || ""}
      </div>,
  },
  {
    accessorKey: "endpoint",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={AUDIT_LOG_FIELD[column.id]} />
    ),
    cell: ({ row }) => <div className="w-50 truncate">{row.original.endpoint || ""}</div>
  },
  {
    accessorKey: "method",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={AUDIT_LOG_FIELD[column.id]} />
    ),
    cell: ({ row }) => <div className="truncate">{row.original.method || ""}</div>
  },
  {
    accessorKey: "traceId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={AUDIT_LOG_FIELD[column.id]} />
    ),
    cell: ({ row }) => <div className="truncate">{row.original.traceId || ""}</div>
  },
  {
    accessorKey: "createAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={AUDIT_LOG_FIELD[column.id]} />
    ),
    cell: ({ row }) => 
      <TooltipRender tooltip={formatRelative(row.original.createAt)}>
        <div className="truncate">{formatDateTime(row.original.createAt) || ""}</div>
      </TooltipRender>
  },
]