export interface InventoryReceipt {
  id: string
  code: string
  supplier: string
  note: string
  warehouseName: string
  totalCost: string
  createdAt: string
  createdBy: string
  itemCount: number
  details: InventoryReceiptDetail[]
}

export interface InventoryReceiptDetail {
  id: string
  materialName: string;
  quantity: number;
  unitCost: string
  subtotal: string
}

export interface InventoryReceiptFilterRequest {
  keyword?: string
  warehouseId?: string
  fromDate?: string
  toDate?: string
}

export const INVENTORY_RECEIPT_FIELD: Record<string, string> = {
  id: "ID",
  code: "Mã",
  supplier: "Nhà cung cấp",
  note: "Ghi chú",
  warehouseName: "Kho tiếp nhận",
  totalCost: "Tổng tiền",
  createdAt: "Ngày tạo",
  createdBy: "Người tạo",
  itemCount: "Số mặt hàng"
}

export const INVENTORY_RECEIPT_DETAIL_FIELD: Record<string, string> = {
  materialName: "Tên vật liệu",
  quantity: "Số lượng",
  unitCost: "Đơn giá",
  subtotal: "Thành tiền",
}