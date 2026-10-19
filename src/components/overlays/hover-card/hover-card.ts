import { html, unsafeCSS, type PropertyValues } from "lit";
import { PhsaAnchored } from "../../../core/anchored";
import styles from "./hover-card.css?inline";

export { ANCHOR_ALIGNS, ANCHOR_SIDES } from "../../../core/anchored";
export type { AnchorAlign, AnchorSide } from "../../../core/anchored";

/**
 * Cartão rico ao passar o mouse ou focar o slot `trigger`. Dá para passar o mouse
 * por cima do painel sem ele sumir.
 *
 * @tag phsa-hover-card
 * @slot trigger - O elemento que mostra o cartão.
 * @slot - Conteúdo do cartão.
 * @csspart popup - O cartão.
 * @fires phsa-toggle - Quando abre ou fecha. `detail.open` diz o estado.
 */
export class PhsaHoverCard extends PhsaAnchored {
  static styles = unsafeCSS(styles);

  /** @ignore */
  private timer = 0;

  constructor() {
    super();
    this.side = "bottom";
    this.align = "start";
  }

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener("pointerover", this.onOver);
    this.addEventListener("pointerout", this.onOut);
    this.addEventListener("focusin", this.onFocus);
    this.addEventListener("focusout", this.onBlur);
  }

  override disconnectedCallback() {
    window.clearTimeout(this.timer);
    this.removeEventListener("pointerover", this.onOver);
    this.removeEventListener("pointerout", this.onOut);
    this.removeEventListener("focusin", this.onFocus);
    this.removeEventListener("focusout", this.onBlur);
    super.disconnectedCallback();
  }

  protected override updated(changed: PropertyValues) {
    super.updated(changed);
    this.syncTrigger();
  }

  /** O cartão nunca move o foco. @ignore */
  protected override focusTrigger() {}

  /** Abre só no hover/foco, não no clique. @ignore */
  protected override onTriggerClick() {}

  /** @ignore */
  private syncTrigger() {
    const control = this.triggerControl();
    if (!control) return;
    control.setAttribute("aria-expanded", String(this.open));
  }

  /** @ignore */
  private readonly onOver = (event: Event) => this.enter(event, 300);

  /** @ignore */
  private readonly onFocus = (event: Event) => this.enter(event, 0);

  /** @ignore */
  private readonly onOut = (event: Event) => this.leave(event, 160);

  /** @ignore */
  private readonly onBlur = (event: Event) => this.leave(event, 0);

  /** @ignore */
  private enter(event: Event, delay: number) {
    const previous = (event as FocusEvent).relatedTarget as Node | null;
    if (previous && this.contains(previous)) return;
    window.clearTimeout(this.timer);
    if (this.open) return;
    this.timer = window.setTimeout(() => this.show(), delay);
  }

  /** @ignore */
  private leave(event: Event, delay: number) {
    const next = (event as FocusEvent).relatedTarget as Node | null;
    if (next && this.contains(next)) return;
    window.clearTimeout(this.timer);
    if (delay) this.timer = window.setTimeout(() => this.hide(), delay);
    else this.hide();
  }

  render() {
    return html`
      <div class="phsa-root ds:inline-block">
        <slot name="trigger" @slotchange=${this.syncTrigger}></slot>
        <div
          part="popup"
          popover="manual"
          class="ds:w-72 ds:rounded-md ds:border ds:border-border ds:bg-background ds:p-4 ds:text-sm ds:text-foreground ds:shadow-md ${this.hostClass}"
          style="position:fixed;visibility:hidden"
        >
          <slot></slot>
        </div>
      </div>
    `;
  }
}
