// src/components/data-display/Card/index.tsx
import * as React from "react"

import {
  Card as UICard,
  CardHeader as UICardHeader,
  CardFooter as UICardFooter,
  CardTitle as UICardTitle,
  CardDescription as UICardDescription,
  CardContent as UICardContent,
} from "@/components/ui/card"

/**
 * Card raiz (primitivo) baseado no shadcn.
 *
 * Use quando precisar de controle total sobre a estrutura do card.
 */
export const CardRoot = UICard
export type CardRootProps = React.ComponentProps<typeof UICard>

/**
 * Cabeçalho do Card (primitivo).
 *
 * Normalmente contém `CardTitle` e `CardDescription`.
 */
export const CardHeader = UICardHeader
export type CardHeaderProps = React.ComponentProps<typeof UICardHeader>

/**
 * Título do Card (primitivo).
 */
export const CardTitle = UICardTitle
export type CardTitleProps = React.ComponentProps<typeof UICardTitle>

/**
 * Descrição do Card (primitivo).
 */
export const CardDescription = UICardDescription
export type CardDescriptionProps = React.ComponentProps<typeof UICardDescription>

/**
 * Conteúdo principal do Card (primitivo).
 */
export const CardContent = UICardContent
export type CardContentProps = React.ComponentProps<typeof UICardContent>

/**
 * Rodapé do Card (primitivo).
 *
 * Ideal para ações (botões) ou informações complementares.
 */
export const CardFooter = UICardFooter
export type CardFooterProps = React.ComponentProps<typeof UICardFooter>

export interface CardProps extends Omit<CardRootProps, "children" | "title"> {
  /**
   * Imagem ou mídia a ser exibida no topo do card.
   * Pode ser uma URL de imagem, um elemento React, ou qualquer conteúdo.
   */
  image?: React.ReactNode
  /**
   * Título do card.
   * Quando informado, é renderizado dentro de `CardHeader` usando `CardTitle`.
   */
  title?: React.ReactNode
  /**
   * Badge ou tag a ser exibida ao lado do título (ex: "Featured", "Novo", etc.).
   * Renderizado no mesmo nível do título, alinhado à direita.
   */
  badge?: React.ReactNode
  /**
   * Descrição do card.
   * Quando informada, é renderizada dentro de `CardHeader` usando `CardDescription`.
   */
  description?: React.ReactNode
  /**
   * Conteúdo principal do card.
   * Renderizado dentro de `CardContent`.
   */
  children?: React.ReactNode
  /**
   * Conteúdo do rodapé do card.
   * Renderizado dentro de `CardFooter` (ex: botões de ação).
   */
  footer?: React.ReactNode
}

/**
 * Card padrão do Design System.
 *
 * Fornece uma estrutura de layout comum:
 * - Imagem/mídia opcional no topo (`image`)
 * - Header opcional com `title`, `badge` e `description`
 * - Content com `children`
 * - Footer opcional com `footer`
 *
 * Quando precisar de mais flexibilidade, use os primitivos:
 * `CardRoot`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.
 */
export const Card = ({
  image,
  title,
  badge,
  description,
  children,
  footer,
  ...rest
}: CardProps) => {
  const hasHeader = title || description || badge

  return (
    <CardRoot {...rest}>
      {image && (
        <div className="overflow-hidden rounded-t-xl">
          {typeof image === "string" ? (
            <img src={image} alt="" className="w-full h-auto object-cover" />
          ) : (
            image
          )}
        </div>
      )}

      {hasHeader && (
        <CardHeader>
          {(title || badge) && (
            <div className="flex items-start justify-between gap-4">
              {title && <CardTitle className="flex-1">{title}</CardTitle>}
              {badge && (
                <div className="flex-shrink-0 mt-0.5">{badge}</div>
              )}
            </div>
          )}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}

      {children && <CardContent>{children}</CardContent>}

      {footer && <CardFooter>{footer}</CardFooter>}
    </CardRoot>
  )
}

