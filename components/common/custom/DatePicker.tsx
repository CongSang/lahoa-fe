'use client'

import { format, addDays } from 'date-fns'
import { vi } from 'date-fns/locale'
import { CalendarIcon, X } from 'lucide-react'
import { DateRange, DayPickerProps, isDateRange } from 'react-day-picker'

import {
  Button,
  Calendar,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  
} from '@/components/index'

type Preset = 'today' | 7 | 30 | 'month' | null

const shortcuts = [
  { 
    label: "Hôm nay", 
    date: 'today'
  },
  {
    label: "7 ngày",
    date: 7,
  },
  {
    label: "30 ngày",
    date: 30,
  },
  {
    label: "Tháng này",
    date: 'month',
  },
  {
    label: "Xóa",
    date: null,
  },
] as { label: string, date: Preset }[]

type PickerValueMap = {
  single: Date | undefined
  range: DateRange | undefined
  multiple: Date[] | undefined
}

type Mode =
  | 'single'
  | 'range'
  | 'multiple'

interface Props<T extends Mode>
  extends Omit<
    DayPickerProps,
    'selected' | 'onSelect'
  > {
  mode: T
  placeholder?: string
  disablePast?: boolean
  disableFuture?: boolean
  minDate?: Date
  maxDate?: Date
  displayFormat?: string
  timeStep?: number
  showTime?: boolean
  showPreset?: boolean
  value?: PickerValueMap[T]
  onChange: (
    value: PickerValueMap[T]
  ) => void
}

export const DatePicker = <
  T extends Mode
