import {
  Button,
  Field,
  FieldLabel,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/index"
import { type Table } from "@tanstack/react-table"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export function DataTablePagination<TData>({
  table,
  prefetchNextPage
}: {
  table: Table<TData>
  prefetchNextPage: () => void;
}) {
  const getPaginationRange = (currentPage: number, totalPages: number) => {
    if (totalPages <= 7) {
      return Array.from(
        { length: totalPages },
        (_, i) => i + 1
      )
    }

    if (currentPage <= 2) {
      return [
        1,
        2,
        3,
        '...',
        totalPages,
      ]
    }

    if (currentPage >= totalPages - 1) {
      return [
        1,
        '...',
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ]
    }

    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ]
  };

  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();
  const paginationRange = getPaginationRange(currentPage, totalPages);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 w-full">
      <Field orientation="horizontal" className="w-fit">
        <FieldLabel htmlFor="select-rows-per-page">Hiển thị </FieldLabel>
        <Select 
          disabled={!totalPages}
          value={table.getState().pagination.pageSize.toString()}
          onValueChange={(value) => table.setPageSize(Number(value))}
        >
          <SelectTrigger className="w-20" id="select-rows-per-page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectGroup>
              {[10, 15, 30, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>

      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <Button 
              variant="ghost" 
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              <ChevronLeftIcon data-icon="inline-end" />
              <span className="hidden sm:block">Trước</span>
            </Button>
          </PaginationItem>

          {paginationRange.map((page, index) => {
            if (page === '...') {
              return (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            }

            return (
              <PaginationItem key={index}>
                <Button
                  onClick={() => {if(page !== currentPage) table.setPageIndex((page as number) - 1)}}
                  variant={page === currentPage ? "outline" : "ghost"}
                  className="w-8 h-8"
                >
                  {page}
                </Button>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <Button 
              variant="ghost" 
              disabled={!table.getCanNextPage()}
              onMouseEnter={() => prefetchNextPage()}
              onClick={() => table.nextPage()}
            >
              <span className="hidden sm:block">Sau</span>
              <ChevronRightIcon data-icon="inline-end" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
