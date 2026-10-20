import { html, unsafeCSS } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { PhsaToggle } from "../../../core/toggle";
import { Check } from "lucide";
import { icon } from "../../../core/icon";
import styles from "./checkbox.css?inline";

const check = icon(Check, "ds:size-3", { strokeWidth: 3 });

/**
 * Caixa de seleção. No `<form>`, envia `value` (padrão `on`) só quando marcada.
 *
 * @tag phsa-checkbox
 * @slot - Texto ao lado da caixa.
 * @csspart control - O botão interno.
 */
export class PhsaCheckbox extends PhsaToggle {
  static styles = unsafeCSS(styles);

  // Checkbox nativo só alterna com Espaço; o <button> também alternaria com Enter.
  /** @ignore */
  private onKeydown(event: KeyboardEvent) {
    if (event.key === "Enter") event.preventDefault();
  }

  /** @ignore */
  protected renderControl() {
    return html`
      <button
        part="control"
        type="button"
        role="checkbox"
        id="phsa-control"
        class="phsa-root ds:group ds:inline-flex ds:cursor-pointer ds:items-center ds:gap-2 ds:border-0 ds:bg-transparent ds:p-0 ds:text-left ds:text-sm ds:font-medium ds:text-foreground ds:select-none ds:focus-visible:outline-none ds:disabled:cursor-not-allowed ds:disabled:opacity-50 ${this.hostClass}"
        aria-checked=${this.checked ? "true" : "false"}
        aria-describedby=${ifDefined(this.describedBy)}
        aria-invalid=${ifDefined(this.showInvalid ? "true" : undefined)}
        aria-required=${ifDefined(this.required ? "true" : undefined)}
        ?disabled=${this.isDisabled}
        @click=${this.onControlClick}
        @keydown=${this.onKeydown}
      >
        <span
          class="ds:flex ds:size-4 ds:shrink-0 ds:items-center ds:justify-center ds:rounded-sm ds:border ds:shadow-sm ds:ring-offset-background ds:group-focus-visible:ring-2 ds:group-focus-visible:ring-offset-2 ${this.checked ? "ds:bg-primary ds:text-primary-foreground" : "ds:bg-background"} ${this.showInvalid ? "ds:border-destructive ds:group-focus-visible:ring-destructive" : this.checked ? "ds:border-primary ds:group-focus-visible:ring-ring" : "ds:border-input ds:group-focus-visible:ring-ring"}"
          >${this.checked ? check : ""}</span
        >
        ${this.renderText()}
      </button>
      <input
        data-control
        type="checkbox"
        tabindex="-1"
        aria-hidden="true"
        class="ds:sr-only"
        ?required=${this.required}
        ?disabled=${this.isDisabled}
      />
    `;
  }
}
