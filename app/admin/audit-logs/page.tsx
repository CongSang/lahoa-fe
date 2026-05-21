"use client"

import { Spinner } from '@/components/index';
import { AuditLog } from '@/types/index';
import { Suspense, useState } from 'react'
import { DataTable } from './data-table';

const AuditLogs = () => {
  const [open, setOpen] = useState(false);
  const [initialData, setInitialData] = useState<Partial<AuditLog> | undefined>(undefined);

  const handleOpenDialog = (data?: Partial<AuditLog>) => {
    setInitialData(data)
    setOpen(true)
  }

  return (
    <div>
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Nhật kí thay đổi</h2>
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

export default AuditLogs