"use client"

import { Button, Spinner } from "@/components/index"
import { DataTable } from "./data-table"
import { Suspense, useState } from "react"
import { Plus } from "lucide-react"
import { CategoryFormValues } from "@/schema/category"

const Categories = () => {
  const [open, setOpen] = useState(false);
  const [initialData, setInitialData] = useState<Partial<CategoryFormValues> | undefined>(undefined);

  const handleOpenDialog = (data?: Partial<CategoryFormValues>) => {
    setInitialData(data)
    setOpen(true)
  }

  return (
    <div>
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Danh mục</h2>

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

export default Categories