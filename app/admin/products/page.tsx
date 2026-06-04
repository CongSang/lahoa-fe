'use client'

import { Button, Spinner } from '@/components/index'
import { Plus } from 'lucide-react'
import { Suspense } from 'react';
import { DataTable } from './data-table';
import { useRouter } from 'next/navigation';
import { ProductFormValues } from '@/schema/product';

const Products = () => {
  const route = useRouter();
  
  const handleOpenDialog = (data?: Partial<ProductFormValues>) => {
    if (data) {
      route.push(`/admin/products/${data.id}`)
    } else {
      route.push('/admin/products/new')
    }
  }

  return (
    <div>
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Sản phẩm</h2>

        <Button onClick={() => handleOpenDialog()}>
          <Plus />Thêm sản phẩm
        </Button>
      </div>

      <Suspense fallback={
        <div className="w-full flex items-center justify-center h-[50vh]">
          <Spinner className="size-6" />
        </div>
      }>
        <DataTable
          handleOpenDialog={handleOpenDialog}
        />
      </Suspense>
    </div>
  )
}

export default Products