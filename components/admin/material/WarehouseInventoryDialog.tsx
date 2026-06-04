"use client"

import {
  DataTableSkeleton,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  getColumnsWarehouse,
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/index";
import { getWarehouseInventoriesApi } from "@/services/materialService";
import { Material } from "@/types/index";
import { useQuery } from "@tanstack/react-query";
import { flexRender, getCoreRowModel, useReactTable, VisibilityState } from "@tanstack/react-table";
import { useMemo, useState } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  material: Material | null;
}

export function WarehouseInventoryDialog({
  open,
  onOpenChange,
  material,
}: Props) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const { data, isLoading } = useQuery({
    queryKey: [
      "material-warehouses",
      material?.id,
    ],
    queryFn: async () => {
      return getWarehouseInventoriesApi(material!.id);
    },
    enabled: open && !!material?.id,
  });

  const columns = useMemo(() => getColumnsWarehouse(), []);

  const inventories = useMemo(
    () => data ?? [],
    [data]
  );

  const table = useReactTable({
    data: inventories || [],
    columns,
    enableRowSelection: false,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility,
    },
  })

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>
            Tồn vật liệu theo kho
          </DialogTitle>
          <DialogDescription className="sr-only">
            ID: {material?.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 w-full overflow-hidden ">
          <div className="font-medium">
            {material?.name}
          </div>

          <div className="rounded-sm border">
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
                  <DataTableSkeleton columns={columns.length} rows={1} />
                ) : table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
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
                        <div className="flex flex-col items-center gap-2 py-4">
                          <p className='text-accent-foreground'>Chưa nhập vật liệu</p>
                        </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
