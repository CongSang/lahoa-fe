import { Button, Spinner } from "@/components/index"
import { DataTable } from "./data-table"
import { Plus } from "lucide-react"
import { Suspense } from "react"

const Categories = () => {
  return (
    <div>
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Danh mục</h2>

        <Button size="lg">
          <Plus />
          Thêm danh mục
        </Button>
      </div>

      <Suspense fallback={
        <div className="w-full flex items-center justify-center h-[50vh]">
          <Spinner className="size-6" />
        </div>
      }>
        <DataTable />
      </Suspense>
    </div>
  )
}

export default Categories