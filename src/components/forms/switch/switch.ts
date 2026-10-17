import { html, unsafeCSS } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { PhsaToggle } from "../../../core/toggle";
import styles from "./switch.css?inline";

/**
 * Interruptor. No `<form>`, envia `value` (padrão `on`) só quando ligado.
 *
 * @tag phsa-switch
 * @slot - Texto ao lado do interruptor.
 * @csspart control - O botão interno.
 */
export class PhsaSwitch extends PhsaToggle {
  static styles = unsafeCSS(styles);

  render() {
    return html`
      <button
        part="control"
        type="button"
        role="switch"
        id="phsa-control"
        class="phsa-root ds:group ds:inline-flex ds:cursor-pointer ds:items-center ds:gap-2 ds:border-0 ds:bg-transparent ds:p-0 ds:text-left ds:text-sm ds:font-medium ds:text-foreground ds:select-none ds:focus-visible:outline-none ds:disabled:cursor-not-allowed ds:disabled:opacity-50 ${this.hostClass}"
        aria-checked=${this.checked ? "true" : "false"}
        aria-labelledby=${ifDefined(this.labelledBy)}
        aria-describedby=${ifDefined(this.describedBy)}
        aria-invalid=${ifDefined(this.showInvalid ? "true" : undefined)}
        aria-required=${ifDefined(this.required ? "true" : undefined)}
        ?disabled=${this.isDisabled}
        @click=${this.onControlClick}
      >
        <span
          class="ds:inline-flex ds:h-5 ds:w-9 ds:shrink-0 ds:items-center ds:rounded-full ds:border-2 ds:border-transparent ds:transition-colors ds:ring-offset-background ds:group-focus-visible:ring-2 ds:group-focus-visible:ring-offset-2 ${this.checked ? "ds:bg-primary" : "ds:bg-input"} ${this.showInvalid ? "ds:ring-2 ds:ring-destructive ds:group-focus-visible:ring-destructive" : "ds:group-focus-visible:ring-ring"}"
        >
          <span
            class="ds:pointer-events-none ds:block ds:size-4 ds:rounded-full ds:bg-background ds:shadow-sm ds:transition-transform ${this.checked ? "ds:translate-x-4" : "ds:translate-x-0"}"
          ></span>
        </span>
        <slot @slotchange=${this.onSlot}></slot>
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
      ${this.renderLabel()} ${this.renderDescription()}
    `;
  }
}
