import { html, unsafeCSS } from "lit";
import { property, state } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import styles from "./card.css?inline";

/**
 * Bloco de conteúdo com título, descrição e ações.
 *
 * @tag phsa-card
 * @slot media - Imagem, rente ao topo. O card corta os cantos.
 * @slot title - Título. Se vazio, usa o atributo `heading`.
 * @slot description - Descrição. Se vazio, usa o atributo `description`.
 * @slot - Corpo.
 * @slot footer - Ações, no rodapé.
 * @csspart card - O container.
 */
export class PhsaCard extends PhsaElement {
  static styles = unsafeCSS(styles);

  /** Título. `title` ficaria preso ao tooltip nativo do `HTMLElement`. */
  @property() heading = "";
  @property() description = "";

  /** @ignore */
  @state() private mediaSlotted = false;
  /** @ignore */
  @state() private titleSlotted = false;
  /** @ignore */
  @state() private descriptionSlotted = false;
  /** @ignore */
  @state() private footerSlotted = false;

  /** @ignore */
  private onSlot(event: Event, key: "mediaSlotted" | "titleSlotted" | "descriptionSlotted" | "footerSlotted") {
    const slot = event.target as HTMLSlotElement;
    const filled = slot.assignedNodes({ flatten: true }).some((node) => node.nodeType === Node.ELEMENT_NODE || node.textContent?.trim());
    if (this[key] !== filled) this[key] = filled;
  }

  render() {
    const titled = this.titleSlotted || Boolean(this.heading);
    const described = this.descriptionSlotted || Boolean(this.description);
    const headed = titled || described;
    return html`
      <section part="card" class="phsa-root ds:block ds:rounded-lg ds:border ds:border-border ds:bg-background ds:text-foreground ds:shadow-sm ${this.hostClass}">
        <div class="media ds:aspect-video ds:overflow-hidden ${this.mediaSlotted ? "" : "ds:hidden"}">
          <slot name="media" @slotchange=${(event: Event) => this.onSlot(event, "mediaSlotted")}></slot>
        </div>
        <div class="ds:flex ds:flex-col ds:gap-1.5 ds:p-6 ${headed ? "" : "ds:hidden"}">
          <h3 class="ds:text-lg ds:leading-none ds:font-semibold ds:tracking-tight ${titled ? "" : "ds:hidden"}">
            <slot name="title" @slotchange=${(event: Event) => this.onSlot(event, "titleSlotted")}>${this.heading}</slot>
          </h3>
          <p class="ds:text-sm ds:text-muted-foreground ${described ? "" : "ds:hidden"}">
            <slot name="description" @slotchange=${(event: Event) => this.onSlot(event, "descriptionSlotted")}>${this.description}</slot>
          </p>
        </div>
        <div class="ds:px-6 ds:pb-6 ${headed ? "ds:pt-0" : "ds:pt-6"}"><slot></slot></div>
        <div class="ds:flex ds:items-center ds:p-6 ds:pt-0 ${this.footerSlotted ? "" : "ds:hidden"}">
          <slot name="footer" @slotchange=${(event: Event) => this.onSlot(event, "footerSlotted")}></slot>
        </div>
      </section>
    `;
  }
}
