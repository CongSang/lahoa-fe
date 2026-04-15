'use client'
import React from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, NavMain, NavUser } from '@/components/index'
import { FlowerIcon } from 'lucide-react'
import { dataNavbar } from '@/lib/index'

export const SidebarAdmin = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size={'lg'}
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-foreground text-sidebar-primary-foreground">
                <FlowerIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">LA HOA</span>
                <span className="truncate text-xs">Art from soul</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={dataNavbar.navMain} label='Quản lý' />
        <NavMain items={dataNavbar.navSetting} label='Cấu hình' />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
