import { LayoutProps } from 'types/index'
import { Header, Footer } from '@/components/ecommerce/index'
import { Metadata } from 'next'
import { getCurrentUserServer } from '@/services/auth/server-api'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { ACCOUNT_QUERY_KEY } from '@/hooks/index'

export const metadata: Metadata = {
  title: 'LA HOA - Art From Soul',
  description:
    'LA HOA - Shop hoa nghệ thuật cao cấp, gửi trọn cảm xúc qua từng bó hoa.',
}

async function EcommerceLayout({
  children,
}: LayoutProps) {
  const queryClient = new QueryClient()

  const user = await getCurrentUserServer()

  if (user) {
    queryClient.setQueryData(
      ACCOUNT_QUERY_KEY,
      user
    )
  }


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Header />

      <main className='min-h-[80vh] w-full px-4 md:px-8 overflow-y-auto'>
        {children}
      </main>

      <Footer />
    </HydrationBoundary>
  )
}

export default EcommerceLayout