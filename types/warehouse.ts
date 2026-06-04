import { categoryStatus } from "./category"
import { StatusCommon } from "./common"


export interface Warehouse {
  id: string
  code: string
  name: string
  address: string
  status?: categoryStatus
  materialCount: string
}

export interface WarehouseFilterRequest {
  keyword: string
  status: StatusCommon | null
}

export const WAREHOUSE_FIELD: Record<string, string> = {
  id: "ID",
  code: "Mã",
  name: "Tên",
  address: "Địa chỉ",
  status: "Trạng thái",
  materialCount: "Số vật liệu còn tồn"
}