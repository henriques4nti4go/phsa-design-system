import { html, unsafeCSS, type PropertyValues } from "lit";
import { PhsaAnchored, ANCHOR_ALIGNS, ANCHOR_SIDES, type AnchorAlign, type AnchorSide } from "../../../core/anchored";
import styles from "./popover.css?inline";

export { ANCHOR_ALIGNS, ANCHOR_SIDES };
export type { AnchorAlign, AnchorSide };

/**
 * Painel flutuante ancorado no slot `trigger`. Fecha no clique fora e no Escape.
 *
 * @tag phsa-popover
 * @slot trigger - O botão que abre.
 * @slot - Conteúdo do painel.
 * @csspart popup - O painel.
 * @fires phsa-toggle - Quando abre ou fecha. `detail.open` diz o estado.
 */
export class PhsaPopover extends PhsaAnchored {
  static styles = unsafeCSS(styles);

  protected override updated(changed: PropertyValues) {
    super.updated(changed);
    this.syncTrigger();
  }

  /** @ignore */
  private syncTrigger() {
    const control = this.triggerControl();
    if (!control) return;
    control.setAttribute("aria-haspopup", "dialog");
    control.setAttribute("aria-expanded", String(this.open));
  }

  render() {
    return html`
      <div class="phsa-root ds:inline-block">
        <slot name="trigger" @click=${this.onTriggerClick} @slotchange=${this.syncTrigger}></slot>
        <div
          part="popup"
          popover="manual"
          role="dialog"
          class="ds:w-72 ds:rounded-md ds:border ds:border-border ds:bg-background ds:p-4 ds:text-sm ds:text-foreground ds:shadow-md ${this.hostClass}"
          style="position:fixed;visibility:hidden"
        >
          <slot></slot>
        </div>
      </div>
    `;
  }
}
