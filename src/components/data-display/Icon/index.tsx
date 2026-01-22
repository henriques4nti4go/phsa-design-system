// src/components/data-display/Icon/index.tsx
import * as React from "react"
import type { IconType } from "react-icons"
import * as FiIcons from "react-icons/fi"
import * as FaIcons from "react-icons/fa"
import * as Fa6Icons from "react-icons/fa6"
import * as MdIcons from "react-icons/md"
import * as HiIcons from "react-icons/hi"
import * as Hi2Icons from "react-icons/hi2"
import * as BiIcons from "react-icons/bi"
import * as AiIcons from "react-icons/ai"
import * as BsIcons from "react-icons/bs"
import * as IoIcons from "react-icons/io"
import * as Io5Icons from "react-icons/io5"
import * as RiIcons from "react-icons/ri"
import * as TbIcons from "react-icons/tb"
import * as CgIcons from "react-icons/cg"
import * as VscIcons from "react-icons/vsc"
import * as SiIcons from "react-icons/si"
import * as GoIcons from "react-icons/go"
import * as DiIcons from "react-icons/di"
import * as GrIcons from "react-icons/gr"
import * as WiIcons from "react-icons/wi"
import * as ImIcons from "react-icons/im"
import * as RxIcons from "react-icons/rx"
import * as LuIcons from "react-icons/lu"

// Mapeamento de prefixos para bibliotecas de ícones
const iconLibraries: Record<string, Record<string, IconType>> = {
  Fi: FiIcons as Record<string, IconType>,
  Fa: FaIcons as Record<string, IconType>,
  Fa6: Fa6Icons as Record<string, IconType>,
  Md: MdIcons as Record<string, IconType>,
  Hi: HiIcons as Record<string, IconType>,
  Hi2: Hi2Icons as Record<string, IconType>,
  Bi: BiIcons as Record<string, IconType>,
  Ai: AiIcons as Record<string, IconType>,
  Bs: BsIcons as Record<string, IconType>,
  Io: IoIcons as Record<string, IconType>,
  Io5: Io5Icons as Record<string, IconType>,
  Ri: RiIcons as Record<string, IconType>,
  Tb: TbIcons as Record<string, IconType>,
  Cg: CgIcons as Record<string, IconType>,
  Vsc: VscIcons as Record<string, IconType>,
  Si: SiIcons as Record<string, IconType>,
  Go: GoIcons as Record<string, IconType>,
  Di: DiIcons as Record<string, IconType>,
  Gr: GrIcons as Record<string, IconType>,
  Wi: WiIcons as Record<string, IconType>,
  Im: ImIcons as Record<string, IconType>,
  Rx: RxIcons as Record<string, IconType>,
  Lu: LuIcons as Record<string, IconType>,
}

/**
 * Obtém o componente de ícone baseado no nome
 */
function getIconByName(iconName: string): IconType | null {
  // Tenta identificar o prefixo (2 ou 3 caracteres)
  const prefix2 = iconName.substring(0, 2)
  const prefix3 = iconName.substring(0, 3)

  // Tenta primeiro com prefixo de 3 caracteres (ex: Fa6, Hi2, Io5)
  if (iconLibraries[prefix3]) {
    const icon = iconLibraries[prefix3][iconName]
    if (icon) return icon
  }

  // Tenta com prefixo de 2 caracteres
  if (iconLibraries[prefix2]) {
    const icon = iconLibraries[prefix2][iconName]
    if (icon) return icon
  }

  return null
}

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, "ref"> {
  /**
   * Nome do ícone do `react-icons` como string.
   * Exemplos: "MdHome", "FiUser", "FaHeart", "Hi2ArrowRight", etc.
   * O componente identifica automaticamente a biblioteca baseado no prefixo.
   */
  iconName: string
  /**
   * Tamanho do ícone em pixels ou qualquer valor CSS válido.
   * Atalho para a prop `size` do `react-icons`.
   * @default 20
   */
  size?: number | string
  /**
   * Texto descritivo para acessibilidade.
   * Se informado, o ícone terá `role="img"` e `aria-label`.
   * Se omitido, o ícone será decorativo (`aria-hidden="true"`).
   */
  "aria-label"?: string
}

/**
 * Componente de ícone genérico do Design System.
 *
 * Ele padroniza o uso de `react-icons` na aplicação, garantindo
 * tamanho, acessibilidade e extensibilidade consistentes.
 *
 * A cor do ícone pode ser controlada via:
 * - Prop `color` (valor CSS direto, ex: `color="#000"`, `color="red"`)
 * - Classes Tailwind CSS no `className` (ex: `className="text-primary"`, `className="text-red-500"`)
 *
 * @example
 * ```tsx
 * <Icon iconName="MdHome" size={24} color="#000" aria-label="Página inicial" />
 * <Icon iconName="FiUser" size={20} className="text-red-500" />
 * <Icon iconName="Fa6Heart" size={16} aria-label="Favorito" />
 * ```
 */
export const Icon = ({ iconName, size = 20, className, "aria-label": ariaLabel, ...rest }: IconProps) => {
  const IconComponent = React.useMemo(() => {
    const icon = getIconByName(iconName)
    if (!icon) {
      console.warn(`Ícone "${iconName}" não encontrado. Verifique se o nome está correto.`)
      return null
    }
    return icon
  }, [iconName])

  const accessibilityProps = ariaLabel
    ? {
        role: "img",
        "aria-label": ariaLabel,
      }
    : {
        "aria-hidden": true,
      }

  if (!IconComponent) {
    return null
  }

  return (
    <IconComponent
      size={size}
      className={className}
      {...accessibilityProps}
      {...rest}
    />
  )
}

Icon.displayName = "Icon"

export type { IconType }

