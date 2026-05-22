import {
  format,
  formatDistanceToNow,
} from 'date-fns'
import { vi } from 'date-fns/locale'
import { DateRange } from 'react-day-picker'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

export const formatDate = (
  date: string
) =>
  format(
    new Date(date),
    'dd/MM/yyyy'
  )

export const formatTime = (
  date: string
) =>
  format(
    new Date(date),
    'HH:mm:ss'
  )

export const formatDateTime = (
  date: string
) => 
  format(
    new Date(date),
    'dd/MM/yyyy • HH:mm'
  )

export const formatRelative = (
  date: string
) =>
  formatDistanceToNow(
    new Date(date),
    {
      addSuffix: true,
      locale: vi
    }
  )

const BACKEND_DATETIME_FORMAT = "yyyy-MM-dd'T'HH:mm:ss"

export const toBackendDateTime = (
  date?: Date | null
) => {
  if (!date) return ''

  return format(
    date,
    BACKEND_DATETIME_FORMAT
  )
}

export const fromBackendDateTime = (
  value?: string | null
) => {
  if (!value) return undefined

  return new Date(value)
}

type DateRangeFields<
  T extends FieldValues
> = {
  from: Path<T>
  to:  Path<T>
}

export const getDateRangeValue = <
  T extends FieldValues
>(
  form: UseFormReturn<T>,
  fields: DateRangeFields<T>
): DateRange | undefined => {
  const from = form.watch(fields.from)
  const to = form.watch(fields.to)

  if (!from && !to) return undefined
  
  return {
    from: fromBackendDateTime(from as string),
    to: fromBackendDateTime(to as string),
  }
}

export const setDateRangeValue = <
  T extends FieldValues
>(
  form: UseFormReturn<T>,
  fields: DateRangeFields<T>,
  range:
    | DateRange
    | undefined
) => {
  form.setValue(
    fields.from,
    toBackendDateTime(
      range?.from
    ) as T[Path<T>]
  )

  form.setValue(
    fields.to,
    toBackendDateTime(
      range?.to
    ) as T[Path<T>]
  )
}