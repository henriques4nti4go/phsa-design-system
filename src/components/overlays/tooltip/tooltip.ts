import { html, nothing, unsafeCSS, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { PhsaAnchored, type AnchorSide } from "../../../core/anchored";
import styles from "./tooltip.css?inline";

export { ANCHOR_SIDES } from "../../../core/anchored";
export type { AnchorSide };

/**
 * Dica ao passar o mouse ou focar o slot `trigger`. O texto vai como `aria-description` do gatilho;
 * dá para passar o mouse por cima da dica sem ela sumir.
 *
 * @tag phsa-tooltip
 * @slot trigger - O elemento que mostra a dica.
 * @slot - Conteúdo. Se vazio, usa o atributo `text`.
 * @csspart popup - A dica.
 * @fires phsa-toggle - Quando abre ou fecha. `detail.open` diz o estado.
 */
export class PhsaTooltip extends PhsaAnchored {
  static styles = unsafeCSS(styles);

  @property() text = "";
  @property() override side: AnchorSide = "top";

  /** @ignore */
  @state() private slotted = false;

  /** @ignore */
  private timer = 0;
  /** @ignore */
  private described: HTMLElement | null = null;

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
    const target = this.triggerControl();
    if (this.described && this.described !== target) this.described.removeAttribute("aria-description");
    this.described = target;
    if (!target) return;
    const tip = this.tip();
    if (tip) target.setAttribute("aria-description", tip);
    else target.removeAttribute("aria-description");
  }

  /** A dica nunca move o foco. @ignore */
  protected override focusTrigger() {}

  /** @ignore */
  private readonly onOver = (event: Event) => this.enter(event, 400);

  /** @ignore */
  private readonly onFocus = (event: Event) => this.enter(event, 0);

  /** @ignore */
  private readonly onOut = (event: Event) => this.leave(event, 120);

  /** @ignore */
  private readonly onBlur = (event: Event) => this.leave(event, 0);

  /** @ignore */
  private onSlot(event: Event) {
    const slot = event.target as HTMLSlotElement;
    this.slotted = slot.assignedNodes({ flatten: true }).some((node) => node.nodeType === Node.ELEMENT_NODE || node.textContent?.trim());
    this.requestUpdate();
  }

  /** @ignore */
  private tip() {
    const slot = this.renderRoot?.querySelector<HTMLSlotElement>("slot:not([name])");
    const assigned = slot
      ?.assignedNodes({ flatten: true })
      .map((node) => node.textContent?.trim() ?? "")
      .filter(Boolean)
      .join(" ");
    return assigned || this.text;
  }

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
    // Atraso curto: o mouse atravessa o vão até a dica sem fechá-la (WCAG 1.4.13).
    if (delay) this.timer = window.setTimeout(() => this.hide(), delay);
    else this.hide();
  }

  render() {
    return html`
      <div class="phsa-root ds:inline-block">
        <slot name="trigger" @slotchange=${() => this.requestUpdate()}></slot>
        <div
          part="popup"
          popover="manual"
          role="tooltip"
          class="ds:max-w-xs ds:rounded-md ds:bg-foreground ds:px-3 ds:py-1.5 ds:text-xs ds:text-background ds:shadow-md ${this.hostClass}"
          style="position:fixed;visibility:hidden"
        >
          <slot @slotchange=${this.onSlot}></slot>${this.slotted ? nothing : this.text}
        </div>
      </div>
    `;
  }
}
