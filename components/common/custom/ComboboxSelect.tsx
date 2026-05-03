/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Combobox as ComboboxPrimitive } from "@base-ui/react"

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/index"
import { SelectItemOption } from "@/types/index"
import { Selection } from "@/schema/index"

interface ComboboxSelectProps {
  selection?: Selection
  placeholder?: string
  items?: SelectItemOption[]
  groupItems?: any[]
  value: any
  onChange: (value: SelectItemOption | (SelectItemOption | undefined)[] | null) => void
}

export function ComboboxSelect({ 
  selection = "single", 
  placeholder, 
  items,
  groupItems,
  value,
  onChange,
  ...props
}: ComboboxSelectProps & ComboboxPrimitive.Input.Props) {
  const anchor = useComboboxAnchor()
  return (
    <>
      {selection === "single" ? (
        <Combobox
          value={value}
          onValueChange={(value) => onChange(value)}
          items={items}
          itemToStringValue={(item: SelectItemOption) => item.label}
          autoHighlight
        >
          <ComboboxInput placeholder={placeholder || "Chọn mục"} showClear { ...props } />
          <ComboboxContent>
            <ComboboxEmpty>Không tìm thấy mục nào.</ComboboxEmpty>
            <ComboboxList>
              {groupItems && groupItems.length > 0 ? (
                (group, index) => (
                  <ComboboxGroup key={group.value} items={group.items}>
                    <ComboboxLabel>{group.value}</ComboboxLabel>
                    <ComboboxCollection>
                      {(item) => (
                        <ComboboxItem key={item} value={item}>
                          {item}
                        </ComboboxItem>
                      )}
                    </ComboboxCollection>
                    {index < groupItems.length - 1 && <ComboboxSeparator />}
                  </ComboboxGroup>
                )
              ) : (
                (item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      ) : (
        <Combobox
          value={ value || [] }
          onValueChange={(value) => onChange(value)}
          multiple
          autoHighlight
          items={items}
          defaultValue={[items?.[0]]}
        >
          <ComboboxChips ref={anchor} className="w-full max-w-xs">
            <ComboboxValue>
              {(values) => (
                <>
                  {values.map((value: string) => (
                    <ComboboxChip key={value}>{value}</ComboboxChip>
                  ))}
                  <ComboboxChipsInput placeholder={placeholder || "Chọn mục"} { ...props } />
                </>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxContent anchor={anchor}>
            <ComboboxEmpty>Không tìm thấy mục nào.</ComboboxEmpty>
            <ComboboxList>
              {groupItems && groupItems.length > 0 ? (
                (group, index) => (
                  <ComboboxGroup key={group.value} items={group.items}>
                    <ComboboxLabel>{group.value}</ComboboxLabel>
                    <ComboboxCollection>
                      {(item) => (
                        <ComboboxItem key={item} value={item}>
                          {item}
                        </ComboboxItem>
                      )}
                    </ComboboxCollection>
                    {index < groupItems.length - 1 && <ComboboxSeparator />}
                  </ComboboxGroup>
                )
              ) : (
                (item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      )}
    </>
  )
}