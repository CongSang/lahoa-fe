'use client'

import {
  Badge,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  InventoryDifferenceBadge,
} from '@/components/index'
import { INVENTORY_LOG_FIELD, INVENTORY_MOVEMENT_TYPE_BADGES, INVENTORY_MOVEMENT_TYPE_LABELS, INVENTORY_REFERENCE_TYPE_LABELS, InventoryLog, StatusCommon } from '@/types/index'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import Link from 'next/link'
import { JSX } from 'react'

interface Props {
  open: boolean
  onOpenChange: (
    open: boolean
  ) => void
  inventory?: Partial<InventoryLog>
}

export const InventoryLogDetailDialog = ({
  open,
  onOpenChange,
  inventory
}: Props) => {

  if (!inventory) return null

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
            Chi tiết biến động kho
          </DialogTitle>
        </DialogHeader>

        <div className="-mx-4 no-scrollbar max-h-[80vh] overflow-y-auto px-4 py-1 flex flex-col gap-4">
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

              <Item
                label={INVENTORY_LOG_FIELD["code"]}
                value={inventory.code}
              />

              <Item
                label={INVENTORY_LOG_FIELD["materialName"]}
                value={() => {
                  const materialId = inventory.materialId;
                  const materialName = inventory.materialName;
                  const materialStatus = inventory.materialStatus;

                  return (
                    <div className="flex items-center gap-1">
                      <Link 
                        href={`/inventory/materials/${materialId}`} 
                        className="text-foreground hover:text-blue-600 hover:underline underline-offset-4 font-normal"
                      >
                        {materialName}
                      </Link>

                      {materialStatus === StatusCommon.DELETED && (
                        <Badge variant="destructive">Ngừng kinh doanh</Badge>
                      )}
                    </div>
                  );
                }}
              />

              <Item
                label={INVENTORY_LOG_FIELD["warehouseName"]}
                value={() => {
                  const warehouseId = inventory.warehouseId;
                  const warehouseName = inventory.warehouseName;
                  const warehouseStatus = inventory.warehouseStatus;

                  return (
                    <div className="flex items-center gap-1">
                      <Link 
                        href={`/inventory/warehouses/${warehouseId}`} 
                        className="text-foreground hover:text-blue-600 hover:underline underline-offset-4 font-normal"
                      >
                        {warehouseName}
                      </Link>

                      {warehouseStatus === StatusCommon.DELETED && (
                        <Badge variant="destructive">Đã đóng cửa</Badge>
                      )}
                    </div>
                  );
                }}
              />

              <Item
                label={INVENTORY_LOG_FIELD["actorName"]}
                value={
                  inventory.actorName + " (" + inventory.actorEmail + ")"
                }
              />

              <Item
                label={INVENTORY_LOG_FIELD["type"]}
                value={
                  <span 
                    className={`px-2 py-0.5 text-xs font-medium rounded-full ${inventory.type ? INVENTORY_MOVEMENT_TYPE_BADGES[inventory.type]?.className : ""}`}
                  >
                    {inventory.type ? INVENTORY_MOVEMENT_TYPE_LABELS[inventory.type] : "" }
                  </span>
                }
              />

              <Item
                label={INVENTORY_LOG_FIELD["referenceType"]}
                value={inventory.referenceType ? INVENTORY_REFERENCE_TYPE_LABELS[inventory.referenceType] : ""}
              />

              <Item
                label={INVENTORY_LOG_FIELD["quantity"]}
                value={<InventoryDifferenceBadge value={Number(inventory.quantity) || 0} />}
              />

              <Item
                label={INVENTORY_LOG_FIELD["beforeOnHand"]}
                value={
                  inventory.beforeOnHand
                }
              />

              <Item
                label={INVENTORY_LOG_FIELD["afterOnHand"]}
                value={
                  inventory.afterOnHand
                }
              />

              <Item
                label={INVENTORY_LOG_FIELD["beforeReserved"]}
                value={
                  inventory.beforeReserved
                }
              />

              <Item
                label={INVENTORY_LOG_FIELD["afterReserved"]}
                value={
                  inventory.afterReserved
                }
              />

              <Item
                label={INVENTORY_LOG_FIELD["referenceId"]}
                value={() => {
                  const refId = inventory.referenceId;
                  const refCode = inventory.referenceCode;
                  const refType = inventory.referenceType;

                  if (!refId) return <span className="text-muted-foreground">-</span>;

                  let path = "";
                  if (refType === "PURCHASE_ORDER") path = `/admin/inventory-receipts/${refId}`;
                  if (refType === "STOCKTAKE") path = `/admin/stocktakes/${refId}`;
                  if (refType === "ORDER") path = `/orders/${refId}`;

                  // Nếu có path hợp lệ thì hiển thị link màu xanh, có gạch chân khi hover
                  if (path) {
                    return (
                      <div className="w-50 truncate">
                        <Link 
                          href={path} 
                          className="text-blue-600 hover:underline underline-offset-4 font-medium dark:text-blue-400"
                        >
                          #{refCode}
                        </Link>
                      </div>
                    );
                  }

                  return <div className="w-50 truncate">#{refId}</div>;
                }}
              />

              <Item
                label={INVENTORY_LOG_FIELD["note"]}
                value={
                  inventory.note
                }
              />

              <Item
                label={INVENTORY_LOG_FIELD["createdAt"]}
                value={format(
                  new Date(
                    inventory.createdAt || ""
                  ),
                  'HH:mm:ss dd/MM/yyyy',
                  {
                    locale: vi
                  }
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
}: { label: string, value: React.ReactNode | string | (() => JSX.Element) }) => (
  <div>
    <p className="text-muted-foreground text-xs">
      {label}
    </p>

    <div className="font-medium">
      {typeof value === "function" ? value() : value || '-'}
    </div>
  </div>
)