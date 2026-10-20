import { unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { html, literal } from "lit/static-html.js";
import { PhsaElement } from "../../../core/phsa-element";
import { gaps, hideBelow, minHeights, paddings, type Breakpoint, type MinHeight, type Space } from "../../../core/layout";
import styles from "./stack.css?inline";

const directions = {
  column: "ds:flex-col",
  row: "ds:flex-row",
};

const aligns = {
  stretch: "ds:items-stretch",
  start: "ds:items-start",
  center: "ds:items-center",
  end: "ds:items-end",
  baseline: "ds:items-baseline",
};

const justifies = {
  start: "ds:justify-start",
  center: "ds:justify-center",
  end: "ds:justify-end",
  between: "ds:justify-between",
};

// Cada fundo já traz a cor de texto que combina com ele; sem fundo, herda a do pai.
const backgrounds = {
  none: "ds:text-inherit",
  background: "ds:bg-background ds:text-foreground",
  muted: "ds:bg-muted ds:text-foreground",
  primary: "ds:bg-primary ds:text-primary-foreground",
  secondary: "ds:bg-secondary ds:text-secondary-foreground",
  accent: "ds:bg-accent ds:text-accent-foreground",
};

const radii = {
  none: "",
  sm: "ds:rounded-sm",
  md: "ds:rounded-md",
  lg: "ds:rounded-lg",
  xl: "ds:rounded-xl",
  full: "ds:rounded-full",
};

const maxWidths = {
  none: "",
  xs: "ds:w-full ds:max-w-xs ds:mx-auto",
  sm: "ds:w-full ds:max-w-sm ds:mx-auto",
  md: "ds:w-full ds:max-w-md ds:mx-auto",
  lg: "ds:w-full ds:max-w-lg ds:mx-auto",
  xl: "ds:w-full ds:max-w-xl ds:mx-auto",
  "2xl": "ds:w-full ds:max-w-2xl ds:mx-auto",
  "4xl": "ds:w-full ds:max-w-4xl ds:mx-auto",
  "6xl": "ds:w-full ds:max-w-6xl ds:mx-auto",
};

const tags = {
  div: literal`div`,
  main: literal`main`,
  section: literal`section`,
  header: literal`header`,
  footer: literal`footer`,
  nav: literal`nav`,
  aside: literal`aside`,
  article: literal`article`,
};

export type StackDirection = keyof typeof directions;
export type StackAlign = keyof typeof aligns;
export type StackJustify = keyof typeof justifies;
export type StackBackground = keyof typeof backgrounds;
export type StackRadius = keyof typeof radii;
export type StackMaxWidth = keyof typeof maxWidths;
export type LayoutTag = keyof typeof tags;
export const STACK_DIRECTIONS = Object.keys(directions) as StackDirection[];
export const STACK_ALIGNS = Object.keys(aligns) as StackAlign[];
export const STACK_JUSTIFIES = Object.keys(justifies) as StackJustify[];
export const STACK_BACKGROUNDS = Object.keys(backgrounds) as StackBackground[];
export const STACK_RADII = Object.keys(radii) as StackRadius[];
export const STACK_MAX_WIDTHS = Object.keys(maxWidths) as StackMaxWidth[];
export const LAYOUT_TAGS = Object.keys(tags) as LayoutTag[];

/**
 * Empilha os filhos em coluna ou linha, com espaçamento da escala do DS. Também serve de
 * superfície (fundo, padding, borda) e de contêiner centralizado (`max-width`).
 *
 * @tag phsa-stack
 * @slot - Os itens.
 * @csspart stack - O contêiner flex.
 */
export class PhsaStack extends PhsaElement {
  static styles = unsafeCSS(styles);

  @property() direction: StackDirection = "column";
  @property() gap: Space = "md";
  @property() align: StackAlign = "stretch";
  @property() justify: StackJustify = "start";
  /** Quebra os itens em várias linhas quando não cabem. */
  @property({ type: Boolean }) wrap = false;
  @property() padding: Space = "none";
  @property() background: StackBackground = "none";
  @property() radius: StackRadius = "none";
  /** Borda com a cor `--phsa-border`. */
  @property({ type: Boolean }) bordered = false;
  /** Largura máxima; centraliza o stack no espaço que sobra. */
  @property({ attribute: "max-width" }) maxWidth: StackMaxWidth = "none";
  @property({ attribute: "min-height" }) minHeight: MinHeight = "none";
  /** Ocupa o espaço que sobra no stack pai. */
  @property({ type: Boolean }) grow = false;
  /** Esconde o stack abaixo do breakpoint. */
  @property({ attribute: "hide-below" }) hideBelow: Breakpoint | "" = "";
  /** Elemento semântico renderizado. */
  @property() as: LayoutTag = "div";

  render() {
    const tag = tags[this.as] ?? tags.div;
    const classes = [
      "phsa-root ds:flex",
      directions[this.direction] ?? directions.column,
      gaps[this.gap] ?? gaps.md,
      aligns[this.align] ?? aligns.stretch,
      justifies[this.justify] ?? justifies.start,
      this.wrap ? "ds:flex-wrap" : "",
      paddings[this.padding] ?? "",
      backgrounds[this.background] ?? backgrounds.none,
      radii[this.radius] ?? "",
      this.bordered ? "ds:border ds:border-border" : "",
      maxWidths[this.maxWidth] ?? "",
      minHeights[this.minHeight] ?? "",
      this.grow ? "ds:flex-1" : "",
      this.hideBelow ? (hideBelow[this.hideBelow] ?? "") : "",
      this.hostClass,
    ];
    return html`<${tag} part="stack" class=${classes.filter(Boolean).join(" ")}><slot></slot></${tag}>`;
  }
}
