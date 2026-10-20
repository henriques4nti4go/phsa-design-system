import { html, nothing, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import styles from "./link.css?inline";

const variants = {
  default: "ds:text-primary ds:underline-offset-4 ds:hover:underline",
  muted: "ds:text-muted-foreground ds:underline-offset-4 ds:hover:text-foreground ds:hover:underline",
  inherit: "ds:text-inherit ds:underline ds:underline-offset-4",
};

const sizes = {
  inherit: "ds:text-[length:inherit]",
  sm: "ds:text-xs",
  default: "ds:text-sm",
  lg: "ds:text-base",
};

export type LinkVariant = keyof typeof variants;
export type LinkSize = keyof typeof sizes;
export const LINK_VARIANTS = Object.keys(variants) as LinkVariant[];
export const LINK_SIZES = Object.keys(sizes) as LinkSize[];

/**
 * Link de texto. Com `target="_blank"`, adiciona `rel="noopener noreferrer"`.
 *
 * Para navegação do lado do cliente (Next, React Router), chame `preventDefault()`
 * no `click` e navegue pelo roteador.
 *
 * @tag phsa-link
 * @slot - O texto do link.
 * @csspart link - O `<a>`.
 */
export class PhsaLink extends PhsaElement {
  static styles = unsafeCSS(styles);

  @property() href = "";
  @property() target = "";
  @property() rel = "";
  @property() variant: LinkVariant = "default";
  @property() size: LinkSize = "default";

  render() {
    const rel = this.rel || (this.target === "_blank" ? "noopener noreferrer" : "");
    return html`
      <a
        part="link"
        class="phsa-root ds:inline ds:cursor-pointer ds:rounded-sm ds:font-medium ds:transition-colors ds:focus-visible:outline-none ds:focus-visible:ring-2 ds:focus-visible:ring-ring ds:focus-visible:ring-offset-2 ${variants[this.variant] ?? variants.default} ${sizes[this.size] ?? sizes.default} ${this.hostClass}"
        href=${this.href || nothing}
        target=${this.target || nothing}
        rel=${rel || nothing}
      >
        <slot></slot>
      </a>
    `;
  }
}
