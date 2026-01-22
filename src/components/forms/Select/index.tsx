// src/components/forms/Select/index.tsx
"use client"

import * as React from "react"
import { Check, ChevronDown, X } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { cn } from "@/lib/utils"
import { Command, CommandGroup, CommandInput, CommandItem, CommandList, CommandEmpty,  } from "@/components/ui/command"

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectGroupOption {
  label: string
  options: SelectOption[]
}

export type SelectBaseProps = {
  /**
   * Opções do select. Pode ser um array simples ou com grupos.
   */
  options: SelectOption[] | SelectGroupOption[]
  /**
   * Placeholder quando nenhum valor está selecionado.
   */
  placeholder?: string
  /**
   * Valor selecionado (controlado).
   */
  value?: string
  /**
   * Callback quando o valor muda.
   */
  onValueChange?: (value: string) => void
  /**
   * Valor padrão (não controlado).
   */
  defaultValue?: string
  /**
   * Se o select está desabilitado.
   */
  disabled?: boolean
  /**
   * Habilita busca no select.
   */
  searchable?: boolean
  /**
   * Placeholder do campo de busca.
   */
  searchPlaceholder?: string
}

export interface SelectWithFieldProps extends SelectBaseProps {
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
 * Select padrão do Design System com suporte a busca opcional.
 *
 * Pode ser usado de duas formas:
 * 1. Como select simples: <Select options={[...]} />
 * 2. Com Field integrado: <Select label="Estado" options={[...]} />
 * 3. Com busca: <Select options={[...]} searchable />
 *
 * Quando usado com props do Field (label, description, error), automaticamente
 * cria o Field ao redor do select.
 */
export const Select = React.forwardRef<
  HTMLButtonElement,
  SelectWithFieldProps
>(
  (
    {
      id: providedId,
      label,
      description,
      error,
      invalid,
      orientation = "vertical",
      fieldClassName,
      options,
      placeholder = "Selecione...",
      value,
      onValueChange,
      disabled,
      searchable = false,
      searchPlaceholder = "Buscar...",
    },
    ref
  ) => {
    const id = React.useId()
    const selectId = providedId || id
    const hasError = invalid || !!error
    const hasFieldProps =
      label !== undefined ||
      description !== undefined ||
      error !== undefined

    const [open, setOpen] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState("")

    // Encontra o label do valor selecionado
    const selectedOption = React.useMemo(() => {
      if (!value) return null

      const findOption = (
        opts: SelectOption[] | SelectGroupOption[]
      ): SelectOption | null => {
        for (const opt of opts) {
          if ("options" in opt) {
            const found = opt.options.find((o) => o.value === value)
            if (found) return found
          } else {
            if (opt.value === value) return opt
          }
        }
        return null
      }

      return findOption(options)
    }, [value, options])

    // Filtra opções baseado na busca
    const filteredOptions = React.useMemo(() => {
      if (!searchable || !searchValue) return options

      const searchLower = searchValue.toLowerCase()

      const filterOptions = (opts: SelectOption[]): SelectOption[] => {
        return opts.filter(
          (opt) => opt.label.toLowerCase().includes(searchLower)
        )
      }

      // Verifica se é array de grupos
      const isGrouped = options.length > 0 && "label" in options[0] && "options" in options[0]

      if (isGrouped) {
        return (options as SelectGroupOption[])
          .map((group) => ({
            ...group,
            options: filterOptions(group.options),
          }))
          .filter((group) => group.options.length > 0)
      }

      return filterOptions(options as SelectOption[])
    }, [options, searchValue, searchable])

    const renderOptions = () => {
      if (filteredOptions.length === 0) return null

      // Verifica se é array de grupos
      const isGrouped =
        filteredOptions.length > 0 &&
        "label" in filteredOptions[0] &&
        "options" in filteredOptions[0]

      if (isGrouped) {
        return (filteredOptions as SelectGroupOption[]).map(
          (group, groupIndex) => (
            <CommandGroup key={group.label || groupIndex} heading={group.label}>
              {group.options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={`${option.value} ${option.label}`}
                  disabled={option.disabled}
                  onSelect={() => {
                    onValueChange?.(option.value)
                    setOpen(false)
                    setSearchValue("")
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          )
        )
      }

      return (filteredOptions as SelectOption[]).map((option) => (
        <CommandItem
          key={option.value}
          value={`${option.value} ${option.label}`}
          disabled={option.disabled}
          onSelect={() => {
            onValueChange?.(option.value)
            setOpen(false)
            setSearchValue("")
          }}
        >
          <Check
            className={cn(
              "mr-2 h-4 w-4",
              value === option.value ? "opacity-100" : "opacity-0"
            )}
          />
          {option.label}
        </CommandItem>
      ))
    }

    const selectComponent = (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            id={selectId}
            type="button"
            role="combobox"
            aria-expanded={open}
            aria-controls={`${selectId}-listbox`}
            aria-invalid={hasError}
            aria-describedby={
              description || error
                ? `${selectId}-description ${hasError ? `${selectId}-error` : ""}`.trim()
                : undefined
            }
            disabled={disabled}
            className={cn(
              "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              !selectedOption && "text-muted-foreground"
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          id={`${selectId}-listbox`}
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
          sideOffset={4}
        >
          <Command shouldFilter={false}>
            {searchable && (
              <CommandInput
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onValueChange={setSearchValue}
                />
            )}
            <CommandList className="max-h-[300px] overflow-y-auto p-1">
              <CommandEmpty className="px-2 py-6 text-center text-sm text-muted-foreground">
                Nenhum resultado encontrado.
              </CommandEmpty>
              {renderOptions()}
            </CommandList>
          </Command>
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
          {label && <FieldLabel htmlFor={selectId}>{label}</FieldLabel>}
          <FieldContent>
            {selectComponent}
            {description && (
              <FieldDescription id={`${selectId}-description`}>
                {description}
              </FieldDescription>
            )}
            {error && (
              <FieldError
                id={`${selectId}-error`}
                errors={Array.isArray(error) ? error : undefined}
              >
                {!Array.isArray(error) ? error : undefined}
              </FieldError>
            )}
          </FieldContent>
        </Field>
      )
    }

    // Select simples sem Field
    return selectComponent
  }
)

Select.displayName = "Select"

// ============================================================================
// MultiSelect - Select com múltiplas seleções e busca
// ============================================================================

export interface MultiSelectWithFieldProps {
  /**
   * Opções do select.
   */
  options: SelectOption[]
  /**
   * Valores selecionados (controlado).
   */
  value?: string[]
  /**
   * Callback quando os valores mudam.
   */
  onValueChange?: (values: string[]) => void
  /**
   * Valores padrão (não controlado).
   */
  defaultValue?: string[]
  /**
   * Placeholder quando nenhum valor está selecionado.
   */
  placeholder?: string
  /**
   * Se o select está desabilitado.
   */
  disabled?: boolean
  /**
   * Placeholder do campo de busca.
   */
  searchPlaceholder?: string
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
  /**
   * Máximo de itens que podem ser selecionados.
   */
  maxSelected?: number
  /**
   * Número máximo de opções visíveis no input. Quando há mais opções selecionadas,
   * apenas as primeiras N são mostradas com um indicador do restante.
   * Padrão: 5
   */
  maxVisible?: number
}

/**
 * Select com múltiplas seleções e busca integrada usando Command.
 *
 * Permite selecionar múltiplos valores com busca/filtro.
 */
export const MultiSelect = React.forwardRef<
  HTMLButtonElement,
  MultiSelectWithFieldProps
>(
  (
    {
      id: providedId,
      label,
      description,
      error,
      invalid,
      orientation = "vertical",
      fieldClassName,
      options,
      placeholder = "Selecione...",
      value,
      onValueChange,
      defaultValue,
      disabled,
      searchPlaceholder = "Buscar...",
      maxSelected,
      maxVisible = 5,
    },
    ref
  ) => {
    const id = React.useId()
    const selectId = providedId || id
    const hasError = invalid || !!error
    const hasFieldProps =
      label !== undefined ||
      description !== undefined ||
      error !== undefined

    const [open, setOpen] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState("")
    const isControlled = value !== undefined
    const [internalValues, setInternalValues] = React.useState<string[]>(
      () => defaultValue || []
    )
    const selectedValues = isControlled ? value : internalValues

    const handleSelect = (optionValue: string) => {
      const newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : maxSelected && selectedValues.length >= maxSelected
          ? selectedValues
          : [...selectedValues, optionValue]

      if (!isControlled) {
        setInternalValues(newValues)
      }
      onValueChange?.(newValues)
    }

    const handleRemove = (e: React.MouseEvent, optionValue: string) => {
      e.stopPropagation()
      const newValues = selectedValues.filter((v) => v !== optionValue)
      if (!isControlled) {
        setInternalValues(newValues)
      }
      onValueChange?.(newValues)
    }

    const selectedOptions = React.useMemo(() => {
      return options.filter((opt) => selectedValues.includes(opt.value))
    }, [options, selectedValues])

    // Filtra opções baseado na busca
    const filteredOptions = React.useMemo(() => {
      if (!searchValue) return options

      const searchLower = searchValue.toLowerCase()
      return options.filter((opt) =>
        opt.label.toLowerCase().includes(searchLower)
      )
    }, [options, searchValue])

    const renderOptions = () => {
      return filteredOptions.map((option) => {
        const isSelected = selectedValues.includes(option.value)
        const isDisabled =
          option.disabled ||
          (maxSelected !== undefined &&
            !isSelected &&
            selectedValues.length >= maxSelected)

        return (
          <CommandItem
            key={option.value}
            value={`${option.value} ${option.label}`}
            disabled={isDisabled}
            onSelect={() => handleSelect(option.value)}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                isSelected ? "opacity-100" : "opacity-0"
              )}
            />
            {option.label}
          </CommandItem>
        )
      })
    }

    const selectComponent = (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            id={selectId}
            type="button"
            role="combobox"
            aria-expanded={open}
            aria-controls={`${selectId}-listbox`}
            aria-invalid={hasError}
            aria-describedby={
              description || error
                ? `${selectId}-description ${hasError ? `${selectId}-error` : ""}`.trim()
                : undefined
            }
            disabled={disabled}
            className={cn(
              "flex min-h-9 w-full items-center gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              selectedValues.length === 0 && "text-muted-foreground"
            )}
          >
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1">
              {selectedValues.length === 0 ? (
                <span className="truncate">{placeholder}</span>
              ) : (
                <>
                  {selectedOptions.slice(0, maxVisible).map((option) => (
                    <span
                      key={option.value}
                      className="inline-flex shrink-0 items-center gap-1 rounded bg-secondary px-2 py-0.5 text-xs"
                    >
                      {option.label}
                      <button
                        type="button"
                        onClick={(e) => handleRemove(e, option.value)}
                        className="ml-0.5 rounded-full hover:bg-secondary-foreground/20 focus:outline-none focus:ring-1 focus:ring-ring"
                        aria-label={`Remover ${option.label}`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault()
                            handleRemove(e as unknown as React.MouseEvent, option.value)
                          }
                        }}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  {selectedOptions.length > maxVisible && (
                    <span className="shrink-0 text-xs text-muted-foreground">
                      +{selectedOptions.length - maxVisible} mais
                    </span>
                  )}
                  {maxSelected && selectedValues.length >= maxSelected && (
                    <span className="shrink-0 text-xs text-muted-foreground">
                      (máx. {maxSelected})
                    </span>
                  )}
                </>
              )}
            </div>
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          id={`${selectId}-listbox`}
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
          sideOffset={4}
        >
          <Command shouldFilter={false}>
            <CommandInput
              placeholder={searchPlaceholder}
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandList className="max-h-[300px] overflow-y-auto p-1">
              <CommandEmpty className="px-2 py-6 text-center text-sm text-muted-foreground">
                Nenhum resultado encontrado.
              </CommandEmpty>
              {renderOptions()}
            </CommandList>
          </Command>
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
          {label && <FieldLabel htmlFor={selectId}>{label}</FieldLabel>}
          <FieldContent>
            {selectComponent}
            {description && (
              <FieldDescription id={`${selectId}-description`}>
                {description}
              </FieldDescription>
            )}
            {error && (
              <FieldError
                id={`${selectId}-error`}
                errors={Array.isArray(error) ? error : undefined}
              >
                {!Array.isArray(error) ? error : undefined}
              </FieldError>
            )}
          </FieldContent>
        </Field>
      )
    }

    // MultiSelect simples sem Field
    return selectComponent
  }
)

MultiSelect.displayName = "MultiSelect"
