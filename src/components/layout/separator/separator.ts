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
 * @csspart separator - A linha (as duas, quando há `label`).
 * @csspart label - O texto no meio.
 */
export class PhsaSeparator extends PhsaElement {
  static styles = unsafeCSS(styles);

  @property() orientation: SeparatorOrientation = "horizontal";
  /** Quando falso, vira um separador anunciado (`role="separator"`). */
  @property({ type: Boolean }) decorative = true;
  /** Texto no meio da linha (só na horizontal), como "ou". */
  @property() label = "";

  render() {
    const orientation = orientations[this.orientation] ? this.orientation : "horizontal";
    if (this.label && orientation === "horizontal") {
      return html`
        <div
          class="phsa-root ds:flex ds:w-full ds:items-center ds:gap-3 ${this.hostClass}"
          role=${this.decorative ? "none" : "separator"}
          aria-label=${this.decorative ? nothing : this.label}
        >
          <div part="separator" class="ds:h-px ds:flex-1 ds:bg-border"></div>
          <span part="label" class="ds:shrink-0 ds:text-xs ds:uppercase ds:tracking-wide ds:text-muted-foreground">${this.label}</span>
          <div part="separator" class="ds:h-px ds:flex-1 ds:bg-border"></div>
        </div>
      `;
    }
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
