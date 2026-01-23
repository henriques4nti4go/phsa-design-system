// src/components/feedback/Dialog/index.tsx
import * as React from "react"

import {
  Dialog as UIDialog,
  DialogTrigger as UIDialogTrigger,
  DialogPortal as UIDialogPortal,
  DialogClose as UIDialogClose,
  DialogOverlay as UIDialogOverlay,
  DialogContent as UIDialogContent,
  DialogHeader as UIDialogHeader,
  DialogFooter as UIDialogFooter,
  DialogTitle as UIDialogTitle,
  DialogDescription as UIDialogDescription,
} from "@/components/ui/dialog"

/**
 * Dialog raiz (primitivo) baseado no shadcn.
 *
 * Use quando precisar de controle total sobre a estrutura do dialog.
 */
export const DialogRoot = UIDialog
export type DialogRootProps = React.ComponentProps<typeof UIDialog>

/**
 * Trigger do Dialog (primitivo).
 *
 * Elemento que abre o dialog quando clicado.
 */
export const DialogTrigger = UIDialogTrigger
export type DialogTriggerProps = React.ComponentProps<typeof UIDialogTrigger>

/**
 * Portal do Dialog (primitivo).
 *
 * Controla onde o dialog é renderizado no DOM.
 */
export const DialogPortal = UIDialogPortal
export type DialogPortalProps = React.ComponentProps<typeof UIDialogPortal>

/**
 * Overlay do Dialog (primitivo).
 *
 * Fundo escuro que aparece atrás do dialog.
 */
export const DialogOverlay = UIDialogOverlay
export type DialogOverlayProps = React.ComponentProps<typeof UIDialogOverlay>

/**
 * Botão de fechar do Dialog (primitivo).
 */
export const DialogClose = UIDialogClose
export type DialogCloseProps = React.ComponentProps<typeof UIDialogClose>

/**
 * Conteúdo principal do Dialog (primitivo).
 *
 * Container que envolve todo o conteúdo do dialog.
 */
export const DialogContent = UIDialogContent
export type DialogContentProps = React.ComponentProps<typeof UIDialogContent>

/**
 * Cabeçalho do Dialog (primitivo).
 *
 * Normalmente contém `DialogTitle` e `DialogDescription`.
 */
export const DialogHeader = UIDialogHeader
export type DialogHeaderProps = React.ComponentProps<typeof UIDialogHeader>

/**
 * Rodapé do Dialog (primitivo).
 *
 * Ideal para ações (botões) ou informações complementares.
 */
export const DialogFooter = UIDialogFooter
export type DialogFooterProps = React.ComponentProps<typeof UIDialogFooter>

/**
 * Título do Dialog (primitivo).
 */
export const DialogTitle = UIDialogTitle
export type DialogTitleProps = React.ComponentProps<typeof UIDialogTitle>

/**
 * Descrição do Dialog (primitivo).
 */
export const DialogDescription = UIDialogDescription
export type DialogDescriptionProps = React.ComponentProps<typeof UIDialogDescription>

export interface DialogProps extends Omit<DialogRootProps, "children"> {
  /**
   * Elemento que aciona a abertura do dialog.
   * Normalmente um botão ou link.
   */
  trigger?: React.ReactNode
  /**
   * Título do dialog.
   * Quando informado, é renderizado dentro de `DialogHeader` usando `DialogTitle`.
   */
  title?: React.ReactNode
  /**
   * Descrição do dialog.
   * Quando informada, é renderizada dentro de `DialogHeader` usando `DialogDescription`.
   */
  description?: React.ReactNode
  /**
   * Conteúdo principal do dialog.
   * Renderizado dentro de `DialogContent`.
   */
  children?: React.ReactNode
  /**
   * Conteúdo do rodapé do dialog.
   * Renderizado dentro de `DialogFooter` (ex: botões de ação).
   */
  footer?: React.ReactNode
  /**
   * Controla se o dialog está aberto ou fechado.
   * Use para controlar o estado do dialog externamente.
   */
  open?: boolean
  /**
   * Callback chamado quando o estado de abertura do dialog muda.
   */
  onOpenChange?: (open: boolean) => void
}

/**
 * Dialog padrão do Design System.
 *
 * Fornece uma estrutura de layout comum:
 * - Trigger opcional (`trigger`)
 * - Header opcional com `title` e `description`
 * - Content com `children`
 * - Footer opcional com `footer`
 *
 * Quando precisar de mais flexibilidade, use os primitivos:
 * `DialogRoot`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`,
 * `DialogDescription`, `DialogFooter`, etc.
 */
export const Dialog = ({
  trigger,
  title,
  description,
  children,
  footer,
  open,
  onOpenChange,
  ...rest
}: DialogProps) => {
  const hasHeader = title || description

  return (
    <DialogRoot open={open} onOpenChange={onOpenChange} {...rest}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent>
        {hasHeader && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}

        {children && <div className="py-4">{children}</div>}

        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </DialogRoot>
  )
}
