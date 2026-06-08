import { cn } from "@/lib/index";

interface Props {
  value: number;
}

export function InventoryDifferenceBadge({
  value,
}: Props) {
  if (value === 0) {
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium",
          "bg-muted text-muted-foreground"
        )}
      >
        0
      </span>
    );
  }

  const isPositive = value > 0;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-1 text-xs font-medium",
        isPositive
          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
      )}
    >
      {isPositive ? `+${value}` : value}
    </span>
  );
}