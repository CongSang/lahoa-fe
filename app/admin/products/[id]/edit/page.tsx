import { UpsertProductForm } from "@/components/index"
import { getProductByIdApi } from "@/services/index";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";



interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

const EditProductPage = async ({ params }: EditProductPageProps) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["product", id],
    queryFn: () => getProductByIdApi(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground mb-4 leading-8">
          Chỉnh sửa sản phẩm
        </h2>

        <UpsertProductForm mode="edit" productId={id} />
      </div>
    </HydrationBoundary>
  )
}

export default EditProductPage
