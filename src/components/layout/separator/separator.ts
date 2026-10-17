import { html, nothing, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import styles from "./separator.css?inline";

const orientations = {
  horizontal: "ds:h-px ds:w-full",
  vertical: "ds:h-full ds:w-px",
};

export type SeparatorOrientation = keyof typeof orientations;
export const SEPARATOR_ORIENTATIONS = Object.keys(orientations) as SeparatorOrientation[];

/**
 * Linha divisória. `decorative` (padrão) some para leitores de tela.
 *
 * @tag phsa-separator
 */
export class PhsaSeparator extends PhsaElement {
  static styles = unsafeCSS(styles);

  @property() orientation: SeparatorOrientation = "horizontal";
  /** Quando falso, vira um separador anunciado (`role="separator"`). */
  @property({ type: Boolean }) decorative = true;

  render() {
    const orientation = orientations[this.orientation] ? this.orientation : "horizontal";
    return html`
      <div
        part="separator"
        class="phsa-root ds:block ds:shrink-0 ds:bg-border ${orientations[orientation]} ${this.hostClass}"
        role=${this.decorative ? "none" : "separator"}
        aria-orientation=${this.decorative ? nothing : orientation}
      ></div>
    `;
  }
}
