import { MaterialReceiptForm } from "@/components/index"
import { getMaterialReceiptByIdApi } from "@/services/index";
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
    queryKey: ["material-receipt", id],
    queryFn: () => getMaterialReceiptByIdApi(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MaterialReceiptForm mode="detail" receiptId={id} />
    </HydrationBoundary>
  )
}

export default EditProductPage
