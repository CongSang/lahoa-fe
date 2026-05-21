"use client"

import * as React from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
  Badge,
  CommandShortcut,
  CommandSeparator,
} from "@/components/index"
import { GroupOptions, Option } from "@/types/index"
import { Selection } from "@/schema/index"

interface MultiSelectProps<T extends GroupOptions> {
  options?: Option[]
  groupOptions?: T[]
  value: string | string[]
  onChange: (value: string | string[]) => void
  placeholder?: string
  selection?: Selection
  hasGroups?: boolean
  fieldValue?: "id" | "value"
}

export function SelectCustom<T extends GroupOptions>({
  options,
  groupOptions,
  value: selected,
  onChange,
  placeholder = "Chọn giá trị",
  selection = "single",
  hasGroups = false,
  fieldValue = "value",
  ...props
}: MultiSelectProps<T> & React.ComponentProps<"button">) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (value: string) => {
    const safeSelected = Array.isArray(selected) ? selected : [];

    if (selection === "single") {
      onChange(value)
      setOpen(false)
      return
    }

    const newSelected = safeSelected.includes(value)
      ? safeSelected.filter((v) => v !== value)
      : [...safeSelected, value.toString()]

    onChange(newSelected)
  }

  const allOptions = React.useMemo(() => {
    if (hasGroups && groupOptions) {
      return groupOptions.flatMap(g => g.values)
    }
    return options || []
  }, [options, groupOptions, hasGroups])

  const renderValue = () => {
    if (!selected || selected?.length === 0) {
      return <span className="text-muted-foreground">{placeholder}</span>
    }
    
    if (selection === "single") {
      const option = allOptions?.find((option) => String(option[fieldValue]) === String(selected))
      return option 
        ? <span className="truncate">{option.label}</span>
        : <span className="text-muted-foreground">{placeholder}</span>
    }

    return Array.isArray(selected) && selected?.map((value) => {
      const option = allOptions?.find((option) => String(option[fieldValue]) === String(value))
      return (
        <Badge key={value} variant="secondary">
          {option?.label}
          <span
            role="button"
            tabIndex={0}
            className="ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0.5"
            onKeyDown={(e) => { 
              if (e.key === "Enter") handleSelect(value) 
            }}
            onMouseDown={(e) => { 
              e.preventDefault(); 
              e.stopPropagation(); 
            }}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              handleSelect(value)
            }}
          >
            <X className="text-muted-foreground hover:text-foreground" />
          </span>
        </Badge>
      )
    })
  }
  
  const renderItems = (items?: Option[]) => {
    return items?.map((option) => (
      <CommandItem
        key={option.value}
        onSelect={() => handleSelect(String(option[fieldValue]))}
      >
        <span className="w-full truncate">{option.label}</span>
        <CommandShortcut>
          <Check
            className={cn(
              "h-4 w-4",
              (Array.isArray(selected) ? selected?.includes(String(option[fieldValue])) : selected === String(option[fieldValue]) )
              ? "opacity-100" 
              : "opacity-0"
            )}
          />
        </CommandShortcut>
      </CommandItem>
    ))
  }
    

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          type="button"
          className="w-full justify-between min-h-8 h-auto gap-1 px-2.5 py-1 font-normal hover:bg-background data-[state=open]:bg-background"
          {...props}
        >
          <div className="flex flex-wrap gap-1 text-left truncate">
            {renderValue()}
          </div>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="p-0" 
        align="start"
        style={{ width: 'var(--radix-popover-trigger-width)' }}
      >
        <Command>
          <CommandInput placeholder="Tìm kiếm" />
          <CommandEmpty>Không có kết quả.</CommandEmpty>
          <CommandList className="max-h-64 overflow-y-auto">
            {hasGroups ? (
              groupOptions?.map((items) => (
                <React.Fragment key={items.id}>
                  <CommandGroup heading={items.name}>
                    {renderItems(items.values)}
                  </CommandGroup>
                  <CommandSeparator />
                </React.Fragment>
              ))
            ) : (
              <CommandGroup>{renderItems(options)}</CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}