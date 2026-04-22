"use client";

import { useState } from "react";

import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
} from "@/components/index";

import { Check, ChevronDown } from "lucide-react";
import { Category } from "@/types/index";
import { cn } from "@/lib/utils";

interface TreeSelectProps {
  placeholder?: string
  data: Category[]
  value: number | string
  onChange: (value: number | string) => void
}

export function GroupSelect({
  placeholder,
  data,
  value,
  onChange,
}: TreeSelectProps) {
  const [open, setOpen] = useState(false);

  const findLabel = (data: Category[]): string | undefined => {
    for (const n of data) {
      if (n.id === value) return n.name;
      if (n.children) {
        const found = findLabel(n.children);
        if (found) return found;
      }
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("w-full justify-between", value ?? "text-muted-foreground!")}>
          {value ? findLabel(data) : placeholder}
          <ChevronDown className="w-4 h-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-88 p-0">
        <Command>
          <CommandInput placeholder={`Tìm kiếm...`} />

          <CommandList>
            {data.map(({ id, name, children }) => (
              <CommandGroup key={id} heading={name}>
                {children && children.map((child) => (
                    <CommandItem
                      key={child.id}
                      onSelect={() => {
                        onChange(child.id);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={`h-4 w-4 ${
                          value === child.id
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      />
                      {child.name}
                    </CommandItem>
                  ))
              }
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}