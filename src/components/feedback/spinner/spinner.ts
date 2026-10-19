import { html, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import styles from "./spinner.css?inline";

const sizes = {
  sm: "ds:size-4",
  default: "ds:size-6",
  lg: "ds:size-8",
};

export type SpinnerSize = keyof typeof sizes;
export const SPINNER_SIZES = Object.keys(sizes) as SpinnerSize[];

/**
 * Indicador circular de atividade.
 *
 * @tag phsa-spinner
 * @csspart spinner - O indicador visível.
 */
export class PhsaSpinner extends PhsaElement {
  static styles = unsafeCSS(styles);

  @property() size: SpinnerSize = "default";
  @property() label = "Carregando";

  render() {
    return html`
      <span
        part="spinner"
        role="status"
        class="phsa-root ds:inline-flex ds:items-center ds:justify-center ds:text-primary ${sizes[this.size] ?? sizes.default} ${this.hostClass}"
      >
        <svg class="ds:size-full" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle class="track" cx="12" cy="12" r="9" stroke="currentColor" stroke-width="3"></circle>
          <path class="indicator" d="M12 3a9 9 0 0 1 9 9" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path>
        </svg>
        <span class="ds:sr-only">${this.label}</span>
      </span>
    `;
  }
}
