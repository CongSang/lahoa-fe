import { Category, Property, StatusCommon, Variant } from "@/types/index"

type Status = 
  | 'ACTIVE'
  | 'INACTIVE'
  | 'DELETED'

export interface Product {
  id: string
  code: string
  name: string
  description?: string
  slug: string
  mainImage: string
  imagePublicId: string
  basePrice: string
  displayOrder?: number
  status: Status
  primaryCategory: Category
  categories: Category[]
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string

  properties: Property[]
  variants: Variant[]
}

export interface ProductFilterRequest {
  keyword: string
  status: StatusCommon | null
  categoryId: string | null
  minPrice: string
  maxPrice: string
  propertyValueIds: Record<string, string[]>
}

export const PRODUCT_FIELD: Record<string, string> = {
  id: "ID",
  code: "Mã",
  name: "Tên",
  description: "Mô tả",
  slug: "Đường dẫn",
  mainImage: "Ảnh",
  displayOrder: "TT hiển thị",
  basePrice: "Giá tiền",
  status: "Trạng thái",
  properties: "Thuộc tính",
  primaryCategory: "Danh mục chính",
  categories: "Danh mục",
  variants: "Biến thể",
  seoTitle: "Tiêu đề SEO",
  seoDescription: "Mô tả SEO",
  seoKeywords: "Từ khóa SEO",
}