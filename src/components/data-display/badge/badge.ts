import { html, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import styles from "./badge.css?inline";

const variants = {
  default: "ds:border-transparent ds:bg-primary ds:text-primary-foreground",
  secondary: "ds:border-transparent ds:bg-secondary ds:text-secondary-foreground",
  destructive: "ds:border-transparent ds:bg-destructive ds:text-destructive-foreground",
  outline: "ds:text-foreground",
  success: "ds:border-transparent ds:bg-success ds:text-success-foreground",
  warning: "ds:border-transparent ds:bg-warning ds:text-warning-foreground",
  info: "ds:border-transparent ds:bg-info ds:text-info-foreground",
};

export type BadgeVariant = keyof typeof variants;
export const BADGE_VARIANTS = Object.keys(variants) as BadgeVariant[];

/**
 * Rótulo curto: status, contagem ou categoria.
 *
 * @tag phsa-badge
 * @slot - Texto do rótulo.
 */
export class PhsaBadge extends PhsaElement {
  static styles = unsafeCSS(styles);

  @property({ reflect: true }) variant: BadgeVariant = "default";

  render() {
    return html`
      <span
        part="badge"
        class="phsa-root ds:inline-flex ds:items-center ds:rounded-md ds:border ds:px-2.5 ds:py-0.5 ds:text-xs ds:font-semibold ds:whitespace-nowrap ${variants[this.variant] ?? variants.default} ${this.hostClass}"
      >
        <slot></slot>
      </span>
    `;
  }
}
