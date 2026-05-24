import { StatusCommon } from "./common"

export type materialStatus = 
  | 'ACTIVE'
  | 'INACTIVE'
  | 'DELETED'

export interface Material {
  id: string
  categoryId: string
  categoryName: string
  code: string
  name: string
  unit: string
  thumbnail?: string
  thumbnailPublicId?: string
  defaultCost: string
  status?: materialStatus
  lowStockThreshold: number
}

export interface MaterialFilterRequest {
  keyword?: string
  categoryId?: string
  lowStock?: string
  status?: StatusCommon | null
}

export const MATERIAL_FIELD: Record<string, string> = {
  id: "ID",
  categoryName: "Thuộc danh mục",
  code: "Mã",
  name: "Tên",
  unit: "Đơn vị",
  thumbnail: "Ảnh",
  defaultCost: "Giá vốn",
  status: "Trạng thái",
  lowStockThreshold: "Ngưỡng cảnh báo tồn kho thấp"
}

export const MATERIAL_UNIT_LABEL: Record<string, string> = {
  STEM: "Cành",
  BUNDLE: "Bó",
  SHEET: "Tờ",
  ROLL: "Cuộn",
  PIECE: "Cái",
  BOX: "Hộp",
  METER: "Mét",
}

export const MATERIAL_UNIT_OPTIONS = [
  {
    label: 'Cành',
    value: 'STEM',
  },
  {
    label: 'Bó',
    value: 'BUNDLE',
  },
  {
    label: 'Tờ',
    value: 'SHEET',
  },
  {
    label: 'Cuộn',
    value: 'ROLL',
  },
  {
    label: 'Cái',
    value: 'PIECE',
  },
  {
    label: 'Hộp',
    value: 'BOX',
  },
  {
    label: 'Mét',
    value: 'METER',
  },
]