export interface StockTake {
  id: string
  code: string
  note: string
  warehouseName: string
  totalItems: string
  createdAt: string
  createdBy: string
  totalDifference: number
  details: StockTakeDetail[]
}

export interface StockTakeDetail {
  id: string
  materialName: string;
  systemQty: number;
  actualQty: number;
  difference: number;
}

export interface StockTakeFilterRequest {
  keyword?: string
  warehouseId?: string
  fromDate?: string
  toDate?: string
}

export const STOCK_TAKE_FIELD: Record<string, string> = {
  id: "ID",
  code: "Mã",
  note: "Ghi chú",
  warehouseName: "Kho tiếp nhận",
  totalItems: "Số mặt hàng",
  createdAt: "Ngày tạo",
  createdBy: "Người tạo",
  totalDifference: "Tổng chênh lệch"
}

export const STOCK_TAKE_DETAIL_FIELD: Record<string, string> = {
  materialName: "Tên vật liệu",
  unit: "Đơn vị",
  systemQty: "Số lượng hệ thống",
  actualQty: "Số lượng thực tế",
  difference: "Chênh lệch",
}