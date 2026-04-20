"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
  Button,
} from "@/components/index"
import { Search, RefreshCcw } from "lucide-react"

interface DataTableFilterSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onApply: () => void
  onReset: () => void
  children: React.ReactNode
}

export function DataTableFilterSheet({
  isOpen,
  onOpenChange,
  onApply,
  onReset,
  children,
}: DataTableFilterSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange} modal={true}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            Bộ lọc nâng cao
          </SheetTitle>
          <SheetDescription>
            Tùy chỉnh các tiêu chí để tìm kiếm chính xác hơn.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 px-4 overflow-y-auto">
          <div className="space-y-4">
            {children}
          </div>
        </div>

        <SheetFooter className="flex-row gap-2 sm:space-x-0">
          <Button 
            type="button"
            variant="outline" 
            onClick={onReset}
            className="flex-1"
          >
            <RefreshCcw />
            Làm mới
          </Button>
          <Button 
            type="button"
            onClick={onApply}
            className="flex-1"
          >
            <Search />
            Áp dụng
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}