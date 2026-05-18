'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Button,
  DropdownMenuLabel,
} from "@/components/index"
import { ACCOUNT_QUERY_KEY } from "@/hooks/index"
import { logoutApi } from "@/services/index"
import { useUserStore } from "@/stores/index"
import { useQueryClient } from "@tanstack/react-query"
import { LogIn, LogOut, User, UserRoundPen } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function UserMenu() {
  const { user, logout } = useUserStore()
  const router = useRouter()
  const queryClient = useQueryClient()

  const handleLogout = async () => {
    try {
      await logoutApi()
    } catch(err) {
      console.error("Logout error", err)
    } finally {
      queryClient.removeQueries({
        queryKey:
          ACCOUNT_QUERY_KEY,
      })

      logout()

      router.replace('/')

      router.refresh()
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label="Menu" variant="ghost" size="icon" className="rounded-full ml-2">
          <Avatar>
            <AvatarImage src={user?.userImageUrl || undefined} alt="avatar" />
            <AvatarFallback><User /></AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side={"bottom"}
        align="end"
        sideOffset={4}
      >
        {user ? (
          <>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar>
                  <AvatarImage src={user?.userImageUrl} alt="avatar" />
                  <AvatarFallback><User /></AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.fullName}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>Thông tin tài khoản</DropdownMenuItem>
              <DropdownMenuItem>Lịch sử mua hàng</DropdownMenuItem>
              <DropdownMenuItem>Đổi mật khẩu</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                <LogOut />
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        ) : (
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link
                href={'/login'}
                className="flex items-center justify-start gap-2"
              >
                <LogIn />
                <span>Đăng nhập</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={'/register'}
                className="flex items-center justify-start gap-2"
              >
                <UserRoundPen/>
                <span>Đăng kí</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
