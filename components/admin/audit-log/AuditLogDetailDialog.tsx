'use client'

import {
  Badge,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/index'
import { AUDIT_ACTION_LABEL, AUDIT_ENTITY_LABEL, AuditLog } from '@/types/index'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

interface Props {
  open: boolean
  onOpenChange: (
    open: boolean
  ) => void
  audit?: Partial<AuditLog>
}

export const AuditLogDetailDialog = ({
  open,
  onOpenChange,
  audit
}: Props) => {

  if (!audit) return null

  const prettyJson = (
    data?: string | null
  ) => {
    if (!data) return null

    try {
      return JSON.stringify(
        JSON.parse(data),
        null,
        2
      )
    } catch {
      return data
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={
        onOpenChange
      }
    >
      <DialogContent className="sm:max-w-[calc(100%-2rem)] lg:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            Chi tiết Log
          </DialogTitle>
        </DialogHeader>

        <div className="-mx-4 no-scrollbar max-h-[80vh] overflow-y-auto px-4 py-1 flex flex-col gap-4">
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

              <Item
                label="ID"
                value={audit.id}
              />

              <Item
                label="Người thực hiện"
                value={
                  audit.userName + " (" + audit.userEmail + ")"
                }
              />

              <Item
                label="Đối tượng"
                value={
                  <Badge>
                    {AUDIT_ENTITY_LABEL[audit.entityName || ""]}
                  </Badge>
                }
              />

              <Item
                label="Hành động"
                value={
                  <Badge variant="secondary">
                    {AUDIT_ACTION_LABEL[audit.action || ""]}
                  </Badge>
                }
              />

              <Item
                label="Endpoint"
                value={
                  audit.endpoint
                }
              />

              <Item
                label="Method"
                value={
                  audit.method
                }
              />

              <Item
                label="IP"
                value={
                  audit.ipAddress
                }
              />

              <Item
                label="Thời gian"
                value={format(
                  new Date(
                    audit.createdAt || ""
                  ),
                  'HH:mm:ss dd/MM/yyyy',
                  {
                    locale: vi
                  }
                )}
              />

            </div>

            {audit.changedFields && (
              <JsonBlock
                title="Trường thay đổi"
                json={prettyJson(
                  audit.changedFields
                )}
              />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              <JsonBlock
                title="Dữ liệu cũ"
                json={prettyJson(
                  audit.oldData
                )}
              />

              <JsonBlock
                title="Dữ liệu mới"
                json={prettyJson(
                  audit.newData
                )}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const Item = ({
  label,
  value
}: { label: string, value: React.ReactNode | string }) => (
  <div>
    <p className="text-muted-foreground text-xs">
      {label}
    </p>

    <div className="font-medium">
      {value || '-'}
    </div>
  </div>
)

const JsonBlock = ({
  title,
  json
}: { title: string, json: string | null }) => {

  if (!json) return null

  return (
    <div>
      <h4 className="font-semibold mb-2">
        {title}
      </h4>

      <div className="
        rounded-xl
        border
        bg-muted/40
        overflow-hidden
      ">
        <pre className="
        text-emerald-700
        dark:text-emerald-300
          p-4
          text-xs
          overflow-auto
          max-h-125
          font-sans
          leading-6
          whitespace-pre-wrap
          wrap-break-word
        ">
          {json}
        </pre>
      </div>
    </div>
  )
}