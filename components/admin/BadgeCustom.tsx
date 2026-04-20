import { Badge } from "@/components/index"
import { STATUS_MAP, StatusCommon } from "@/types/index"

export function BadgeCustom({ status }: { status: StatusCommon }) {
  const config = STATUS_MAP[status];

  return (
    <div>
      <Badge className={config.className}>
        {config.label}
      </Badge>
    </div>
  )
}
