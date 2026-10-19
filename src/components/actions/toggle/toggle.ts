import { LitElement, html, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import styles from "./toggle.css?inline";

const variants = {
  default: "ds:hover:bg-muted ds:hover:text-muted-foreground ds:aria-pressed:bg-accent ds:aria-pressed:text-accent-foreground",
  outline: "ds:border ds:border-input ds:bg-transparent ds:shadow-sm ds:hover:bg-accent ds:aria-pressed:bg-accent",
};

const sizes = {
  sm: "ds:h-8 ds:px-2 ds:text-xs",
  default: "ds:h-9 ds:px-3 ds:text-sm",
  lg: "ds:h-10 ds:px-4",
};

export type ToggleVariant = keyof typeof variants;
export type ToggleSize = keyof typeof sizes;
export const TOGGLE_VARIANTS = Object.keys(variants) as ToggleVariant[];
export const TOGGLE_SIZES = Object.keys(sizes) as ToggleSize[];

/**
 * Botão de dois estados, independente ou filho de `phsa-toggle-group`.
 *
 * @tag phsa-toggle
 * @slot - Conteúdo.
 * @csspart toggle - O botão.
 * @fires phsa-change - Ao mudar quando usado sem grupo. `detail.pressed` e `detail.value`.
 * @fires phsa-toggle-select - Interno: solicita a mudança ao grupo.
 */
export class PhsaToggle extends PhsaElement {
  static styles = unsafeCSS(styles);
  /** @ignore */
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  @property({ type: Boolean, reflect: true }) pressed = false;
  @property({ reflect: true }) value = "";
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property() variant: ToggleVariant = "default";
  @property() size: ToggleSize = "default";

  override focus(options?: FocusOptions) {
    this.renderRoot.querySelector("button")?.focus(options);
  }

  /** @ignore */
  private pick() {
    if (this.disabled) return;
    const grouped = this.closest("phsa-toggle-group");
    if (grouped) {
      if (grouped.hasAttribute("disabled")) return;
      this.dispatchEvent(new CustomEvent("phsa-toggle-select", { bubbles: true, composed: true, detail: { value: this.value } }));
      return;
    }
    this.pressed = !this.pressed;
    this.dispatchEvent(
      new CustomEvent("phsa-change", { bubbles: true, composed: true, detail: { pressed: this.pressed, value: this.value } }),
    );
  }

  render() {
    return html`
      <button
        type="button"
        part="toggle"
        aria-pressed=${this.pressed ? "true" : "false"}
        ?disabled=${this.disabled}
        class="phsa-root ds:inline-flex ds:cursor-pointer ds:items-center ds:justify-center ds:gap-2 ds:rounded-md ds:border-0 ds:bg-transparent ds:font-medium ds:text-foreground ds:transition-colors ds:outline-none ds:focus-visible:ring-2 ds:focus-visible:ring-ring ds:focus-visible:ring-offset-2 ds:disabled:pointer-events-none ds:disabled:opacity-50 ${variants[this.variant] ?? variants.default} ${sizes[this.size] ?? sizes.default} ${this.hostClass}"
        @click=${this.pick}
      ><slot></slot></button>
    `;
  }
}
