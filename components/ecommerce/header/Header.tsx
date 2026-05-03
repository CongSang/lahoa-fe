'use client'

import { UserMenu } from './UserMenu'
import { Cart } from './Cart'
import { SearchCommand } from './SearchCommand'
import { Logo } from '@/components/index'

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-300 bg-white">
      <div className="flex h-16 items-center justify-between px-4 md:px-8 md:h-20 gap-2">
        <Logo className='w-30 md:w-32 h-14 md:h-16' />
        
        <div className="flex items-center justify-center gap-1 sm:gap-2">
          <SearchCommand />
          
          <Cart />
    
          <UserMenu />
        </div>
      </div>
    </header>
  )
}