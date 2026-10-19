import { LitElement, html, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import styles from "./accordion-item.css?inline";

const chevron = html`
  <svg class="chevron ds:size-4 ds:shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="m9 18 6-6-6-6"></path>
  </svg>
`;

/**
 * Item de um `phsa-accordion`.
 *
 * @tag phsa-accordion-item
 * @slot trigger - Conteúdo do botão; se vazio, usa `heading`.
 * @slot - Conteúdo expansível.
 * @csspart item - O contêiner do item.
 * @csspart trigger - O botão.
 * @csspart content - O painel.
 * @fires phsa-accordion-toggle - Interno: solicita a mudança ao accordion dono.
 */
export class PhsaAccordionItem extends PhsaElement {
  static styles = unsafeCSS(styles);
  /** @ignore */
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  @property({ reflect: true }) value = "";
  @property() heading = "";
  @property({ type: Boolean, reflect: true }) disabled = false;
  /** @ignore */
  @property({ type: Boolean, reflect: true }) open = false;

  /** @ignore */
  private toggle() {
    if (this.disabled) return;
    this.dispatchEvent(
      new CustomEvent("phsa-accordion-toggle", {
        bubbles: true,
        composed: true,
        detail: { value: this.value, open: !this.open },
      }),
    );
  }

  render() {
    return html`
      <div part="item" class="phsa-root ds:border-b ds:border-border ${this.hostClass}">
        <h3 class="ds:m-0">
          <button
            id="trigger"
            type="button"
            part="trigger"
            aria-expanded=${this.open ? "true" : "false"}
            aria-controls="content"
            ?disabled=${this.disabled}
            class="ds:flex ds:w-full ds:items-center ds:justify-between ds:gap-4 ds:border-0 ds:bg-transparent ds:px-0 ds:py-4 ds:text-left ds:text-sm ds:font-medium ds:text-foreground ds:cursor-pointer ds:outline-none ds:hover:underline ds:focus-visible:ring-2 ds:focus-visible:ring-ring ds:disabled:cursor-not-allowed ds:disabled:opacity-50"
            @click=${this.toggle}
          >
            <span><slot name="trigger">${this.heading}</slot></span>
            ${chevron}
          </button>
        </h3>
        <div
          id="content"
          part="content"
          role="region"
          aria-labelledby="trigger"
          ?hidden=${!this.open}
          class="ds:pb-4 ds:text-sm ds:text-foreground"
        >
          <slot></slot>
        </div>
      </div>
    `;
  }
}
