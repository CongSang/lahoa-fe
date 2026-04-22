"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/index"
import { StatusCommon } from "@/types/common"

interface DropdownStatusProps {
  items: { 
    label: string, 
    value: string 
  }[],
  value: StatusCommon
  onChange: (value: string) => void
}

export const DropdownStatus = ({ items, value, onChange }: DropdownStatusProps) => {
  return (
    <Select value={value} onValueChange={(value) => onChange(value)}>
      <SelectTrigger>
        <SelectValue placeholder="Trạng thái" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="ALL">Tất cả</SelectItem>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
