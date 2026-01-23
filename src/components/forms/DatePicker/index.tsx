// src/components/forms/DatePicker/index.tsx
"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button as UIButton } from "@/components/ui/button"
import { Calendar as UICalendar } from "@/components/ui/calendar"
import {
  Popover as UIPopover,
  PopoverContent as UIPopoverContent,
  PopoverTrigger as UIPopoverTrigger,
} from "@/components/ui/popover"
import type { DayPickerProps, DateRange } from "react-day-picker"

/**
 * Calendar raiz (primitivo) baseado no react-day-picker.
 *
 * Use quando precisar de controle total sobre o calendário.
 */
export const Calendar = UICalendar
export type CalendarProps = React.ComponentProps<typeof UICalendar>

/**
 * Popover raiz (primitivo) baseado no Radix UI.
 */
export const Popover = UIPopover
export type PopoverProps = React.ComponentProps<typeof UIPopover>

/**
 * PopoverTrigger (primitivo).
 */
export const PopoverTrigger = UIPopoverTrigger
export type PopoverTriggerProps = React.ComponentProps<typeof UIPopoverTrigger>

/**
 * PopoverContent (primitivo).
 */
export const PopoverContent = UIPopoverContent
export type PopoverContentProps = React.ComponentProps<typeof UIPopoverContent>

export interface DatePickerPropsBase {
  /**
   * Placeholder exibido quando nenhuma data está selecionada.
   * @default "Selecione uma data"
   */
  placeholder?: string
  /**
   * Formato da data exibida no botão.
   * Usa date-fns format. Padrão: "PPP" (ex: "January 1, 2024")
   */
  dateFormat?: string
  /**
   * Define se o DatePicker está desabilitado.
   */
  disabled?: boolean
  /**
   * Classes CSS adicionais para o botão trigger.
   */
  buttonClassName?: string
  /**
   * Classes CSS adicionais para o conteúdo do popover.
   */
  popoverContentClassName?: string
  /**
   * Classes CSS adicionais para o calendário.
   */
  calendarClassName?: string
  /**
   * Props adicionais passadas para o componente Calendar.
   */
  calendarProps?: Omit<DayPickerProps, "selected" | "onSelect" | "mode" | "disabled">
  /**
   * Define se o calendário deve mostrar dias fora do mês.
   * @default true
   */
  showOutsideDays?: boolean
  /**
   * Data mínima selecionável.
   */
  minDate?: Date
  /**
   * Data máxima selecionável.
   */
  maxDate?: Date
  /**
   * Datas desabilitadas.
   */
  disabledDates?: Date[]
}

export interface DatePickerPropsSingle extends DatePickerPropsBase {
  /**
   * Modo de seleção do calendário.
   * @default "single"
   */
  mode?: "single"
  /**
   * Data selecionada.
   */
  date?: Date
  /**
   * Callback chamado quando a data é selecionada.
   */
  onSelect?: (date: Date | undefined) => void
}

export interface DatePickerPropsRange extends DatePickerPropsBase {
  mode: "range"
  /**
   * Range de datas selecionado.
   */
  date?: DateRange
  /**
   * Callback chamado quando o range é selecionado.
   */
  onSelect?: (range: DateRange | undefined) => void
}

export interface DatePickerPropsMultiple extends DatePickerPropsBase {
  mode: "multiple"
  /**
   * Datas selecionadas.
   */
  date?: Date[]
  /**
   * Callback chamado quando as datas são selecionadas.
   */
  onSelect?: (dates: Date[]) => void
}

export type DatePickerProps = DatePickerPropsSingle | DatePickerPropsRange | DatePickerPropsMultiple

/**
 * DatePicker padrão do Design System.
 *
 * Componente de seleção de data que combina Popover e Calendar.
 * Suporta seleção de data única, range ou múltiplas datas.
 *
 * @example
 * ```tsx
 * import { DatePicker } from "@phsa.tec/design-system-react"
 *
 * function MyForm() {
 *   const [date, setDate] = React.useState<Date>()
 *
 *   return (
 *     <DatePicker
 *       date={date}
 *       onSelect={setDate}
 *       placeholder="Selecione uma data"
 *     />
 *   )
 * }
 * ```
 */
