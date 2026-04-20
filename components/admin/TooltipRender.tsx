import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/index"
import { ReactNode } from "react"

interface TooltipRenderProps {
  children: ReactNode
  tooltip: string
}

export function TooltipRender({ children, tooltip }: TooltipRenderProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <div>{tooltip}</div>
      </TooltipContent>
    </Tooltip>
  )
}
