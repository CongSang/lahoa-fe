'use client'
import { CircleUserRound, LogIn, LogOut, Search, ShoppingBag, User, UserRoundPen } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useUserStore } from 'store/index'
import { logoutApi } from '@/services/index'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useOutsideClick } from '@/hooks/index'
import { DropdownPopup } from '@/components/index'

export const Header = () => {
  const { user, logout } = useUserStore()
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useOutsideClick<HTMLDivElement>(() => setShowUserMenu(false));

  const handleLogout = async () => {
    await logoutApi().then(() => {
      logout();
    })
    .catch(() => {
      toast.error('Có lỗi khi đăng xuất. Vui lòng thử lại.');
    })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-300 bg-white">
      <div className="flex h-16 items-center justify-between px-4 md:px-8 md:h-20">
        <div className="flex items-center gap-3">
          <Link className="flex flex-col items-center gap-0" href="/">
            <Image 
              loading='eager'
              src="/images/logo.png" 
              alt="Logo" 
              width={160} 
              height={100}
              className='w-30 md:w-32 h-14 md:h-16 object-cover' 
            />
          </Link>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button aria-label="Tìm kiếm" className="flex items-center justify-center gap-2 px-1 py-2 text-gray-900 transition-colors hover:text-gray-600">
            <Search className='w-5 h-5 md:w-6 md:h-6' />
            <span className="hidden text-sm font-medium lg:inline">Tìm kiếm</span>
          </button>
          
          <button aria-label="Giỏ hàng" className="rounded-full text-sm font-medium hover:bg-gray-100 size-9 relative flex items-center justify-center">
            <ShoppingBag className='w-5 h-5 md:w-6 md:h-6' />
            <span className="border border-transparent font-medium whitespace-nowrap shrink-0 overflow-hidden bg-red-600 text-white absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs">2</span>
          </button>
          
          <div ref={userMenuRef} className="relative">
            {user?.userImageUrl ? (
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="hover:bg-gray-100 size-9 rounded-full transition-colors flex items-center justify-center"
              >
                <Image 
                  src={user?.userImageUrl || ''}
                  alt="Profile"
                  width={108}
                  height={108}
                  className="w-6 h-6 md:w-7 md:h-7 rounded-full object-cover shadow"
                />
              </button>
            ) : (
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="hover:bg-gray-100 size-9 rounded-full transition-colors flex items-center justify-center"
              >
                <CircleUserRound className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            )}

            {showUserMenu && (
              <DropdownPopup
                className="mt-2 w-56"
              >
                {user ? (
                  <>
                    {/* User info */}
                    <div className="px-4 py-3 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                          {user?.userImageUrl ? (
                              <Image 
                                  src={user.userImageUrl}
                                  alt="Profile"
                                  width={48}
                                  height={48}
                                  className="w-8 h-8 rounded-full object-cover"
                              />
                          ) : (
                              <User className="w-4 h-4 text-primary" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">
                              {user?.fullName || ""}
                          </p>
                          <p className="text-xs text-gray-500 truncate">{user?.email || ""}</p>
                        </div>
                      </div>
                    </div>

                    {/* Logout button */}
                    <div className="py-1">
                        <button 
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        >
                            <LogOut className="w-4 h-4 text-gray-500" />
                            <span>Đăng xuất</span>
                        </button>
                    </div>
                  </>
                ) : (
                  <div className="py-1">
                    <Link
                      href={'/login'}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <LogIn className="w-4 h-4 text-gray-600" />
                      <span>Đăng nhập</span>
                    </Link>

                    <Link
                      href={'/register'}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <UserRoundPen className="w-4 h-4 text-gray-600" />
                      <span>Đăng kí</span>
                    </Link>
                </div>
                )}
              </DropdownPopup>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}