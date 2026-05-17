import { Badge } from "@/components/index"
import { cn } from "@/lib/index";
import { STATUS_MAP, StatusCommon } from "@/types/index"

export function BadgeCustom({ status, className }: { status: StatusCommon, className?: string }) {
  const config = STATUS_MAP[status];

  return (
    <div>
      <Badge className={cn(config.className, className)}>
        {config.label}
      </Badge>
    </div>
  )
}
