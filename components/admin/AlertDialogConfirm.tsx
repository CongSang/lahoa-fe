import { Info, Trash2Icon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/index"
import { cn } from "@/lib/index";
import { AlertDialogType } from "@/types/index";


interface AlertDialogConfirmProps {
  type: AlertDialogType
  isLoading: boolean
  open: boolean
  setOpen: (open: boolean) => void
  onConfirm: () => void
  title: string
  description?: string
}

export function AlertDialogConfirm({ type, isLoading, title, description, open, setOpen, onConfirm }: AlertDialogConfirmProps) {

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className={cn(type === "delete" ? "bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive" : "")}>
            {type === "delete" ? (
              <Trash2Icon />
            ) : (
              <Info />
            )}
          </AlertDialogMedia>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" disabled={isLoading}>
            Hủy
          </AlertDialogCancel>
          <AlertDialogAction 
            variant={type === "delete" ? "destructive" : "default"} 
            onClick={onConfirm}
            disabled={isLoading}
          >
            {type === "delete" ? "Xóa" : "Xác nhận"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
