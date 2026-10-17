import { LitElement, html, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import styles from "./dropdown-item.css?inline";

const variants = {
  default: "ds:focus-visible:bg-accent ds:focus-visible:text-accent-foreground ds:hover:bg-accent ds:hover:text-accent-foreground",
  destructive: "ds:text-destructive ds:focus-visible:bg-destructive/10 ds:focus-visible:text-destructive ds:hover:bg-destructive/10",
};

export type DropdownItemVariant = keyof typeof variants;
export const DROPDOWN_ITEM_VARIANTS = Object.keys(variants) as DropdownItemVariant[];

/**
 * Item de um `phsa-dropdown-menu`.
 *
 * @tag phsa-dropdown-item
 * @slot - Rótulo do item.
 * @csspart item - O botão.
 * @fires phsa-select - Ao ativar. `detail.value` é o `value`, ou o texto se ele estiver vazio.
 */
export class PhsaDropdownItem extends PhsaElement {
  static styles = unsafeCSS(styles);
  /** @ignore */
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  @property({ reflect: true }) value = "";
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ reflect: true }) variant: DropdownItemVariant = "default";

  /** Foca o botão interno; o menu controla o foco (tabindex -1 nos itens). */
  override focus(options?: FocusOptions) {
    const button = this.renderRoot?.querySelector("button");
    if (button) button.focus(options);
    else super.focus(options);
  }

  /** @ignore */
  private pick() {
    if (this.disabled) return;
    const value = this.value || this.textContent?.trim() || "";
    this.dispatchEvent(new CustomEvent("phsa-select", { bubbles: true, composed: true, detail: { value } }));
  }

  render() {
    const tone = variants[this.variant] ?? variants.default;
    return html`
      <button
        type="button"
        part="item"
        role="menuitem"
        tabindex="-1"
        class="phsa-root ds:flex ds:w-full ds:cursor-pointer ds:items-center ds:rounded-sm ds:border-0 ds:bg-transparent ds:px-2 ds:py-1.5 ds:text-left ds:text-sm ds:outline-none ds:disabled:cursor-not-allowed ds:disabled:opacity-50 ${tone}"
        ?disabled=${this.disabled}
        @click=${this.pick}
      >
        <slot></slot>
      </button>
    `;
  }
}
