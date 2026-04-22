export function cleanNumber(value: string) {
  return value.replace(/[^\d.,-]/g, "");
}

export function parseNumber(value: string) {
  if (!value) return undefined;

  const normalized = value.replace(/[.,]/g, "");
  const num = Number(normalized);

  return isNaN(num) ? undefined : num;
}

export function formatNumber(
  value: string | number,
  options?: {
    locale?: string;
    style?: "currency" | "percent" | "decimal";
    currency?: string;
    minimumFractionDigits?: number;
  }
) {
  if (value === "" || value === undefined) return "";

  const num =
    typeof value === "number" ? value : parseNumber(value);

  if (num === undefined) return "";

  return new Intl.NumberFormat(options?.locale || "vi-VN", {
    style: options?.style || "decimal",
    currency: options?.currency,
    minimumFractionDigits: options?.minimumFractionDigits ?? 0,
  }).format(num);
}