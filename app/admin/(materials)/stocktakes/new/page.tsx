import { StockTakeForm } from '@/components/index'

const CreateMaterialReceipt = () => {
  return (
    <div>
      <h2 className="text-xl font-bold tracking-tight text-foreground mb-4 leading-8">
        Tạo phiếu kiểm kê
      </h2>

      <StockTakeForm mode="create" />
    </div>
  )
}

export default CreateMaterialReceipt