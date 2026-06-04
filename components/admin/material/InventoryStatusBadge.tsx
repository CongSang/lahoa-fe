"use client"

import { Badge } from "@/components/index";

export function InventoryStatusBadge({
  lowStock,
  outOfStock,
}: {
  lowStock?: boolean;
  outOfStock?: boolean;
}) {
  if (outOfStock) {
    return (
      <Badge variant="destructive">
        Hết hàng
      </Badge>
    );
  }

  if (lowStock) {
    return (
      <Badge variant="destructive">
        Sắp hết hàng
      </Badge>
    );
  }

  return (
    <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
      Bình thường
    </Badge>
  );
}