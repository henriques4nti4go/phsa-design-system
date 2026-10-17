import { LitElement, html, unsafeCSS, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import styles from "./tab.css?inline";

/**
 * Aba de um `phsa-tabs`. Vai no slot `tab`.
 *
 * @tag phsa-tab
 * @slot - Rótulo da aba.
 * @csspart tab - O botão.
 * @fires phsa-tab-select - Interno: avisa o `phsa-tabs` dono. `detail.value` é o `value`. Não sai do `phsa-tabs`.
 */
export class PhsaTab extends PhsaElement {
  static styles = unsafeCSS(styles);
  /** @ignore */
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  @property({ reflect: true }) value = "";
  @property({ type: Boolean, reflect: true }) disabled = false;
  /** @ignore */
  @property({ attribute: false }) selected = false;
  /** Painel desta aba, ligado pelo `phsa-tabs`. @ignore */
  @property({ attribute: false }) panel: HTMLElement | null = null;

  protected override updated(changed: PropertyValues) {
    super.updated(changed);
    // `aria-controls` por id não atravessa shadow roots; a referência por elemento alcança o host do painel.
    const button = this.renderRoot.querySelector("button");
    if (changed.has("panel") && button && "ariaControlsElements" in Element.prototype) button.ariaControlsElements = this.panel ? [this.panel] : null;
  }

  /** @ignore */
  private pick() {
    if (this.disabled) return;
    this.dispatchEvent(new CustomEvent("phsa-tab-select", { bubbles: true, composed: true, detail: { value: this.value } }));
  }

  render() {
    const on = this.selected ? "ds:bg-background ds:text-foreground ds:shadow-sm" : "ds:text-muted-foreground";
    return html`
      <button
        type="button"
        part="tab"
        role="tab"
        class="phsa-root ds:inline-flex ds:items-center ds:justify-center ds:rounded-sm ds:border-0 ds:bg-transparent ds:px-3 ds:py-1.5 ds:text-sm ds:font-medium ds:whitespace-nowrap ds:cursor-pointer ds:outline-none ds:focus-visible:ring-2 ds:focus-visible:ring-ring ds:disabled:cursor-not-allowed ds:disabled:opacity-50 ${on}"
        aria-selected=${this.selected ? "true" : "false"}
        tabindex=${this.selected && !this.disabled ? 0 : -1}
        ?disabled=${this.disabled}
        @click=${this.pick}
      >
        <slot></slot>
      </button>
    `;
  }
}
