"use client"

import { Spinner } from '@/components/index';
import { InventoryLog } from '@/types/index';
import { Suspense, useState } from 'react'
import { DataTable } from './data-table';

const InventoryLogs = () => {
  const [open, setOpen] = useState(false);
  const [initialData, setInitialData] = useState<Partial<InventoryLog> | undefined>(undefined);

  const handleOpenDialog = (data?: Partial<InventoryLog>) => {
    setInitialData(data)
    setOpen(true)
  }

  return (
    <div>
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Nhật kí biến động kho</h2>
      </div>

      <Suspense fallback={
        <div className="w-full flex items-center justify-center h-[50vh]">
          <Spinner className="size-6" />
        </div>
      }>
        <DataTable 
          initialData={initialData}
          openDialog={open} 
          setOpenDialog={setOpen} 
          handleOpenDialog={handleOpenDialog}
        />
      </Suspense>
    </div>
  )
}

export default InventoryLogs