import { type Column } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/index"

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
  side?: "right" | "left"
  sort?: boolean
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  side = "left",
  sort = true
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn("flex items-center gap-2", side === "right" && "justify-end",  className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn("data-[state=open]:bg-accent", side === "left" ? "-ml-2.5" : "-mr-2.5")}
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDown />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp />
            ) : (
              <ChevronsUpDown />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={side === "left" ? "start" : "end"}>
          {sort && (
            <>
              <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                <ArrowUp />
                Tăng
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                <ArrowDown />
                Giảm
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOff />
            Ẩn cột
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
