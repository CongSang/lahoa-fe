import { Category, StatusCommon } from "@/types/index"

export interface Product {
  id: string
  name: string
  description?: string
  slug: string
  mainImage: string
  price: number
  displayOrder?: number
  status: StatusCommon
  primaryCategory: Category
  categories: Category[]
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
}

export interface ProductFilterRequest {
  keyword: string
  status: StatusCommon | null
  categoryId: number | null
  minPrice: number | null
  maxPrice: number | null
  propertyValueIds: Record<string, string[]>
}

export const PRODUCT_FIELD: Record<string, string> = {
  id: "ID",
  name: "Tên",
  description: "Mô tả",
  slug: "Đường dẫn",
  mainImage: "Ảnh",
  displayOrder: "TT hiển thị",
  price: "Giá tiền",
  status: "Trạng thái",
  primaryCategory: "Danh mục chính",
  categories: "Danh mục",
  seoTitle: "Tiêu đề SEO",
  seoDescription: "Mô tả SEO",
  seoKeywords: "Từ khóa SEO",
}