import { html } from "lit";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";

/** Formato dos ícones do Lucide: a lista de elementos dentro do `<svg>` 24×24. */
export type IconNode = [tag: string, attrs: Record<string, string | number | undefined>][];

export const iconSizes = { xs: 12, sm: 16, md: 20, lg: 24, xl: 32 };

export const iconTones = {
  inherit: "",
  default: "var(--phsa-foreground)",
  muted: "var(--phsa-muted-foreground)",
  primary: "var(--phsa-primary)",
  destructive: "var(--phsa-destructive)",
  success: "var(--phsa-success)",
  warning: "var(--phsa-warning)",
  info: "var(--phsa-info)",
};

export type IconSize = keyof typeof iconSizes;
export type IconTone = keyof typeof iconTones;
export const ICON_SIZES = Object.keys(iconSizes) as IconSize[];
export const ICON_TONES = Object.keys(iconTones) as IconTone[];

const escape = (value: string | number) =>
  String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// O mesmo ícone repetido (linhas de tabela, itens de menu) monta a string uma vez só.
const markup = new WeakMap<IconNode, string>();

/** Conteúdo do `<svg>` (os `path`, `circle`...), em texto. */
export function iconMarkup(node: IconNode) {
  let result = markup.get(node);
  if (result === undefined) {
    result = node
      .map(([tag, attrs]) => `<${tag} ${Object.entries(attrs)
          .filter(([, value]) => value !== undefined)
          .map(([key, value]) => `${key}="${escape(value!)}"`)
          .join(" ")}/>`)
      .join("");
    markup.set(node, result);
  }
  return result;
}

/**
 * Ícone decorativo dentro do shadow root de um componente. O tamanho vem das classes,
 * que ficam no arquivo do componente para o Tailwind achar.
 */
export function icon(node: IconNode, className = "", { strokeWidth = 2, fill = "none" } = {}) {
  return html`<svg
    class=${className}
    viewBox="0 0 24 24"
    fill=${fill}
    stroke="currentColor"
    stroke-width=${strokeWidth}
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >${unsafeSVG(iconMarkup(node))}</svg>`;
}
