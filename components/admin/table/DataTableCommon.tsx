import { ColumnDef, flexRender, Table as TableType } from '@tanstack/react-table'
import { Button, DataTableSkeleton, Empty, EmptyContent, EmptyHeader, EmptyMedia, EmptyTitle, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/index'
import { Download, Folder, Plus, SearchX } from 'lucide-react'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  table: TableType<TData>
  isLoading: boolean
  emptyLabel: string
  isFiltering: () => boolean
  onReset: () => void
  handleOpenDialog: (data?: Partial<TValue>) => void
}

export function DataTableCommon<TData, TValue> ({ 
  columns, 
  table, 
  isLoading, 
  isFiltering, 
  emptyLabel,
  onReset,
  handleOpenDialog
}: DataTableProps<TData, TValue>) {
  return (
    <div className="overflow-hidden rounded-sm border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-muted/50 hover:bg-muted/50">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <DataTableSkeleton columns={columns.length} rows={10} />
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {isFiltering() ? (
                  <div className="flex flex-col items-center gap-2 py-4">
                    <SearchX className="h-8 w-8 text-muted-foreground" />
                    <p className='text-accent-foreground'>Không tìm thấy kết quả</p>
                    <Button variant="outline" onClick={onReset}>Xóa bộ lọc</Button>
                  </div>
                ) : (
                  <Empty>
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <Folder />
                      </EmptyMedia>
                      <EmptyTitle>{emptyLabel}</EmptyTitle>
                    </EmptyHeader>
                    <EmptyContent className="flex-row justify-center gap-2">
                      <Button onClick={() => handleOpenDialog()}><Plus />Tạo mới</Button>
                      <Button variant="outline"><Download />Nhập excel</Button>
                    </EmptyContent>
                  </Empty>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
