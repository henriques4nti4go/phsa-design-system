// src/components/actions/Button/index.tsx
import * as React from "react"
import { Button as UIButton } from "@/components/ui/button"
import type { ButtonProps as UIButtonProps } from "@/components/ui/button"
import { Icon } from "@/components/data-display/Icon"

export type ButtonProps = UIButtonProps

/**
 * Botão padrão do Design System.
 * Reexporta o primitivo do shadcn com a mesma API.
 */
export const Button = UIButton

export interface ButtonIconProps extends Omit<ButtonProps, "children" | "size"> {
  /**
   * Nome do ícone do `react-icons` que será renderizado dentro do botão.
   * Exemplo: "MdHome", "FiUser", "FaHeart".
   */
  iconName: string
  /**
   * Cor do ícone. Valor CSS direto (ex: `"#fff"`, `"red"`).
   * Encaminhada para a prop `color` do componente `Icon`.
   */
  iconColor?: string
  /**
   * Classes CSS do Tailwind para estilizar o ícone.
   * Exemplo: `iconClassName="text-white"`, `iconClassName="text-primary"`.
   * Encaminhada para a prop `className` do componente `Icon`.
   */
  iconClassName?: string
  /**
   * Texto acessível para leitores de tela.
   * Use quando o botão não tiver label de texto visível.
   */
  "aria-label": string
  /**
   * Define se o botão deve ser apenas ícone (circular) ou ícone + texto.
   * - `true`: usa `size="icon"` e não renderiza children
   * - `false`: renderiza ícone seguido do children
   * @default true
   */
  iconOnly?: boolean
}

/**
 * Variação de botão com ícone.
 *
 * - `iconOnly=true`: renderiza somente o ícone, usando o tamanho `icon` do botão.
 * - `iconOnly=false`: renderiza ícone + children, usando o tamanho padrão do botão.
 *
 * @example
 * <ButtonIcon iconName="MdHome" iconColor="#fff" aria-label="Ir para home" />
 * <ButtonIcon iconName="FiUser" iconOnly={false} iconClassName="text-primary" aria-label="Perfil do usuário">
 *   Perfil
 * </ButtonIcon>
 */
export const ButtonIcon = ({
  iconName,
  iconColor,
  iconClassName,
  iconOnly = true,
  className,
  children,
  "aria-label": ariaLabel,
  size,
  ...rest
}: ButtonIconProps & { children?: React.ReactNode; size?: ButtonProps["size"] }) => {
  const content = (
    <>
      <Icon iconName={iconName} color={iconColor} className={iconClassName} aria-label={iconOnly ? ariaLabel : undefined} />
      {!iconOnly && children}
    </>
  )

  return (
    <UIButton
      {...rest}
      className={className}
      aria-label={ariaLabel}
      size={iconOnly ? "icon" : size}
    >
      {content}
    </UIButton>
  )
}

