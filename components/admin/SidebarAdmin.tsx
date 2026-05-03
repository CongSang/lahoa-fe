'use client'
import React from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, NavMain } from '@/components/index'
import { Flower2 } from 'lucide-react'
import { dataNavbar } from '@/lib/index'

export const SidebarAdmin = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="relative flex size-8 aspect-square items-center justify-center rounded-lg bg-linear-to-br from-rose-200 to-teal-50 shadow-sm border border-rose-200/50">
                <Flower2
                  size={24} 
                  strokeWidth={1.5}
                  className="text-rose-500 drop-shadow-sm" 
                />
                <div className="absolute top-1 right-1 h-2 w-2 rounded-full bg-white opacity-60"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight font-mono leading-none truncate">
                  LA HOA
                </span>
                <span className="text-[10px] font-medium font-mono tracking-[0.2em] text-rose-400 mt-1 truncate">
                  Art from soul
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={dataNavbar.navMain} />
      </SidebarContent>

      <SidebarFooter>
        {/* <NavUser /> */}
      </SidebarFooter>
    </Sidebar>
  )
}
