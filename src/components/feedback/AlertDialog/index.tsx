// src/components/feedback/AlertDialog/index.tsx
import * as React from "react"

import {
  AlertDialog as UIAlertDialog,
  AlertDialogTrigger as UIAlertDialogTrigger,
  AlertDialogPortal as UIAlertDialogPortal,
  AlertDialogOverlay as UIAlertDialogOverlay,
  AlertDialogContent as UIAlertDialogContent,
  AlertDialogHeader as UIAlertDialogHeader,
  AlertDialogFooter as UIAlertDialogFooter,
  AlertDialogTitle as UIAlertDialogTitle,
  AlertDialogDescription as UIAlertDialogDescription,
  AlertDialogAction as UIAlertDialogAction,
  AlertDialogCancel as UIAlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/actions/Button"

/**
 * AlertDialog raiz (primitivo) baseado no Radix UI.
 *
 * Use quando precisar de controle total sobre a estrutura do alert dialog.
 */
export const AlertDialogRoot = UIAlertDialog
export type AlertDialogRootProps = React.ComponentProps<typeof UIAlertDialog>

/**
 * Trigger do AlertDialog (primitivo).
 *
 * Elemento que abre o alert dialog quando clicado.
 */
export const AlertDialogTrigger = UIAlertDialogTrigger
export type AlertDialogTriggerProps = React.ComponentProps<typeof UIAlertDialogTrigger>

/**
 * Portal do AlertDialog (primitivo).
 */
export const AlertDialogPortal = UIAlertDialogPortal
export type AlertDialogPortalProps = React.ComponentProps<typeof UIAlertDialogPortal>

/**
 * Overlay do AlertDialog (primitivo).
 */
export const AlertDialogOverlay = UIAlertDialogOverlay
export type AlertDialogOverlayProps = React.ComponentProps<typeof UIAlertDialogOverlay>

/**
 * Conteúdo principal do AlertDialog (primitivo).
 */
export const AlertDialogContent = UIAlertDialogContent
export type AlertDialogContentProps = React.ComponentProps<typeof UIAlertDialogContent>

/**
 * Cabeçalho do AlertDialog (primitivo).
 */
export const AlertDialogHeader = UIAlertDialogHeader
export type AlertDialogHeaderProps = React.ComponentProps<typeof UIAlertDialogHeader>

/**
 * Rodapé do AlertDialog (primitivo).
 */
export const AlertDialogFooter = UIAlertDialogFooter
export type AlertDialogFooterProps = React.ComponentProps<typeof UIAlertDialogFooter>

/**
 * Título do AlertDialog (primitivo).
 */
export const AlertDialogTitle = UIAlertDialogTitle
export type AlertDialogTitleProps = React.ComponentProps<typeof UIAlertDialogTitle>

/**
 * Descrição do AlertDialog (primitivo).
 */
export const AlertDialogDescription = UIAlertDialogDescription
export type AlertDialogDescriptionProps = React.ComponentProps<typeof UIAlertDialogDescription>

/**
 * Botão de ação do AlertDialog (primitivo).
 */
export const AlertDialogAction = UIAlertDialogAction
export type AlertDialogActionProps = React.ComponentProps<typeof UIAlertDialogAction>

/**
 * Botão de cancelar do AlertDialog (primitivo).
 */
export const AlertDialogCancel = UIAlertDialogCancel
export type AlertDialogCancelProps = React.ComponentProps<typeof UIAlertDialogCancel>

export interface AlertDialogProps extends Omit<AlertDialogRootProps, "children"> {
  /**
   * Elemento que aciona a abertura do alert dialog.
   * Normalmente um botão ou link.
   */
  trigger?: React.ReactNode
  /**
   * Título do alert dialog.
   * Quando informado, é renderizado dentro de `AlertDialogHeader` usando `AlertDialogTitle`.
   */
  title?: React.ReactNode
  /**
   * Descrição do alert dialog.
   * Quando informada, é renderizada dentro de `AlertDialogHeader` usando `AlertDialogDescription`.
   */
  description?: React.ReactNode
  /**
   * Conteúdo principal do alert dialog.
   * Renderizado dentro de `AlertDialogContent`.
   */
  children?: React.ReactNode
  /**
   * Label do botão de ação principal (confirmar).
   * @default "Confirmar"
   */
  actionLabel?: string
  /**
   * Label do botão de cancelar.
   * @default "Cancelar"
   */
  cancelLabel?: string
  /**
   * Variante do botão de ação.
   * @default "default"
   */
  actionVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  /**
   * Callback chamado quando o botão de ação é clicado.
   */
  onAction?: () => void
  /**
   * Callback chamado quando o botão de cancelar é clicado.
   */
  onCancel?: () => void
  /**
   * Mostrar botão de cancelar.
   * @default true
   */
  showCancel?: boolean
  /**
   * Conteúdo customizado do rodapé.
   * Quando fornecido, substitui os botões padrão.
   */
  footer?: React.ReactNode
  /**
   * Controla se o alert dialog está aberto ou fechado.
   * Use para controlar o estado externamente.
   */
  open?: boolean
  /**
   * Callback chamado quando o estado de abertura muda.
   */
  onOpenChange?: (open: boolean) => void
}

/**
 * AlertDialog padrão do Design System.
 *
 * Componente de dialog de alerta usado para confirmações críticas.
 * Diferente do Dialog comum, não pode ser fechado clicando fora ou pressionando ESC -
 * apenas através dos botões de ação.
 *
 * @example
 * ```tsx
 * import { AlertDialog } from "@phsa.tec/design-system-react"
 *
 * // Confirmação simples
 * <AlertDialog
 *   trigger={<Button>Excluir</Button>}
 *   title="Confirmar exclusão"
 *   description="Esta ação não pode ser desfeita."
 *   onAction={() => console.log("Confirmado")}
 * />
 *
 * // Com ações customizadas
 * <AlertDialog
 *   trigger={<Button>Salvar</Button>}
 *   title="Salvar alterações?"
 *   description="Você tem alterações não salvas."
 *   actionLabel="Salvar"
 *   cancelLabel="Descartar"
 *   onAction={handleSave}
 *   onCancel={handleDiscard}
 * />
 * ```
 */
export const AlertDialog = ({
  trigger,
  title,
  description,
  children,
  actionLabel = "Confirmar",
  cancelLabel = "Cancelar",
  actionVariant = "default",
  onAction,
  onCancel,
  showCancel = true,
  footer,
  open,
  onOpenChange,
  ...rest
}: AlertDialogProps) => {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  const handleAction = () => {
    onAction?.()
    handleOpenChange(false)
  }

  const handleCancel = () => {
    onCancel?.()
    handleOpenChange(false)
  }

  const hasHeader = title || description

  return (
    <AlertDialogRoot open={isOpen} onOpenChange={handleOpenChange} {...rest}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent>
        {hasHeader && (
          <AlertDialogHeader>
            {title && <AlertDialogTitle>{title}</AlertDialogTitle>}
            {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
          </AlertDialogHeader>
        )}

        {children && <div className="py-4">{children}</div>}

        {footer ? (
          <AlertDialogFooter>{footer}</AlertDialogFooter>
        ) : (
          <AlertDialogFooter>
            {showCancel && (
              <AlertDialogCancel asChild>
                <Button variant="outline" onClick={handleCancel}>
                  {cancelLabel}
                </Button>
              </AlertDialogCancel>
            )}
            <AlertDialogAction asChild>
              <Button variant={actionVariant} onClick={handleAction}>
                {actionLabel}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialogRoot>
  )
}
