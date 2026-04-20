import { HeaderAdmin, AppInitializer, SidebarProvider, SidebarInset, SidebarAdmin } from '@/components/index'
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

          <div className='p-4 h-full overflow-y-auto'>{children}</div>
        </SidebarInset>
      </SidebarProvider>
      
    </AppInitializer>
  )
}

export default AdminLayout