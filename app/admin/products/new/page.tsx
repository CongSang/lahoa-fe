import { UpsertProductForm } from "@/components/index"

const CreateProductPage = () => {
  return (
    <div>
      <h2 className="text-xl font-bold tracking-tight text-foreground mb-4 leading-8">
        Thêm sản phẩm
      </h2>

      <UpsertProductForm mode="create" />
    </div>
  )
}

export default CreateProductPage