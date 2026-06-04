import { MaterialReceiptForm } from '@/components/index'

const CreateMaterialReceipt = () => {
  return (
    <div>
      <h2 className="text-xl font-bold tracking-tight text-foreground mb-4 leading-8">
        Tạo phiếu nhập kho
      </h2>

      <MaterialReceiptForm mode="create" />
    </div>
  )
}

export default CreateMaterialReceipt