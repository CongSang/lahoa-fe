"use client"

import { type Table } from "@tanstack/react-table"
import { Columns2 } from "lucide-react"

import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  TooltipRender,
} from "@/components/index"

export function DataTableViewOptions<TData>({
  table,
  fieldName
}: {
  table: Table<TData>
  fieldName: Record<string, string>
}) {
  return (
    <DropdownMenu>
      <TooltipRender tooltip="Ẩn/ hiện cột">
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="icon"
          >
            <Columns2 />
          </Button>
        </DropdownMenuTrigger>
      </TooltipRender>
      <DropdownMenuContent align="end" className="w-36">
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {fieldName[column.id]}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
