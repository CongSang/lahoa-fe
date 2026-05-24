"use client"

import { Button, Spinner } from '@/components/index';
import { MaterialCategoryFormValues } from '@/schema/material-category';
import { Plus } from 'lucide-react';
import { Suspense, useState } from 'react'
import { DataTable } from './data-table';

const MaterialCategories = () => {
  const [open, setOpen] = useState(false);
  const [initialData, setInitialData] = useState<Partial<MaterialCategoryFormValues> | undefined>(undefined);

  const handleOpenDialog = (data?: Partial<MaterialCategoryFormValues>) => {
    setInitialData(data)
    setOpen(true)
  }

  return (
    <div>
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Danh mục nguyên liệu</h2>

        <Button onClick={() => handleOpenDialog()}>
          <Plus />Thêm danh mục
        </Button>
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

export default MaterialCategories