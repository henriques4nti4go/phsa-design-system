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
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
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

/**
 * Props base compartilhadas entre todos os tipos de DatePicker.
 */
export interface DatePickerBaseProps {
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

/**
 * Hook compartilhado para lógica comum dos DatePickers.
 */
function useDatePickerCommon({
  minDate,
  maxDate,
  disabledDates,
}: Pick<DatePickerBaseProps, "minDate" | "maxDate" | "disabledDates">) {
  const [open, setOpen] = React.useState(false)

  // Normalizar datas para comparar apenas a data (sem hora)
  const normalizeDate = React.useCallback((d: Date) => {
    const normalized = new Date(d)
    normalized.setHours(0, 0, 0, 0)
    return normalized
  }, [])

  // Criar função disabled
  const getDisabledFn = React.useCallback(() => {
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
  }, [minDate, maxDate, disabledDates, normalizeDate])

  return {
    open,
    setOpen,
    normalizeDate,
    getDisabledFn,
  }
}

/**
 * Props para DatePickerSingle - seleção de data única.
 */
export interface DatePickerSingleBaseProps extends DatePickerBaseProps {
  /**
   * Data selecionada.
   */
  date?: Date
  /**
   * Callback chamado quando a data é selecionada.
   */
  onSelect?: (date: Date | undefined) => void
}

/**
 * Props para DatePickerSingle com suporte a Field.
 */
export interface DatePickerSingleProps extends DatePickerSingleBaseProps {
  /**
   * Label do campo. Quando fornecido, cria o Field automaticamente.
   */
  label?: React.ReactNode
  /**
   * Descrição ou texto de ajuda do campo.
   */
  description?: React.ReactNode
  /**
   * Mensagem de erro ou array de erros.
   */
  error?: React.ReactNode | Array<{ message?: string } | undefined>
  /**
   * Define se o campo está inválido.
   */
  invalid?: boolean
  /**
   * Orientação do Field (vertical, horizontal, responsive).
   */
  orientation?: "vertical" | "horizontal" | "responsive"
  /**
   * Classes CSS adicionais para o container do Field.
   */
  fieldClassName?: string
  /**
   * ID do campo. Se não fornecido, será gerado automaticamente.
   */
  id?: string
}

/**
 * DatePicker para seleção de data única.
 *
 * Pode ser usado de duas formas:
 * 1. Como DatePicker simples: <DatePickerSingle date={date} onSelect={setDate} />
 * 2. Com Field integrado: <DatePickerSingle label="Data" date={date} onSelect={setDate} />
 *
 * Quando usado com props do Field (label, description, error), automaticamente
 * cria o Field ao redor do DatePicker.
 *
 * @example
 * ```tsx
 * import { DatePickerSingle } from "@phsa.tec/design-system-react"
 *
 * function MyForm() {
 *   const [date, setDate] = React.useState<Date>()
 *
 *   return (
 *     <DatePickerSingle
 *       label="Data de nascimento"
 *       description="Selecione sua data de nascimento"
 *       date={date}
 *       onSelect={setDate}
 *       placeholder="Selecione uma data"
 *     />
 *   )
 * }
 * ```
 */
export const DatePickerSingle = React.forwardRef<HTMLButtonElement, DatePickerSingleProps>(
  (
    {
      id: providedId,
      label,
      description,
      error,
      invalid,
      orientation = "vertical",
      fieldClassName,
      date,
      onSelect,
      placeholder = "Selecione uma data",
      dateFormat = "PPP",
      disabled,
      buttonClassName,
      popoverContentClassName,
      calendarClassName,
      calendarProps,
      showOutsideDays = true,
      minDate,
      maxDate,
      disabledDates,
      ...rest
    },
    ref
  ) => {
    const id = React.useId()
    const datePickerId = providedId || id
    const hasError = invalid || !!error
    const hasFieldProps = label !== undefined || description !== undefined || error !== undefined

    const { open, setOpen, getDisabledFn } = useDatePickerCommon({
      minDate,
      maxDate,
      disabledDates,
    })

    const handleSelect = React.useCallback(
      (selected: Date | undefined) => {
        onSelect?.(selected)
        if (selected) {
          setOpen(false)
        }
      },
      [onSelect, setOpen]
    )

    const buttonText = date ? format(date, dateFormat) : <span>{placeholder}</span>
    const isDateEmpty = !date

    const datePickerComponent = (
      <Popover open={open} onOpenChange={setOpen} {...rest}>
        <PopoverTrigger asChild>
          <UIButton
            ref={ref}
            variant="outline"
            disabled={disabled}
            data-empty={isDateEmpty}
            aria-invalid={hasError}
            aria-describedby={
              description || error
                ? `${datePickerId}-description ${hasError ? `${datePickerId}-error` : ""}`.trim()
                : undefined
            }
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              "data-[empty=true]:text-muted-foreground",
              buttonClassName
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {buttonText}
          </UIButton>
        </PopoverTrigger>
        <PopoverContent className={cn("w-auto p-0", popoverContentClassName)} align="start">
          <Calendar
            mode="single"
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

    // Se tem props do Field, cria o Field automaticamente
    if (hasFieldProps) {
      return (
        <Field
          orientation={orientation}
          data-invalid={hasError}
          className={fieldClassName}
        >
          {label && (
            <FieldLabel htmlFor={datePickerId}>
              {label}
            </FieldLabel>
          )}
          <FieldContent>
            {datePickerComponent}
            {description && (
              <FieldDescription id={`${datePickerId}-description`}>
                {description}
              </FieldDescription>
            )}
            {error && (
              <FieldError id={`${datePickerId}-error`} errors={Array.isArray(error) ? error : undefined}>
                {!Array.isArray(error) ? error : undefined}
              </FieldError>
            )}
          </FieldContent>
        </Field>
      )
    }

    // DatePicker simples sem Field
    return datePickerComponent
  }
)

DatePickerSingle.displayName = "DatePickerSingle"

/**
 * Props para DatePickerRange - seleção de range de datas.
 */
export interface DatePickerRangeBaseProps extends DatePickerBaseProps {
  /**
   * Range de datas selecionado.
   */
  date?: DateRange
  /**
   * Callback chamado quando o range é selecionado.
   */
  onSelect?: (range: DateRange | undefined) => void
}

/**
 * Props para DatePickerRange com suporte a Field.
 */
export interface DatePickerRangeProps extends DatePickerRangeBaseProps {
  /**
   * Label do campo. Quando fornecido, cria o Field automaticamente.
   */
  label?: React.ReactNode
  /**
   * Descrição ou texto de ajuda do campo.
   */
  description?: React.ReactNode
  /**
   * Mensagem de erro ou array de erros.
   */
  error?: React.ReactNode | Array<{ message?: string } | undefined>
  /**
   * Define se o campo está inválido.
   */
  invalid?: boolean
  /**
   * Orientação do Field (vertical, horizontal, responsive).
   */
  orientation?: "vertical" | "horizontal" | "responsive"
  /**
   * Classes CSS adicionais para o container do Field.
   */
  fieldClassName?: string
  /**
   * ID do campo. Se não fornecido, será gerado automaticamente.
   */
  id?: string
}

/**
 * DatePicker para seleção de range de datas.
 *
 * Pode ser usado de duas formas:
 * 1. Como DatePicker simples: <DatePickerRange date={range} onSelect={setRange} />
 * 2. Com Field integrado: <DatePickerRange label="Período" date={range} onSelect={setRange} />
 *
 * Quando usado com props do Field (label, description, error), automaticamente
 * cria o Field ao redor do DatePicker.
 *
 * @example
 * ```tsx
 * import { DatePickerRange } from "@phsa.tec/design-system-react"
 * import type { DateRange } from "react-day-picker"
 *
 * function MyForm() {
 *   const [range, setRange] = React.useState<DateRange>()
 *
 *   return (
 *     <DatePickerRange
 *       label="Período de viagem"
 *       description="Selecione as datas de ida e volta"
 *       date={range}
 *       onSelect={setRange}
 *       placeholder="Selecione um range"
 *     />
 *   )
 * }
 * ```
 */
export const DatePickerRange = React.forwardRef<HTMLButtonElement, DatePickerRangeProps>(
  (
    {
      id: providedId,
      label,
      description,
      error,
      invalid,
      orientation = "vertical",
      fieldClassName,
      date,
      onSelect,
      placeholder = "Selecione um range de datas",
      dateFormat = "PPP",
      disabled,
      buttonClassName,
      popoverContentClassName,
      calendarClassName,
      calendarProps,
      showOutsideDays = true,
      minDate,
      maxDate,
      disabledDates,
      ...rest
    },
    ref
  ) => {
    const id = React.useId()
    const datePickerId = providedId || id
    const hasError = invalid || !!error
    const hasFieldProps = label !== undefined || description !== undefined || error !== undefined

    const { open, setOpen, getDisabledFn } = useDatePickerCommon({
      minDate,
      maxDate,
      disabledDates,
    })

    const handleSelect = React.useCallback(
      (selected: DateRange | undefined) => {
        onSelect?.(selected)
        if (selected?.from && selected?.to) {
          setOpen(false)
        }
      },
      [onSelect, setOpen]
    )

    const renderButtonText = () => {
      if (date?.from && date?.to) {
        return `${format(date.from, dateFormat)} - ${format(date.to, dateFormat)}`
      }
      if (date?.from) {
        return format(date.from, dateFormat)
      }
      return <span>{placeholder}</span>
    }

    const isDateEmpty = !date?.from

    const datePickerComponent = (
      <Popover open={open} onOpenChange={setOpen} {...rest}>
        <PopoverTrigger asChild>
          <UIButton
            ref={ref}
            variant="outline"
            disabled={disabled}
            data-empty={isDateEmpty}
            aria-invalid={hasError}
            aria-describedby={
              description || error
                ? `${datePickerId}-description ${hasError ? `${datePickerId}-error` : ""}`.trim()
                : undefined
            }
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
            mode="range"
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

    // Se tem props do Field, cria o Field automaticamente
    if (hasFieldProps) {
      return (
        <Field
          orientation={orientation}
          data-invalid={hasError}
          className={fieldClassName}
        >
          {label && (
            <FieldLabel htmlFor={datePickerId}>
              {label}
            </FieldLabel>
          )}
          <FieldContent>
            {datePickerComponent}
            {description && (
              <FieldDescription id={`${datePickerId}-description`}>
                {description}
              </FieldDescription>
            )}
            {error && (
              <FieldError id={`${datePickerId}-error`} errors={Array.isArray(error) ? error : undefined}>
                {!Array.isArray(error) ? error : undefined}
              </FieldError>
            )}
          </FieldContent>
        </Field>
      )
    }

    // DatePicker simples sem Field
    return datePickerComponent
  }
)

DatePickerRange.displayName = "DatePickerRange"

/**
 * Props para DatePickerMultiple - seleção de múltiplas datas.
 */
export interface DatePickerMultipleBaseProps extends DatePickerBaseProps {
  /**
   * Datas selecionadas.
   */
  date?: Date[]
  /**
   * Callback chamado quando as datas são selecionadas.
   */
  onSelect?: (dates: Date[]) => void
}

/**
 * Props para DatePickerMultiple com suporte a Field.
 */
export interface DatePickerMultipleProps extends DatePickerMultipleBaseProps {
  /**
   * Label do campo. Quando fornecido, cria o Field automaticamente.
   */
  label?: React.ReactNode
  /**
   * Descrição ou texto de ajuda do campo.
   */
  description?: React.ReactNode
  /**
   * Mensagem de erro ou array de erros.
   */
  error?: React.ReactNode | Array<{ message?: string } | undefined>
  /**
   * Define se o campo está inválido.
   */
  invalid?: boolean
  /**
   * Orientação do Field (vertical, horizontal, responsive).
   */
  orientation?: "vertical" | "horizontal" | "responsive"
  /**
   * Classes CSS adicionais para o container do Field.
   */
  fieldClassName?: string
  /**
   * ID do campo. Se não fornecido, será gerado automaticamente.
   */
  id?: string
}

/**
 * DatePicker para seleção de múltiplas datas.
 *
 * Pode ser usado de duas formas:
 * 1. Como DatePicker simples: <DatePickerMultiple date={dates} onSelect={setDates} />
 * 2. Com Field integrado: <DatePickerMultiple label="Datas" date={dates} onSelect={setDates} />
 *
 * Quando usado com props do Field (label, description, error), automaticamente
 * cria o Field ao redor do DatePicker.
 *
 * @example
 * ```tsx
 * import { DatePickerMultiple } from "@phsa.tec/design-system-react"
 *
 * function MyForm() {
 *   const [dates, setDates] = React.useState<Date[]>([])
 *
 *   return (
 *     <DatePickerMultiple
 *       label="Datas disponíveis"
 *       description="Selecione todas as datas que deseja"
 *       date={dates}
 *       onSelect={setDates}
 *       placeholder="Selecione múltiplas datas"
 *     />
 *   )
 * }
 * ```
 */
export const DatePickerMultiple = React.forwardRef<HTMLButtonElement, DatePickerMultipleProps>(
  (
    {
      id: providedId,
      label,
      description,
      error,
      invalid,
      orientation = "vertical",
      fieldClassName,
      date,
      onSelect,
      placeholder = "Selecione múltiplas datas",
      dateFormat = "PPP",
      disabled,
      buttonClassName,
      popoverContentClassName,
      calendarClassName,
      calendarProps,
      showOutsideDays = true,
      minDate,
      maxDate,
      disabledDates,
      ...rest
    },
    ref
  ) => {
    const id = React.useId()
    const datePickerId = providedId || id
    const hasError = invalid || !!error
    const hasFieldProps = label !== undefined || description !== undefined || error !== undefined

    const { open, setOpen, getDisabledFn } = useDatePickerCommon({
      minDate,
      maxDate,
      disabledDates,
    })

    const handleSelect = React.useCallback(
      (selected: Date[]) => {
        onSelect?.(selected)
      },
      [onSelect]
    )

    const renderButtonText = () => {
      if (date && date.length > 0) {
        if (date.length === 1) {
          return format(date[0], dateFormat)
        }
        return `${date.length} datas selecionadas`
      }
      return <span>{placeholder}</span>
    }

    const isDateEmpty = !date?.length

    // Para mode="multiple", o Calendar requer required={true}
    const calendarPropsForMultiple = {
      ...calendarProps,
      required: true,
    } as typeof calendarProps & { required: true }

    const datePickerComponent = (
      <Popover open={open} onOpenChange={setOpen} {...rest}>
        <PopoverTrigger asChild>
          <UIButton
            ref={ref}
            variant="outline"
            disabled={disabled}
            data-empty={isDateEmpty}
            aria-invalid={hasError}
            aria-describedby={
              description || error
                ? `${datePickerId}-description ${hasError ? `${datePickerId}-error` : ""}`.trim()
                : undefined
            }
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
            mode="multiple"
            selected={date}
            onSelect={handleSelect}
            showOutsideDays={showOutsideDays}
            className={calendarClassName}
            disabled={getDisabledFn()}
            {...calendarPropsForMultiple}
          />
        </PopoverContent>
      </Popover>
    )

    // Se tem props do Field, cria o Field automaticamente
    if (hasFieldProps) {
      return (
        <Field
          orientation={orientation}
          data-invalid={hasError}
          className={fieldClassName}
        >
          {label && (
            <FieldLabel htmlFor={datePickerId}>
              {label}
            </FieldLabel>
          )}
          <FieldContent>
            {datePickerComponent}
            {description && (
              <FieldDescription id={`${datePickerId}-description`}>
                {description}
              </FieldDescription>
            )}
            {error && (
              <FieldError id={`${datePickerId}-error`} errors={Array.isArray(error) ? error : undefined}>
                {!Array.isArray(error) ? error : undefined}
              </FieldError>
            )}
          </FieldContent>
        </Field>
      )
    }

    // DatePicker simples sem Field
    return datePickerComponent
  }
)

DatePickerMultiple.displayName = "DatePickerMultiple"

/**
 * DatePicker padrão - alias para DatePickerSingle para manter compatibilidade.
 *
 * @deprecated Use DatePickerSingle, DatePickerRange ou DatePickerMultiple diretamente.
 * Este componente será removido em uma versão futura.
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
export const DatePicker = DatePickerSingle

/**
 * @deprecated Use DatePickerSingleProps
 */
export type DatePickerProps = DatePickerSingleProps
