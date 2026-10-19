import { html, nothing, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import styles from "./progress.css?inline";

/**
 * Barra de progresso. Sem `value`, apresenta um estado indeterminado.
 *
 * @tag phsa-progress
 * @csspart track - O trilho.
 * @csspart indicator - O indicador de progresso.
 */
export class PhsaProgress extends PhsaElement {
  static styles = unsafeCSS(styles);

  @property({ type: Number }) value?: number;
  @property({ type: Number }) max = 100;
  @property() label = "Progresso";

  render() {
    const max = Number.isFinite(this.max) && this.max > 0 ? this.max : 100;
    const determinate = Number.isFinite(this.value);
    const value = determinate ? Math.min(Math.max(this.value ?? 0, 0), max) : 0;
    const percent = (value / max) * 100;
    return html`
      <div
        part="track"
        role="progressbar"
        aria-label=${this.label}
        aria-valuemin="0"
        aria-valuemax=${max}
        aria-valuenow=${determinate ? value : nothing}
        class="phsa-root ds:relative ds:h-2 ds:w-full ds:overflow-hidden ds:rounded-full ds:bg-secondary ${this.hostClass}"
      >
        <div
          part="indicator"
          class="ds:h-full ds:bg-primary ${determinate ? "" : "is-indeterminate"}"
          style=${determinate ? `width:${percent}%` : nothing}
        ></div>
      </div>
    `;
  }
}
