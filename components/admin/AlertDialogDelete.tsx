import { Trash2Icon } from "lucide-react"

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

interface ItemProps {
  id?: number | string
  name?: string
}

interface AlertDialogDeleteProps<T extends ItemProps> {
  isLoading?: boolean
  open: boolean
  setOpen: (open: boolean) => void
  onDelete: () => void
  feature: string
  customMsg?: string
  item: T | null
}

export function AlertDialogDelete<T extends ItemProps>({ isLoading, customMsg, feature, item, open, setOpen, onDelete }: AlertDialogDeleteProps<T>) {

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Xóa {feature?.toLowerCase()}?</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn xóa {feature?.toLowerCase()} <br />
            <span className="text-accent-foreground font-medium">Id: {item?.id}</span><br />
            {!customMsg ? (
              <>
                tên <span className="text-accent-foreground font-medium">{item?.name} </span><br />
              </>
            ) : (
              <>{customMsg}</>
            )}
            
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" disabled={isLoading}>
            Hủy
          </AlertDialogCancel>
          <AlertDialogAction 
            variant="destructive" 
            onClick={onDelete}
            disabled={isLoading}
          >
            Xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
