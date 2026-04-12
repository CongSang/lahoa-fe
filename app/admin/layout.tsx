import React from 'react'
import { LayoutProps } from 'types/index'

const AdminLayout = ({ children } : LayoutProps) => {
  return (
    <div>
      <div>Admin header</div>
      {children}
    </div>
  )
}

export default AdminLayout