export type AuditEntityType =
  | 'USER'
  | 'PRODUCT'
  | 'CATEGORY'
  | 'ORDER'
  | 'INVENTORY'

export type AuditAction =
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'RESTORE'
  | 'LOGIN'
  | 'LOGOUT'

export interface AuditLog {
  id: number

  entityName: AuditEntityType
  entityId: number
  entityLabel: string

  action: AuditAction

  oldData?: string | null
  newData?: string | null
  changedFields?: string | null

  userId: number
  userEmail: string

  ipAddress?: string | null
  endpoint?: string | null
  method?: string | null

  traceId?: string | null

  createAt: string
}

export interface AuditLogFilterRequest {
  keyword?: string
  entityName?: AuditEntityType
  action?: AuditAction
  userId?: string
  fromDate?: string
  toDate?: string
}

export const AUDIT_LOG_FIELD: Record<string, string> = {
  id: "ID",

  entityName: "Đối tượng",
  entityId: "ID đối tượng",
  entityLabel: "Tên đối tượng",

  action: "Hành động",

  oldData: "Dữ liệu cũ",
  newData: "Dữ liệu mới",
  changedFields: "Trường thay đổi",

  userId: "ID người dùng",
  userEmail: "Người thực hiện",

  ipAddress: "Địa chỉ IP",
  endpoint: "API",
  method: "Phương thức",

  traceId: "Trace ID",

  createAt: "Thời gian"
}

export const AUDIT_ACTION_LABEL: Record<
  string,
  string
> = {
  CREATE: "Tạo mới",
  UPDATE: "Cập nhật",
  DELETE: "Xóa",
  RESTORE: "Khôi phục",
  LOGIN: "Đăng nhập",
  LOGOUT: "Đăng xuất",
}

export const AUDIT_ENTITY_LABEL: Record<
  string,
  string
> = {
  USER: "Người dùng",
  CATEGORY: "Danh mục",
  PRODUCT: "Sản phẩm",
  ORDER: "Đơn hàng",
  INVENTORY: "Nguyên liệu",
}

export const AUDIT_ENTITY_OPTIONS = [
  { value: 'USER', label: 'Người dùng' },
  { value: 'CATEGORY', label: 'Danh mục' },
  { value: 'PRODUCT', label: 'Sản phẩm' },
  { value: 'ORDER', label: 'Đơn hàng' },
  { value: 'INVENTORY', label: 'Thuộc tính' },
]

export const AUDIT_ACTION_OPTIONS = [
  { value: 'CREATE', label: 'Tạo mới' },
  { value: 'UPDATE', label: 'Cập nhật' },
  { value: 'DELETE', label: 'Xóa' },
  { value: 'RESTORE', label: 'Khôi phục' },
  { value: 'LOGIN', label: 'Đăng nhập' },
  { value: 'LOGOUT', label: 'Đăng xuất' },
]