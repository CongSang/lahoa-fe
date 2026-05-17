import { Property } from "@/types/index"

type Status = 
  | 'ACTIVE'
  | 'INACTIVE'
  | 'DELETED'
  | 'OUT_OF_STOCK'

export interface Variant {
  id: string
  sku: string
  price: string
  stock: number
  status: Status
  default: boolean
  properties: Property[]
}

export const VARIANT_FIELD: Record<string, string> = {
  id: "ID",
  sku: "Mã biến thể",
  stock: "Còn hàng",
  price: "Giá tiền",
  status: "Trạng thái",
  default: "Biến thể chính",
  properties: "Thuộc tính",
}