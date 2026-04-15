import { HeaderAdmin, AppInitializer, SidebarProvider, SidebarInset, SidebarAdmin } from '@/components/index'
import { LayoutProps } from 'types/index'

const AdminLayout = ({ children } : LayoutProps) => {
  return (
    <AppInitializer>
      <SidebarProvider>
        <SidebarAdmin />

        <SidebarInset>
          <HeaderAdmin />

          {children}
        </SidebarInset>
      </SidebarProvider>
      
    </AppInitializer>
  )
}

export default AdminLayout