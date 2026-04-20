'use client'
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DynamicBreadcrumb, SidebarTrigger } from '@/components/index'
import { Bell, LogOut, Moon, Settings2, Shield, Sun } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/index'
import { useTheme } from 'next-themes'
import { useUserStore } from '@/store/index'
import { logoutApi } from '@/services/index'
import toast from 'react-hot-toast'

export const HeaderAdmin = () => {
  const { setTheme, theme } = useTheme()
  const { user, logout } = useUserStore()

  const toggleTheme = () => {
    if(theme === 'light') {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }

  const handleLogout = async () => {
    try {
      await logoutApi()
      logout();
      setTheme("light")
    } catch {
      toast.error('Có lỗi khi đăng xuất. Vui lòng thử lại.');
    }
  }

  return (
    <header className="h-14 border-b shrink-0 bg-background flex items-center justify-between px-4 sticky top-0 z-10">
      <div className='flex items-center shrink-0 justify-center'>
        <SidebarTrigger className="-ml-1" />
        <div className="hidden sm:block h-4 w-px bg-gray-200 mr-2"></div>
        <DynamicBreadcrumb />
      </div>

      <div className="flex items-center gap-2 lg:gap-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 h-3.5 w-3.5 text-white rounded-full text-[10px] bg-red-500 font-medium flex items-center justify-center">2</span>
        </Button>
        <div className="h-4 w-px bg-gray-200 mx-1"></div>
        <Button onClick={toggleTheme} variant="ghost" size="icon" className='hidden md:flex'>
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
        <div className="h-4 w-px bg-slate-200 mx-1 hidden md:block"></div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage src={user?.userImageUrl} alt={user?.fullName} />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={"bottom"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.userImageUrl} alt={user?.fullName} />
                  <AvatarFallback className="rounded-lg">AD</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.fullName}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={toggleTheme} className='flex md:hidden'>
                {theme === 'light' ? (
                  <>
                    <Moon />
                    Giao diện tối
                  </>
                ) : (
                  <>
                    <Sun />
                    Giao diện sáng
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Shield />
                Bảo mật
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Thông báo
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings2 />
                Cài đặt tài khoản
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                <LogOut />
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
