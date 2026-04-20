// TableSkeleton.tsx
import { TableCell, TableRow, Skeleton } from "@/components/index"

export function DataTableSkeleton({ columns, rows = 10 }: { columns: number, rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={i}>
          <TableCell className="py-3.5" >
            <Skeleton className="h-4 w-4 rounded-xs animate-pulse bg-muted" />
          </TableCell>
          {Array.from({ length: columns - 1 }).map((_, j) => (
            <TableCell key={j} className="py-3" >
              <Skeleton className="h-4 w-full animate-pulse bg-muted" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}