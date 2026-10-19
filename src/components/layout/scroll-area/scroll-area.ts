import { html, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import styles from "./scroll-area.css?inline";

const overflows = {
  vertical: "ds:overflow-x-hidden ds:overflow-y-auto",
  horizontal: "ds:overflow-x-auto ds:overflow-y-hidden",
  both: "ds:overflow-auto",
};

export type ScrollAreaOrientation = keyof typeof overflows;
export const SCROLL_AREA_ORIENTATIONS = Object.keys(overflows) as ScrollAreaOrientation[];

/**
 * Região com overflow e barra de rolagem do design system. A altura/largura
 * vêm das classes no host (`h-48`, `max-h-64`, …).
 *
 * @tag phsa-scroll-area
 * @slot - Conteúdo rolável.
 * @csspart viewport - A caixa com overflow.
 */
export class PhsaScrollArea extends PhsaElement {
  static styles = unsafeCSS(styles);

  @property() orientation: ScrollAreaOrientation = "vertical";

  render() {
    const overflow = overflows[this.orientation] ?? overflows.vertical;
    return html`
      <div part="viewport" class="phsa-root ds:block ${overflow} ${this.hostClass}">
        <slot></slot>
      </div>
    `;
  }
}
