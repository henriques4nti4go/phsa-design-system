import { html, unsafeCSS } from "lit";
import { property, state } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import styles from "./radio.css?inline";

/**
 * Uma opção de `<phsa-radio-group>`. O valor do grupo é quem entra no `<form>`.
 *
 * @tag phsa-radio
 * @slot - Texto da opção.
 * @csspart control - O botão interno.
 */
export class PhsaRadio extends PhsaElement {
  static styles = unsafeCSS(styles);

  @property() value = "";
  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** @ignore */
  @state() groupDisabled = false;
  /** @ignore */
  @state() markedInvalid = false;
  /** @ignore */
  @state() private tabStop = false;

  override focus(options?: FocusOptions) {
    this.renderRoot.querySelector<HTMLElement>("button")?.focus(options);
  }

  /** @ignore */
  setTabStop(on: boolean) {
    if (this.tabStop === on) return;
    this.tabStop = on;
  }

  /** @ignore */
  private choose() {
    if (this.disabled || this.groupDisabled) return;
    this.dispatchEvent(new Event("phsa-radio", { bubbles: true, composed: true }));
  }

  render() {
    const off = this.disabled || this.groupDisabled;
    return html`
      <button
        part="control"
        type="button"
        role="radio"
        class="phsa-root ds:group ds:inline-flex ds:items-center ds:gap-2 ds:border-0 ds:bg-transparent ds:p-0 ds:text-left ds:text-sm ds:font-medium ds:text-foreground ds:select-none ds:focus-visible:outline-none ${off ? "ds:cursor-not-allowed ds:opacity-50" : "ds:cursor-pointer"} ${this.hostClass}"
        aria-checked=${this.checked ? "true" : "false"}
        tabindex=${this.tabStop && !off ? 0 : -1}
        ?disabled=${off}
        @click=${this.choose}
      >
        <span
          class="ds:flex ds:size-4 ds:shrink-0 ds:items-center ds:justify-center ds:rounded-full ds:border ds:shadow-sm ds:ring-offset-background ds:group-focus-visible:ring-2 ds:group-focus-visible:ring-offset-2 ${this.markedInvalid ? "ds:border-destructive ds:group-focus-visible:ring-destructive" : "ds:border-primary ds:group-focus-visible:ring-ring"}"
        >
          <span class="ds:size-2 ds:rounded-full ds:bg-primary ${this.checked ? "" : "ds:invisible"}"></span>
        </span>
        <slot></slot>
      </button>
    `;
  }
}
