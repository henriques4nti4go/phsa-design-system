import { html, nothing, unsafeCSS } from "lit";
import { property, state } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import styles from "./alert.css?inline";

const variants = {
  default: "ds:border-border ds:bg-background ds:text-foreground",
  destructive: "ds:border-destructive/50 ds:bg-background ds:text-destructive",
  success: "ds:border-success/50 ds:bg-background ds:text-success",
  warning: "ds:border-warning/50 ds:bg-background ds:text-warning",
  info: "ds:border-info/50 ds:bg-background ds:text-info",
};

export type AlertVariant = keyof typeof variants;
export const ALERT_VARIANTS = Object.keys(variants) as AlertVariant[];

const icon = (path: string) => html`
  <svg class="ds:size-4 ds:shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d=${path} />
  </svg>
`;

const icons: Record<AlertVariant, ReturnType<typeof icon>> = {
  default: icon("M12 16v-4M12 8h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0"),
  info: icon("M12 16v-4M12 8h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0"),
  success: icon("M20 6 9 17l-5-5"),
  warning: icon("m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3M12 9v4M12 17h.01"),
  destructive: icon("M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0"),
};

/**
 * Faixa de aviso na página. `dismissible` esconde e dispara `dismiss`.
 *
 * @tag phsa-alert
 * @slot title - Título. Se vazio, usa o atributo `heading`.
 * @slot description - Descrição. Se vazio, usa o atributo `description`.
 * @slot - Conteúdo extra, abaixo da descrição.
 * @csspart alert - O container.
 * @csspart title - O título.
 * @csspart description - A descrição.
 * @fires dismiss - Ao fechar, quando `dismissible`.
 */
export class PhsaAlert extends PhsaElement {
  static styles = unsafeCSS(styles);

  @property({ reflect: true }) variant: AlertVariant = "default";
  /** Título. Não é `title` para não virar tooltip nativo no host. */
  @property() heading = "";
  @property() description = "";
  @property({ type: Boolean, reflect: true }) dismissible = false;

  /** @ignore */
  @state() private titleSlotted = false;

  /** @ignore */
  private onTitleSlot(event: Event) {
    const slot = event.target as HTMLSlotElement;
    const filled = slot.assignedNodes({ flatten: true }).some((node) => node.nodeType === Node.ELEMENT_NODE || node.textContent?.trim());
    if (this.titleSlotted !== filled) this.titleSlotted = filled;
  }

  /** @ignore */
  private dismiss() {
    this.hidden = true;
    this.dispatchEvent(new Event("dismiss", { bubbles: true, composed: true }));
  }

  render() {
    const variant = variants[this.variant] ? this.variant : "default";
    const assertive = variant === "destructive" || variant === "warning";
    return html`
      <div
        part="alert"
        role=${assertive ? "alert" : "status"}
        class="phsa-root ds:relative ds:flex ds:w-full ds:gap-3 ds:rounded-lg ds:border ds:px-4 ds:py-3 ds:text-sm ${variants[variant]} ${this.dismissible ? "ds:pr-10" : ""} ${this.hostClass}"
      >
        ${icons[variant]}
        <div class="ds:min-w-0 ds:flex-1">
          <h5 part="title" class="ds:mb-1 ds:leading-none ds:font-medium ds:tracking-tight ${this.titleSlotted || this.heading ? "" : "ds:hidden"}">
            <slot name="title" @slotchange=${this.onTitleSlot}>${this.heading}</slot>
          </h5>
          <div part="description" class="ds:text-sm ds:leading-relaxed">
            <slot name="description">${this.description}</slot>
          </div>
          <slot></slot>
        </div>
        ${this.dismissible
          ? html`
              <button
                type="button"
                class="ds:absolute ds:top-3 ds:right-3 ds:inline-flex ds:rounded-sm ds:border-0 ds:bg-transparent ds:p-0 ds:text-inherit ds:opacity-70 ds:hover:opacity-100 ds:focus-visible:ring-2 ds:focus-visible:ring-ring ds:focus-visible:outline-none"
                aria-label="Fechar alerta"
                @click=${this.dismiss}
              >
                ${icon("M18 6 6 18M6 6l12 12")}
              </button>
            `
          : nothing}
      </div>
    `;
  }
}
