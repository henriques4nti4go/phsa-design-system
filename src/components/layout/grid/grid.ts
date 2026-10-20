import { nothing, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { html, literal } from "lit/static-html.js";
import { PhsaElement } from "../../../core/phsa-element";
import { gaps, minHeights, type Breakpoint, type MinHeight, type Space } from "../../../core/layout";
import styles from "./grid.css?inline";

const columns = {
  1: "ds:grid-cols-1",
  2: "ds:grid-cols-2",
  3: "ds:grid-cols-3",
  4: "ds:grid-cols-4",
  5: "ds:grid-cols-5",
  6: "ds:grid-cols-6",
  12: "ds:grid-cols-12",
};

// Vem depois de `grid-cols-*` no CSS (variante), então vence abaixo do breakpoint.
const stackBelow = {
  sm: "ds:max-sm:grid-cols-1",
  md: "ds:max-md:grid-cols-1",
  lg: "ds:max-lg:grid-cols-1",
};

const aligns = {
  stretch: "ds:items-stretch",
  start: "ds:items-start",
  center: "ds:items-center",
  end: "ds:items-end",
};

const tags = {
  div: literal`div`,
  main: literal`main`,
  section: literal`section`,
  ul: literal`ul`,
};

export type GridColumns = keyof typeof columns;
export type GridAlign = keyof typeof aligns;
export type GridTag = keyof typeof tags;
export const GRID_COLUMNS = Object.keys(columns).map(Number) as GridColumns[];
export const GRID_ALIGNS = Object.keys(aligns) as GridAlign[];

/**
 * Grade de colunas iguais. Com `min-item-width`, cabe quantas colunas couberem
 * (`auto-fit`) e ignora `columns`.
 *
 * @tag phsa-grid
 * @slot - Os itens.
 * @csspart grid - O contêiner grid.
 */
export class PhsaGrid extends PhsaElement {
  static styles = unsafeCSS(styles);

  @property({ type: Number }) columns: GridColumns = 1;
  /** Largura mínima de cada coluna (`16rem`, `240px`...): a grade se ajusta sozinha. */
  @property({ attribute: "min-item-width" }) minItemWidth = "";
  @property() gap: Space = "md";
  @property() align: GridAlign = "stretch";
  /** Abaixo do breakpoint, vira uma coluna só. */
  @property({ attribute: "stack-below" }) stackBelow: Breakpoint | "" = "";
  @property({ attribute: "min-height" }) minHeight: MinHeight = "none";
  @property() as: GridTag = "div";

  render() {
    const tag = tags[this.as] ?? tags.div;
    const classes = [
      "phsa-root ds:grid ds:text-inherit",
      this.minItemWidth ? "" : (columns[this.columns] ?? columns[1]),
      this.stackBelow ? (stackBelow[this.stackBelow] ?? "") : "",
      gaps[this.gap] ?? gaps.md,
      aligns[this.align] ?? aligns.stretch,
      minHeights[this.minHeight] ?? "",
      this.as === "ul" ? "ds:list-none" : "",
      this.hostClass,
    ];
    const style = this.minItemWidth
      ? `grid-template-columns: repeat(auto-fit, minmax(min(${this.minItemWidth}, 100%), 1fr))`
      : nothing;
    return html`<${tag} part="grid" class=${classes.filter(Boolean).join(" ")} style=${style}><slot></slot></${tag}>`;
  }
}
