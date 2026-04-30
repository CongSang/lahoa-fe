import { Button } from '@/components/index'
import { Plus } from 'lucide-react'

const Products = () => {
  return (
    <div>
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Sản phẩm</h2>

        <Button size="lg"><Plus />Thêm sản phẩm</Button>
      </div>

      {/* <Suspense fallback={
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
      </Suspense> */}
    </div>
  )
}

export default Products