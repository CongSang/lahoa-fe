import { StockTakeForm } from "@/components/index"
import { getStockTakeByIdApi } from "@/services/index";
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
    queryKey: ["stocktake", id],
    queryFn: () => getStockTakeByIdApi(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StockTakeForm mode="detail" stocktakeId={id} />
    </HydrationBoundary>
  )
}

export default EditProductPage
