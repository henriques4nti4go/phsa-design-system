import { css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { PhsaElement } from "../../../core/phsa-element";
import { iconMarkup, iconSizes, iconTones, type IconNode, type IconSize, type IconTone } from "../../../core/icon";

export { ICON_SIZES, ICON_TONES, type IconNode, type IconSize, type IconTone } from "../../../core/icon";

/**
 * Ícone do Lucide. Cada ícone é importado à parte, então só os usados entram no bundle:
 *
 * ```js
 * import { Mail } from "@phsa.tec/design-system-react/icons/mail";
 * el.icon = Mail;
 * ```
 *
 * Sem `label`, é decorativo (`aria-hidden`). A cor é herdada do texto em volta.
 *
 * @tag phsa-icon
 * @csspart icon - O `<svg>`.
 */
export class PhsaIcon extends PhsaElement {
  // CSS mínimo, sem o tema do Tailwind: uma tela pode ter centenas de ícones.
  static styles = css`
    :host {
      display: inline-flex;
      flex-shrink: 0;
      vertical-align: middle;
      line-height: 0;
    }
    svg {
      display: block;
    }
  `;

  /** O ícone, importado de `@phsa.tec/design-system-react/icons/<nome>`. */
  @property({ attribute: false }) icon?: IconNode;
  @property() size: IconSize = "sm";
  @property() tone: IconTone = "inherit";
  @property({ type: Number, attribute: "stroke-width" }) strokeWidth = 2;
  /** Nome para leitores de tela; sem ele, o ícone é decorativo. */
  @property() label = "";

  render() {
    if (!this.icon) return nothing;
    const size = iconSizes[this.size] ?? iconSizes.sm;
    const color = iconTones[this.tone] ?? "";
    return html`<svg
      part="icon"
      class=${this.hostClass || nothing}
      width=${size}
      height=${size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width=${this.strokeWidth}
      stroke-linecap="round"
      stroke-linejoin="round"
      style=${color ? `color: ${color}` : nothing}
      role=${this.label ? "img" : nothing}
      aria-label=${this.label || nothing}
      aria-hidden=${this.label ? nothing : "true"}
    >${unsafeSVG(iconMarkup(this.icon))}</svg>`;
  }
}
