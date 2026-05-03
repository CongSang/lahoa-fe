import { LayoutProps } from 'types/index'
import { Header, Footer } from '@/components/ecommerce/index'
import { AppInitializer } from '@/components/index'

const HomeLayout = async ({ children } : LayoutProps) => {

  return (
    <AppInitializer>
      <Header />

      <main className='min-h-[80vh] w-full px-4 md:px-8 overflow-y-auto'>
        {children}
      </main>

      <Footer />
    </AppInitializer>
  )
}

export default HomeLayout