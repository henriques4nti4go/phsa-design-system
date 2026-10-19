import { html, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import styles from "./aspect-ratio.css?inline";

const RATIO = /^(\d+(?:\.\d+)?)(?:\s*\/\s*(\d+(?:\.\d+)?))?$/;

/**
 * Mantém a proporção do conteúdo. `ratio` aceita `16/9` ou um número (`1.777`).
 *
 * @tag phsa-aspect-ratio
 * @slot - Mídia ou conteúdo que preenche a caixa.
 * @csspart frame - A caixa com a proporção.
 */
export class PhsaAspectRatio extends PhsaElement {
  static styles = unsafeCSS(styles);

  @property() ratio = "16/9";

  /** @ignore */
  private parsed() {
    const match = this.ratio.trim().match(RATIO);
    if (!match) return "16 / 9";
    return match[2] ? `${match[1]} / ${match[2]}` : match[1];
  }

  render() {
    return html`
      <div
        part="frame"
        class="phsa-root ds:relative ds:block ds:w-full ds:overflow-hidden ds:rounded-md ${this.hostClass}"
        style="aspect-ratio:${this.parsed()}"
      >
        <div class="ds:absolute ds:inset-0">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
