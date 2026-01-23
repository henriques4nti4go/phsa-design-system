// src/components/feedback/Alert/index.tsx
import * as React from "react"
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from "lucide-react"

import {
  Alert as UIAlert,
  AlertTitle as UIAlertTitle,
  AlertDescription as UIAlertDescription,
} from "@/components/ui/alert"
import { cn } from "@/lib/utils"

/**
 * Alert raiz (primitivo) baseado no shadcn.
 *
 * Use quando precisar de controle total sobre a estrutura do alert.
 */
export const AlertRoot = UIAlert
export type AlertRootProps = React.ComponentProps<typeof UIAlert>

/**
 * Título do Alert (primitivo).
 */
export const AlertTitle = UIAlertTitle
export type AlertTitleProps = React.ComponentProps<typeof UIAlertTitle>

/**
 * Descrição do Alert (primitivo).
 */
export const AlertDescription = UIAlertDescription
export type AlertDescriptionProps = React.ComponentProps<typeof UIAlertDescription>

export type AlertVariant = "default" | "destructive" | "success" | "warning" | "info"

export interface AlertProps extends Omit<AlertRootProps, "variant" | "children"> {
  /**
   * Variante do alert.
   * @default "default"
   */
  variant?: AlertVariant
  /**
   * Ícone exibido no alert.
   * Se não fornecido, um ícone padrão será usado baseado na variante.
   */
  icon?: React.ReactNode
  /**
   * Título do alert.
   */
  title?: React.ReactNode
  /**
   * Descrição ou conteúdo do alert.
   */
  description?: React.ReactNode
  /**
   * Conteúdo adicional do alert.
   */
  children?: React.ReactNode
  /**
   * Mostrar botão de fechar.
   * @default false
   */
  dismissible?: boolean
  /**
   * Callback chamado quando o alert é fechado.
   */
  onDismiss?: () => void
  /**
   * Classes CSS adicionais para o container.
   */
  containerClassName?: string
}

const variantIcons: Record<AlertVariant, React.ComponentType<{ className?: string }>> = {
  default: Info,
  destructive: AlertCircle,
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Info,
}

const variantStyles: Record<AlertVariant, string> = {
  default: "bg-background text-foreground",
  destructive: "border-destructive/50 text-destructive dark:border-destructive",
  success: "border-green-500/50 text-green-600 dark:border-green-500 dark:text-green-400",
  warning: "border-yellow-500/50 text-yellow-600 dark:border-yellow-500 dark:text-yellow-400",
  info: "border-blue-500/50 text-blue-600 dark:border-blue-500 dark:text-blue-400",
}

/**
 * Alert padrão do Design System.
 *
 * Componente de alerta para exibir mensagens importantes ao usuário.
 * Suporta diferentes variantes: default, destructive, success, warning, info.
 *
 * @example
 * ```tsx
 * import { Alert } from "@phsa.tec/design-system-react"
 *
 * // Alert simples
 * <Alert title="Atenção" description="Esta é uma mensagem importante." />
 *
 * // Alert de sucesso
 * <Alert variant="success" title="Sucesso!" description="Operação realizada com sucesso." />
 *
 * // Alert com ícone customizado
 * <Alert
 *   variant="warning"
 *   icon={<CustomIcon />}
 *   title="Aviso"
 *   description="Verifique os dados antes de continuar."
 * />
 * ```
 */
export const Alert = ({
  variant = "default",
  icon,
  title,
  description,
  children,
  dismissible = false,
  onDismiss,
  className,
  containerClassName,
  ...rest
}: AlertProps) => {
  const [isVisible, setIsVisible] = React.useState(true)

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  if (!isVisible) {
    return null
  }

  const IconComponent = variantIcons[variant]
  const defaultIcon = icon !== undefined ? icon : <IconComponent className="h-4 w-4" />

  // Mapear variantes customizadas para as variantes do shadcn
  const shadcnVariant = variant === "destructive" ? "destructive" : "default"

  return (
    <AlertRoot
      variant={shadcnVariant}
      className={cn(
        variantStyles[variant],
        dismissible && "pr-10",
        className
      )}
      {...rest}
    >
      {defaultIcon}
      <div className={cn("flex-1", containerClassName)}>
        {title && <AlertTitle>{title}</AlertTitle>}
        {description && <AlertDescription>{description}</AlertDescription>}
        {children && <div className="mt-2">{children}</div>}
      </div>
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Fechar alerta"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </AlertRoot>
  )
}
