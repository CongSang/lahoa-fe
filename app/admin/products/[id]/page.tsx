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
      <UpsertProductForm mode="edit" productId={id} />
    </HydrationBoundary>
  )
}

export default EditProductPage
