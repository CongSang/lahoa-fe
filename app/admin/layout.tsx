import { HeaderAdmin, AppInitializer, SidebarProvider, SidebarInset, SidebarAdmin, CopyrightSection } from '@/components/index'
import { LayoutProps } from 'types/index'
import NextTopLoader from 'nextjs-toploader';

const AdminLayout = ({ children } : LayoutProps) => {
  return (
    <AppInitializer>
      <SidebarProvider>
        <SidebarAdmin />

        <SidebarInset className="flex flex-col h-screen overflow-hidden bg-accent">
          <HeaderAdmin />
          <NextTopLoader
            color="#f43f5e"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #f43f5e,0 0 5px #f43f5e"
          />

          <div className='p-4 flex-1 overflow-y-auto flex flex-col'>
            <main className='flex-1'>
              {children}
            </main>

            <footer>
              <CopyrightSection />
            </footer>
          </div>

          
        </SidebarInset>
      </SidebarProvider>
      
    </AppInitializer>
  )
}

export default AdminLayout