export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      date,
      onSelect,
      placeholder = "Selecione uma data",
      dateFormat = "PPP",
      disabled,
      buttonClassName,
      popoverContentClassName,
      calendarClassName,
      calendarProps,
      mode = "single",
      showOutsideDays = true,
      minDate,
      maxDate,
      disabledDates,
      ...rest
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)

    // Normalizar datas para comparar apenas a data (sem hora)
    const normalizeDate = (d: Date) => {
      const normalized = new Date(d)
      normalized.setHours(0, 0, 0, 0)
      return normalized
    }

    // Criar função disabled
    const getDisabledFn = () => {
      if (!minDate && !maxDate && !disabledDates?.length) {
        return undefined
      }

      return (dateToCheck: Date) => {
        const normalizedDate = normalizeDate(dateToCheck)

        if (minDate) {
          const normalizedMin = normalizeDate(minDate)
          if (normalizedDate < normalizedMin) return true
        }
        if (maxDate) {
          const normalizedMax = normalizeDate(maxDate)
          if (normalizedDate > normalizedMax) return true
        }
        if (disabledDates?.some((d) => normalizeDate(d).getTime() === normalizedDate.getTime())) {
          return true
        }
        return false
      }
    }

    // Renderizar texto do botão baseado no modo
    const renderButtonText = () => {
      if (mode === "range") {
        const range = date as DateRange | undefined
        if (range?.from && range?.to) {
          return `${format(range.from, dateFormat)} - ${format(range.to, dateFormat)}`
        }
        if (range?.from) {
          return format(range.from, dateFormat)
        }
        return <span>{placeholder}</span>
      }

      if (mode === "multiple") {
        const dates = date as Date[] | undefined
        if (dates && dates.length > 0) {
          if (dates.length === 1) {
            return format(dates[0], dateFormat)
          }
          return `${dates.length} datas selecionadas`
        }
        return <span>{placeholder}</span>
      }

      // mode === "single"
      const singleDate = date as Date | undefined
      return singleDate ? format(singleDate, dateFormat) : <span>{placeholder}</span>
    }

    // Handler de seleção baseado no modo
    const handleSelect = (selected: Date | DateRange | Date[] | undefined) => {
      if (mode === "range") {
        const rangeOnSelect = onSelect as ((range: DateRange | undefined) => void) | undefined
        rangeOnSelect?.(selected as DateRange | undefined)
        const range = selected as DateRange | undefined
        if (range?.from && range?.to) {
          setOpen(false)
        }
      } else if (mode === "multiple") {
        const multipleOnSelect = onSelect as ((dates: Date[]) => void) | undefined
        multipleOnSelect?.(selected as Date[])
      } else {
        // mode === "single"
        const singleOnSelect = onSelect as ((date: Date | undefined) => void) | undefined
        singleOnSelect?.(selected as Date | undefined)
        if (selected) {
          setOpen(false)
        }
      }
    }

    const isDateEmpty = mode === "single" 
      ? !date 
      : mode === "range" 
        ? !(date as DateRange | undefined)?.from
        : !(date as Date[] | undefined)?.length

    return (
      <Popover open={open} onOpenChange={setOpen} {...rest}>
        <PopoverTrigger asChild>
          <UIButton
            ref={ref}
            variant="outline"
            disabled={disabled}
            data-empty={isDateEmpty}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              "data-[empty=true]:text-muted-foreground",
              buttonClassName
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {renderButtonText()}
          </UIButton>
        </PopoverTrigger>
        <PopoverContent className={cn("w-auto p-0", popoverContentClassName)} align="start">
          <Calendar
            mode={mode}
            selected={date}
            onSelect={handleSelect}
            showOutsideDays={showOutsideDays}
            className={calendarClassName}
            disabled={getDisabledFn()}
            {...calendarProps}
          />
        </PopoverContent>
      </Popover>
    )
  }
)

DatePicker.displayName = "DatePicker"
