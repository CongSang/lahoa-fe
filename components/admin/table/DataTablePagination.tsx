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
    const delta = 1;
    const range = [];
    const rangeWithDots = [];
    let l;

    range.push(1);

    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i > 1 && i < totalPages) {
        range.push(i);
      }
    }

    if (totalPages > 1) {
      range.push(totalPages);
    }

    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();
  const paginationRange = getPaginationRange(currentPage, totalPages);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 w-full">
      <Field orientation="horizontal" className="w-fit">
        <FieldLabel htmlFor="select-rows-per-page">Hiển thị </FieldLabel>
        <Select 
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
