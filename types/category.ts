import { StatusCommon } from "@/types/index"

export interface Category {
  id: number
  name: string
  description?: string
  slug: string
  path: string
  imageUrl: string
  displayOrder?: number
  productCount?: number
  status?: StatusCommon
  parent?: Category 
  children?: Category[]
}

export interface CategoryFilterRequest {
  keyword: string
  status: StatusCommon | null
  parentId: number | null
}

export const CATEGORY_FIELD: Record<string, string> = {
  id: "Id",
  name: "Tên danh mục",
  description: "Mô tả",
  path: "Đường dẫn",
  imageUrl: "Ảnh đại diện",
  displayOrder: "TT hiển thị",
  productCount: "Sản phẩm",
  status: "Trạng thái",
  parent: "Danh mục cha"
}