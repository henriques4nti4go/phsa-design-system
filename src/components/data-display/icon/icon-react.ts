import * as React from "react";
import { iconSizes, iconTones, type IconNode, type IconSize, type IconTone } from "../../../core/icon";

export type IconProps = Omit<React.SVGProps<SVGSVGElement>, "ref" | "strokeWidth"> & {
  /** O ícone, importado de `@phsa.tec/design-system-react/icons/<nome>`. */
  icon: IconNode;
  size?: IconSize;
  tone?: IconTone;
  strokeWidth?: number;
  /** Nome para leitores de tela; sem ele, o ícone é decorativo. */
  label?: string;
};

/**
 * Ícone do Lucide como `<svg>` comum, sem custom element: sai pronto no HTML do
 * servidor (SSR) e não depende do JS do DS para aparecer.
 *
 * Tamanho, cor e traço vão em `style` inline, que o CSS do projeto (`svg { ... }`) não vence.
 */
export function Icon({ icon, size = "sm", tone = "inherit", strokeWidth = 2, label, style, ...rest }: IconProps) {
  const px = iconSizes[size] ?? iconSizes.sm;
  const color = iconTones[tone] || undefined;
  return React.createElement(
    "svg",
    {
      width: px,
      height: px,
      viewBox: "0 0 24 24",
      role: label ? "img" : undefined,
      "aria-label": label || undefined,
      "aria-hidden": label ? undefined : true,
      focusable: "false",
      ...rest,
      style: {
        display: "inline-block",
        flexShrink: 0,
        verticalAlign: "middle",
        width: px,
        height: px,
        color,
        fill: "none",
        stroke: "currentColor",
        strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        ...style,
      },
    },
    icon.map(([tag, attrs], index) => React.createElement(tag, { key: index, ...attrs })),
  );
}
