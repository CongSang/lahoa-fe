"use client";

import { cleanNumber, formatNumber, getCaretPosition, parseNumber } from "@/lib/index";
import { useRef } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/index";

type InputNumberProps = {
  value?: string | number;
  onChange?: (val: string) => void;

  format?: "currency" | "percent" | "decimal";
  currency?: string;
};

export function InputNumber({
  value = "",
  onChange,
  format = "decimal",
  currency = "VND",
  ...props
}: InputNumberProps & React.ComponentProps<"input">) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const raw = input.value;

    const caret = input.selectionStart || 0;

    const cleaned = cleanNumber(raw);

    const numeric = parseNumber(cleaned);

    const formatted = formatNumber(numeric || "", {
      style: "decimal",
      currency,
    });
    
    onChange?.(String(numeric));

    requestAnimationFrame(() => {
      if (!inputRef.current) return;

      const newCaret = getCaretPosition(raw, formatted, caret);
      inputRef.current.setSelectionRange(newCaret, newCaret);
    });
  };

  const display = formatNumber(value, {
    style: "decimal",
    currency,
  });

  return (
    <InputGroup>
      <InputGroupInput
        ref={inputRef}
        value={display}
        onChange={handleChange}
        {...props}
      />
      {format !== "decimal" && (
        <InputGroupAddon align="inline-end">
          <InputGroupText>{format === "currency" ? currency : "%"}</InputGroupText>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}