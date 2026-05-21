import { AuditAction, AuditEntityType } from '@/types/index'

export const getAuditActionClass = (
  action: AuditAction
) => {
  switch (action) {
    case 'CREATE':
      return 'bg-emerald-500 hover:bg-emerald-600 text-white'

    case 'UPDATE':
      return 'bg-amber-500 hover:bg-amber-600 text-white'

    case 'DELETE':
      return 'bg-rose-500 hover:bg-rose-600 text-white'

    case 'RESTORE':
      return 'bg-cyan-500 hover:bg-cyan-600 text-white'

    case 'LOGIN':
      return 'bg-violet-500 hover:bg-violet-600 text-white'

    case 'LOGOUT':
      return 'bg-zinc-500 hover:bg-zinc-600 text-white'

    default:
      return ''
  }
}

export const getAuditEntityRoute = (
  entity: AuditEntityType,
  id: number
) => {
  switch (entity) {
    case 'PRODUCT':
      return `/admin/products/${id}/edit`

    case 'CATEGORY':
      // return `/admin/categories/${id}`
      return null

    case 'ORDER':
      return `/admin/orders/${id}`

    case 'USER':
      return `/admin/users/${id}`

    case 'INVENTORY':
      return `/admin/inventories/${id}`

    default:
      return null
  }
}