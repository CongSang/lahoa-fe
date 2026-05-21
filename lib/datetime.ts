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

export const getDateRangeValue = (
  from?: string,
  to?: string
) => {
  if (!from && !to) return undefined

  return {
    from: from
      ? new Date(from)
      : undefined,
    to: to
      ? new Date(to)
      : undefined,
  }
}

type DateRangeFields<
  T extends FieldValues
> = {
  from: Path<T>
  to:  Path<T>
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
    (
      range?.from
        ?.toISOString() ??
      ''
    ) as T[Path<T>]
  )

  form.setValue(
    fields.to,
    (
      range?.to
        ?.toISOString() ??
      ''
    ) as T[Path<T>]
  )
}