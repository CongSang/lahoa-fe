import { Option } from "./common"

export type InventoryMovementType =
  | 'IMPORT'
  | 'ADJUST'
  | 'CONSUME'
  | 'LOSS'
  | 'RETURN'
  | 'RESERVE'
  | 'RELEASE'

export type InventoryReferenceType =
  | 'ORDER'
  | 'PURCHASE_ORDER'
  | 'MANUAL'
  | 'STOCKTAKE'
  | 'REFUND'
  | 'SYSTEM'

export interface InventoryLog {
  id: string
  code: string
  materialId: string
  materialName: string
  materialStatus: string
  warehouseId: string
  warehouseName: string
  warehouseStatus: string
  type: InventoryMovementType
  quantity: number
  beforeOnHand: number
  afterOnHand: number
  beforeReserved: number
  afterReserved: number
  actorId: string
  actorName: string
  actorEmail: string
  referenceType: InventoryReferenceType
  referenceId: string
  referenceCode: string
  note: string
  createdAt: string
}

export interface InventoryLogFilterRequest {
  keyword?: string
  materialId?: string
  warehouseId?: string
  type?: InventoryMovementType
  referenceType?: InventoryReferenceType
  fromDate?: string
  toDate?: string
}

export const INVENTORY_LOG_FIELD: Record<string, string> = {
  code: "Mã",
  materialName: "Vật liệu",
  warehouseName: "Kho hàng",
  type: "Loại biến động",
  quantity: "Số lượng thay đổi",
  beforeOnHand: "Tồn đầu (Thực tế)",
  afterOnHand: "Tồn cuối (Thực tế)",
  beforeReserved: "Tồn giữ chỗ đầu",
  afterReserved: "Tồn giữ chỗ cuối",
  actorName: "Người thực hiện",
  referenceType: "Chứng từ gốc",
  referenceId: "Mã chứng từ",
  note: "Ghi chú",
  createdAt: "Thời gian"
}

export const INVENTORY_MOVEMENT_TYPE_LABELS: Record<InventoryMovementType, string> = {
  IMPORT: 'Nhập kho',
  ADJUST: 'Điều chỉnh (Kiểm kê)',
  CONSUME: 'Xuất tiêu hao (Cắm hoa)',
  LOSS: 'Xuất hủy (Hao hụt/Héo)',
  RETURN: 'Trả hàng',
  RESERVE: 'Giữ chỗ (Khách đặt)',
  RELEASE: 'Giải phóng giữ chỗ',
}

export const INVENTORY_REFERENCE_TYPE_LABELS: Record<InventoryReferenceType, string> = {
  ORDER: 'Đơn bán hàng',
  PURCHASE_ORDER: 'Phiếu nhập kho',
  STOCKTAKE: 'Phiếu kiểm kê',
  REFUND: 'Đơn trả hàng',
  MANUAL: 'Thao tác thủ công',
  SYSTEM: 'Hệ thống tự động',
}

export const INVENTORY_MOVEMENT_TYPE_BADGES: Record<
  InventoryMovementType, 
  { variant: 'default' | 'secondary' | 'destructive' | 'outline', className: string }
> = {
  IMPORT: { variant: 'default', className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-none' },
  ADJUST: { variant: 'secondary', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-none' },
  CONSUME: { variant: 'outline', className: 'bg-gray-100 text-gray-800 border-none' },
  LOSS: { variant: 'destructive', className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-none' },
  RETURN: { variant: 'outline', className: 'bg-purple-100 text-purple-800 border-none' },
  RESERVE: { variant: 'outline', className: 'bg-orange-100 text-orange-800 border-none' },
  RELEASE: { variant: 'outline', className: 'bg-teal-100 text-teal-800 border-none' },
}

export const INVENTORY_MOVEMENT_TYPE_OPTIONS: Option[] = Object.entries(INVENTORY_MOVEMENT_TYPE_LABELS).map(
  ([value, label]) => ({
    label,
    value,
  })
)

export const INVENTORY_REFERENCE_TYPE_OPTIONS: Option[] = Object.entries(INVENTORY_REFERENCE_TYPE_LABELS).map(
  ([value, label]) => ({
    label,
    value,
  })
)