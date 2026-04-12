import React from 'react'
import { LayoutProps } from 'types/index'
import { Header } from '@/components/ecommerce/index'
import { AppInitializer } from '@/components/auth'

const HomeLayout = ({ children } : LayoutProps) => {
  return (
    <AppInitializer>
      <Header />

      <main className='min-h-[80vh] w-full px-4 md:px-8 overflow-y-auto'>
        {children}
      </main>
    </AppInitializer>
  )
}

export default HomeLayout