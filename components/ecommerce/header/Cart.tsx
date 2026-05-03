"use client"

import {
  Badge,
  Button,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/index"
import { ShoppingBagIcon } from "lucide-react"

export function Cart() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button aria-label="Giỏ hàng" variant="ghost" size="icon-lg" className="rounded-full relative">
          <ShoppingBagIcon className="w-9" />
          <Badge className="absolute top-0 right-0 h-4 w-4 text-[10px] p-0" variant="destructive_count">
            2
          </Badge>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full! sm:max-w-lg!">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBagIcon size={18} /> Giỏ hàng
          </SheetTitle>
        </SheetHeader>

        <div></div>
        
        <SheetFooter>
          <Button 
            type="submit"
            className="w-full btn-ec"
            size="lg"
          >
            Đặt hoa
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

