import { LitElement, html, unsafeCSS, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import styles from "./collapsible.css?inline";

const chevron = html`
  <svg class="chevron ds:size-4 ds:shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="m9 18 6-6-6-6"></path>
  </svg>
`;

/**
 * Seção que abre e fecha. O gatilho é o `heading` (ou o slot `trigger`).
 *
 * @tag phsa-collapsible
 * @slot trigger - Rótulo do gatilho. Se vazio, usa `heading`.
 * @slot - Conteúdo expansível.
 * @csspart trigger - O botão.
 * @csspart content - O painel.
 * @fires phsa-toggle - Quando abre ou fecha. `detail.open` diz o estado.
 */
export class PhsaCollapsible extends PhsaElement {
  static styles = unsafeCSS(styles);
  /** @ignore */
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  @property() heading = "";
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  protected override updated(changed: PropertyValues) {
    super.updated(changed);
    if (typeof changed.get("open") === "boolean") {
      this.dispatchEvent(new CustomEvent("phsa-toggle", { bubbles: true, composed: true, detail: { open: this.open } }));
    }
  }

  /** Alterna aberto/fechado. */
  toggle() {
    if (this.disabled) return;
    this.open = !this.open;
  }

  /** @ignore */
  private onTrigger() {
    this.toggle();
  }

  render() {
    return html`
      <div class="phsa-root ds:block ds:bg-background ds:text-foreground ${this.hostClass}">
        <button
          type="button"
          part="trigger"
          aria-expanded=${this.open ? "true" : "false"}
          ?disabled=${this.disabled}
          class="ds:flex ds:w-full ds:cursor-pointer ds:items-center ds:justify-between ds:gap-4 ds:border-0 ds:bg-transparent ds:px-0 ds:py-2 ds:text-left ds:text-sm ds:font-medium ds:text-foreground ds:outline-none ds:hover:underline ds:focus-visible:ring-2 ds:focus-visible:ring-ring ds:disabled:cursor-not-allowed ds:disabled:opacity-50"
          @click=${this.onTrigger}
        >
          <span><slot name="trigger">${this.heading}</slot></span>
          ${chevron}
        </button>
        <div part="content" role="region" ?hidden=${!this.open} class="ds:pb-2 ds:text-sm ds:text-foreground">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
