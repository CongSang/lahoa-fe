import { categoryStatus } from "./category"
import { StatusCommon } from "./common"


export interface MaterialCategory {
  id: string
  name: string
  description?: string
  status?: categoryStatus
  materialCount: string
}

export interface MaterialCategoryFilterRequest {
  keyword: string
  status: StatusCommon | null
}

export const MATERIAL_CATEGORY_FIELD: Record<string, string> = {
  id: "ID",
  name: "Tên",
  description: "Mô tả",
  status: "Trạng thái",
  materialCount: "Nguyên liệu"
}