import { html, unsafeCSS } from "lit";
import { property, state } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import { Inbox } from "lucide";
import { icon } from "../../../core/icon";
import styles from "./empty-state.css?inline";

const defaultIcon = icon(Inbox, "ds:size-8", { strokeWidth: 1.5 });

/**
 * Estado vazio para listas, buscas e primeiros usos.
 *
 * @tag phsa-empty-state
 * @slot icon - Ilustração ou ícone.
 * @slot title - Título; se vazio, usa `heading`.
 * @slot description - Descrição; se vazia, usa `description`.
 * @slot - Conteúdo complementar.
 * @slot actions - Ações.
 * @csspart container - O contêiner.
 * @csspart icon - O ícone.
 */
export class PhsaEmptyState extends PhsaElement {
  static styles = unsafeCSS(styles);

  @property() heading = "Nada por aqui";
  @property() description = "";
  @state() private actionsSlotted = false;

  /** @ignore */
  private onActions(event: Event) {
    const slot = event.target as HTMLSlotElement;
    this.actionsSlotted = slot.assignedNodes({ flatten: true }).some((node) => node.nodeType === Node.ELEMENT_NODE || node.textContent?.trim());
  }

  render() {
    return html`
      <section
        part="container"
        class="phsa-root ds:flex ds:w-full ds:flex-col ds:items-center ds:justify-center ds:rounded-lg ds:border ds:border-dashed ds:border-border ds:bg-background ds:px-6 ds:py-12 ds:text-center ds:text-foreground ${this.hostClass}"
      >
        <div part="icon" class="ds:mb-4 ds:inline-flex ds:size-12 ds:items-center ds:justify-center ds:rounded-full ds:bg-muted ds:text-muted-foreground">
          <slot name="icon">${defaultIcon}</slot>
        </div>
        <h3 class="ds:m-0 ds:text-lg ds:font-semibold"><slot name="title">${this.heading}</slot></h3>
        <p class="ds:mt-1 ds:mb-0 ds:max-w-md ds:text-sm ds:text-muted-foreground">
          <slot name="description">${this.description}</slot>
        </p>
        <div class="ds:mt-3 ds:max-w-md ds:text-sm"><slot></slot></div>
        <div class=${this.actionsSlotted ? "ds:mt-5 ds:flex ds:flex-wrap ds:justify-center ds:gap-2" : ""}>
          <slot name="actions" @slotchange=${this.onActions}></slot>
        </div>
      </section>
    `;
  }
}
