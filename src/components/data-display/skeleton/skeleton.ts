import { html, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import styles from "./skeleton.css?inline";

const variants = {
  text: "ds:h-4 ds:w-full ds:rounded-sm",
  circular: "ds:size-10 ds:rounded-full",
  rectangular: "ds:h-24 ds:w-full ds:rounded-md",
};

export type SkeletonVariant = keyof typeof variants;
export const SKELETON_VARIANTS = Object.keys(variants) as SkeletonVariant[];

/**
 * Placeholder visual para conteúdo em carregamento. É decorativo; anuncie o
 * carregamento no contêiner com `aria-busy` quando necessário.
 *
 * @tag phsa-skeleton
 * @csspart skeleton - A forma visível.
 */
export class PhsaSkeleton extends PhsaElement {
  static styles = unsafeCSS(styles);

  @property() variant: SkeletonVariant = "rectangular";
  @property({ type: Boolean }) animated = true;

  render() {
    return html`
      <span
        part="skeleton"
        aria-hidden="true"
        class="phsa-root ds:block ds:bg-muted ${variants[this.variant] ?? variants.rectangular} ${this.animated ? "is-animated" : ""} ${this.hostClass}"
      ></span>
    `;
  }
}