>({
  mode,
  showTime = false,
  showPreset = true,
  disablePast = false,
  disableFuture = false,
  displayFormat = 'dd/MM/yyyy',
  timeStep = 30,
  maxDate,
  minDate,
  value,
  placeholder = "Chọn ngày",
  onChange,
  ...props
}: Props<T>) => {
  const formatTime = (date?: Date) => {
    if (!date)
      return '00:00'

    return `${String(
      date.getHours()
    ).padStart(2, '0')}:${String(
      date.getMinutes()
    ).padStart(2, '0')}`
  }

  const mergeTime = (
    date: Date,
    hours: number,
    minutes: number
  ) => {
    const next =
      new Date(date)

    next.setHours(
      hours
    )

    next.setMinutes(
      minutes
    )

    next.setSeconds(0)
    next.setMilliseconds(0)

    return next
  }

  const parseTime = (
    value: string
  ) => {
    const [
      hours,
      minutes,
    ] = value
      .split(':')
      .map(Number)

    return {
      hours,
      minutes,
    }
  }

  const singleTime =
    mode === 'single' &&
    value instanceof Date
      ? formatTime(value)
      : '00:00'

  const rangeTime =
    mode === 'range' &&
    value &&
    !(value instanceof Date) &&
    !Array.isArray(value)
      ? {
          from: formatTime(
            value.from
          ),
          to: formatTime(
            value.to
          ),
        }
      : {
          from: '00:00',
          to: '23:59',
        }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>, type?: 'from' | 'to') => {
    const date = (isDateRange(value) && type) ? value[type] : value

    if (date instanceof Date) {
      const {
        hours,
        minutes,
      } = parseTime(e.target.value)

      if (!isDateRange(value)) {
        onChange(
          mergeTime(
            date,
            hours,
            minutes
          ) as never
        )
        return
      }

      if (type) {
        onChange({ ...value, [type]: mergeTime(
          date,
          hours,
          minutes
        )})
      }
    }
  }

  const disableRule = (date: Date) => {
    if (
      disablePast &&
      date <
        new Date(
          new Date().setHours(0, 0, 0,0)
        )
    )
      return true

    if (disableFuture && date > new Date())
      return true

    if (minDate && date < minDate)
      return true

    if (maxDate && date > maxDate)
      return true

    return false
  }

  const formatLabel = () => {
    if (!value)
      return <span className="text-muted-foreground">{placeholder}</span>

    if (mode === 'single' && value instanceof Date) {
      return format(
        value,
        displayFormat
      )
    }

    if (mode === 'range' && 'from' in value) {
      if (value.from && value.to) {
        return `${format(
          value.from,
          displayFormat
        )} - ${format(
          value.to,
          displayFormat
        )}`
      }

      if (value.from) {
        return format(
          value.from,
          displayFormat
        )
      }
    }

    if (mode === 'multiple' && Array.isArray(value)) {
      return `${value.length} ngày`
    }

    return <span className="text-muted-foreground">{placeholder}</span>
  }

  const handlePreset = (
    preset: Preset
  ) => {
    if (preset === null) {
      onChange(undefined)
      return
    }

    const today =
      new Date()

    const startOfMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    )

    if (mode === 'single') {
      onChange(today as never)
      return
    }

    if (mode === 'range') {
      if (preset === 'month') {
        onChange({
          from: startOfMonth,
          to: today,
        } as never)

        return
      }

      if (preset === 'today') {
        onChange({
          from: today,
          to: today,
        } as never)

        return
      }

      const days = Number(preset)

      onChange({ 
        from: addDays(today, -days),
        to: today,
      } as never)

      return
    }

    if (mode === 'multiple') {
      if (preset === 'today') {
        onChange([today] as never)
        return
      }

      const days = preset === 'month'
          ? today.getDate()
          : Number(preset)

      onChange(Array.from(
          { length: days },
          (_, i) => addDays(today, -i)
        ) as never
      )
    }
  }

  return (
    <Popover>
      <PopoverTrigger
        asChild
      >
        <Button
          variant="outline"
          className="w-full justify-between font-normal hover:bg-background data-[state=open]:bg-background"
        >
          <span>
            {formatLabel()}
          </span>

          <div className="flex items-center gap-2">
            {value && (
              <span
                role="button"
                tabIndex={0}
                className="ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0.5"
                onKeyDown={(e) => { 
                  if (e.key === "Enter") onChange(undefined) 
                }}
                onMouseDown={(e) => { 
                  e.preventDefault(); 
                  e.stopPropagation(); 
                }}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onChange(undefined)
                }}
              >
                <X className="text-muted-foreground hover:text-foreground" />
              </span>
            )}

            <CalendarIcon className="w-4 h-4" />
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-3 max-h-[65vh] overflow-y-auto" align="start">
        <div className='flex flex-row-reverse gap-2'>
          {showPreset && (
            <>
              <div className="flex flex-col gap-2">
                <div className="space-y-2 px-4 pb-3.5 pt-2">
                  <p className="text-center font-medium text-sm">Chọn nhanh</p>
                </div>
                {shortcuts.map((shortcut) => (
                  <Button
                    key={shortcut.label}
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handlePreset(shortcut.date)
                    }
                  >
                    {shortcut.label}
                  </Button>
                ))}
              </div>

              <Separator orientation="vertical" />
            </>
          )}

          <div className='flex flex-col gap-2'>
            <Calendar
              disabled={disableRule}
              locale={vi}
              mode={mode}
              selected={value as never}
              onSelect={onChange as never}
              className="p-0 [--cell-size:--spacing(8.5)]"
              {...props}
            />

            {showTime && mode === "single" && (
              <div className="space-y-2">
                <Label htmlFor="time">Thời gian</Label>
                <Input
                  step={timeStep *60}
                  className="w-full"
                  id="time"
                  onChange={handleTimeChange}
                  type="time"
                  value={singleTime}
                />
              </div>
            )}

            {showTime && mode === "range" && (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                <div className="space-y-2">
                  <Label htmlFor="fromTime">Từ</Label>
                  <Input
                    step={timeStep * 60}
                    className="w-full"
                    id="fromTime"
                    onChange={(e) => handleTimeChange(e, "from")}
                    type="time"
                    value={rangeTime.from}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="toTime">Đến</Label>
                  <Input
                    step={timeStep * 60}
                    className="w-full"
                    id="toTime"
                    onChange={(e) => handleTimeChange(e, "to")}
                    type="time"
                    value={rangeTime.to}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}