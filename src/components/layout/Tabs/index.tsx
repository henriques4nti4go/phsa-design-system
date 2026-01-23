// src/components/layout/Tabs/index.tsx
import * as React from "react"

import {
  Tabs as UITabs,
  TabsList as UITabsList,
  TabsTrigger as UITabsTrigger,
  TabsContent as UITabsContent,
} from "@/components/ui/tabs"

/**
 * Tabs raiz (primitivo) baseado no Radix UI.
 *
 * Use quando precisar de controle total sobre a estrutura das tabs.
 */
export const TabsRoot = UITabs
export type TabsRootProps = React.ComponentProps<typeof UITabs>

/**
 * Lista de tabs (primitivo).
 *
 * Container que agrupa os triggers das tabs.
 */
export const TabsList = UITabsList
export type TabsListProps = React.ComponentProps<typeof UITabsList>

/**
 * Trigger de tab (primitivo).
 *
 * Botão que ativa uma tab específica.
 */
export const TabsTrigger = UITabsTrigger
export type TabsTriggerProps = React.ComponentProps<typeof UITabsTrigger>

/**
 * Conteúdo de tab (primitivo).
 *
 * Container que exibe o conteúdo de uma tab quando ativa.
 */
export const TabsContent = UITabsContent
export type TabsContentProps = React.ComponentProps<typeof UITabsContent>

export interface TabItem {
  /**
   * Valor único que identifica a tab.
   */
  value: string
  /**
   * Label exibido no trigger da tab.
   */
  label: React.ReactNode
  /**
   * Conteúdo exibido quando a tab está ativa.
   */
  content: React.ReactNode
  /**
   * Ícone opcional exibido antes do label.
   */
  icon?: React.ReactNode
  /**
   * Define se a tab está desabilitada.
   */
  disabled?: boolean
  /**
   * Badge ou contador exibido ao lado do label.
   */
  badge?: React.ReactNode
}

export interface TabsProps extends Omit<TabsRootProps, "children"> {
  /**
   * Array de itens de tab.
   * Cada item define uma tab com seu valor, label e conteúdo.
   */
  items: TabItem[]
  /**
   * Valor da tab ativa inicialmente.
   * Se não fornecido, a primeira tab será ativa.
   */
  defaultValue?: string
  /**
   * Valor da tab ativa (controlado).
   * Use junto com `onValueChange` para controlar o estado externamente.
   */
  value?: string
  /**
   * Callback chamado quando o valor da tab muda.
   */
  onValueChange?: (value: string) => void
  /**
   * Classes CSS adicionais para o container das tabs.
   */
  className?: string
  /**
   * Classes CSS adicionais para a lista de tabs.
   */
  listClassName?: string
  /**
   * Classes CSS adicionais para o conteúdo.
   */
  contentClassName?: string
  /**
   * Orientação das tabs.
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical"
}

/**
 * Tabs padrão do Design System.
 *
 * Componente de tabs para organizar conteúdo em múltiplas seções.
 * Suporta tabs horizontais e verticais, com ícones e badges opcionais.
 *
 * @example
 * ```tsx
 * import { Tabs } from "@phsa.tec/design-system-react"
 *
 * // Tabs simples
 * <Tabs
 *   items={[
 *     { value: "tab1", label: "Tab 1", content: <div>Conteúdo 1</div> },
 *     { value: "tab2", label: "Tab 2", content: <div>Conteúdo 2</div> },
 *   ]}
 * />
 *
 * // Tabs com ícones e badges
 * <Tabs
 *   items={[
 *     {
 *       value: "profile",
 *       label: "Perfil",
 *       icon: <UserIcon />,
 *       content: <ProfileContent />,
 *     },
 *     {
 *       value: "settings",
 *       label: "Configurações",
 *       icon: <SettingsIcon />,
 *       badge: <Badge>3</Badge>,
 *       content: <SettingsContent />,
 *     },
 *   ]}
 * />
 * ```
 */
export const Tabs = ({
  items,
  defaultValue,
  value,
  onValueChange,
  className,
  listClassName,
  contentClassName,
  orientation = "horizontal",
  ...rest
}: TabsProps) => {
  const defaultTabValue = defaultValue || (items.length > 0 ? items[0].value : undefined)

  return (
    <TabsRoot
      defaultValue={defaultTabValue}
      value={value}
      onValueChange={onValueChange}
      orientation={orientation}
      className={className}
      {...rest}
    >
      <TabsList className={listClassName}>
        {items.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className="flex items-center gap-2"
          >
            {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
            <span>{item.label}</span>
            {item.badge && <span className="ml-1">{item.badge}</span>}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map((item) => (
        <TabsContent key={item.value} value={item.value} className={contentClassName}>
          {item.content}
        </TabsContent>
      ))}
    </TabsRoot>
  )
}
