import { LitElement, html, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import styles from "./button.css?inline";

const variants = {
  default: "ds:bg-primary ds:text-primary-foreground ds:shadow-sm ds:hover:bg-primary/90",
  destructive: "ds:bg-destructive ds:text-destructive-foreground ds:shadow-sm ds:hover:bg-destructive/90",
  outline: "ds:border ds:border-input ds:bg-background ds:shadow-sm ds:hover:bg-accent ds:hover:text-accent-foreground",
  secondary: "ds:bg-secondary ds:text-secondary-foreground ds:shadow-sm ds:hover:bg-secondary/80",
  ghost: "ds:hover:bg-accent ds:hover:text-accent-foreground",
  link: "ds:text-primary ds:underline-offset-4 ds:hover:underline",
};

const sizes = {
  default: "ds:h-9 ds:px-4 ds:py-2",
  sm: "ds:h-8 ds:px-3 ds:text-xs",
  lg: "ds:h-10 ds:px-8",
  icon: "ds:size-9",
};

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export const BUTTON_VARIANTS = Object.keys(variants) as ButtonVariant[];
export const BUTTON_SIZES = Object.keys(sizes) as ButtonSize[];

/**
 * @tag phsa-button
 * @slot - Conteúdo do botão (texto e/ou ícone).
 * @csspart button - O `<button>` nativo interno.
 */
export class PhsaButton extends PhsaElement {
  static styles = unsafeCSS(styles);
  /** @ignore */
  static formAssociated = true;
  /** @ignore */
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  @property({ reflect: true }) variant: ButtonVariant = "default";
  @property({ reflect: true }) size: ButtonSize = "default";
  @property({ type: Boolean, reflect: true }) disabled = false;
  /** Igual ao `<button>` nativo: dentro de um `<form>`, o padrão é `submit`. */
  @property() type: "button" | "submit" | "reset" = "submit";

  /** @ignore */
  private internals = this.attachInternals();

  // O <button> interno está no shadow e não enxerga o <form> da página.
  private handleClick() {
    const form = this.internals.form;
    if (this.disabled || !form) return;
    if (this.type === "submit") form.requestSubmit();
    if (this.type === "reset") form.reset();
  }

  render() {
    return html`
      <button
        part="button"
        class="phsa-root ds:inline-flex ds:cursor-pointer ds:items-center ds:justify-center ds:gap-2 ds:whitespace-nowrap ds:rounded-md ds:font-medium ds:transition-colors ds:focus-visible:outline-none ds:focus-visible:ring-2 ds:focus-visible:ring-ring ds:focus-visible:ring-offset-2 ds:disabled:pointer-events-none ds:disabled:opacity-50 ${variants[this.variant] ?? variants.default} ${sizes[this.size] ?? sizes.default} ${this.hostClass}"
        ?disabled=${this.disabled}
        @click=${this.handleClick}
      >
        <slot></slot>
      </button>
    `;
  }
}
