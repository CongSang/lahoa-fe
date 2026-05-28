import { StatusCommon } from "./common"

export type categoryStatus = 
  | 'ACTIVE'
  | 'INACTIVE'
  | 'DELETED'

export interface Category {
  id: string
  code: string
  name: string
  description?: string
  slug: string
  path: string
  imageUrl: string
  displayOrder?: number
  productCount?: number
  status?: categoryStatus
  parent?: Category 
  children?: Category[]  
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
}

export interface CategoryFilterRequest {
  keyword: string
  status: StatusCommon | null
  parentId: number | null
}

export const CATEGORY_FIELD: Record<string, string> = {
  id: "ID",
  code: "Mã",
  name: "Tên",
  description: "Mô tả",
  path: "Đường dẫn",
  imageUrl: "Ảnh",
  displayOrder: "TT hiển thị",
  productCount: "Sản phẩm",
  status: "Trạng thái",
  parent: "Danh mục cha",
  seoTitle: "Tiêu đề SEO",
  seoDescription: "Mô tả SEO",
  seoKeywords: "Từ khóa SEO",
}