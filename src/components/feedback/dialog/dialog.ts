import { html, nothing, unsafeCSS, type PropertyValues, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import styles from "./dialog.css?inline";

// Trava de rolagem da página, contada por modal aberto.
let scrollLocks = 0;
let savedOverflow = "";

function lockScroll() {
  if (scrollLocks++ === 0) {
    savedOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
}

function unlockScroll() {
  if (scrollLocks === 0) return;
  if (--scrollLocks === 0) document.body.style.overflow = savedOverflow;
}

const closeIcon = html`<svg class="ds:size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>`;

/**
 * Janela modal. `show()` abre na camada de cima; fecha no overlay, no Escape e no botão.
 * `close` sai com `detail.reason` (`""` no overlay, `"cancel"` no Escape).
 *
 * @tag phsa-dialog
 * @slot title - Título. Se vazio, usa o atributo `heading`.
 * @slot description - Descrição. Se vazio, usa o atributo `description`.
 * @slot - Corpo.
 * @slot footer - Ações. Botões aqui ficam no rodapé.
 * @csspart panel - A caixa visível.
 * @fires close - Quando a janela fecha. `detail.reason` explica o motivo. Não borbulha, como o do `<dialog>`.
 */
export class PhsaDialog extends PhsaElement {
  static styles = unsafeCSS(styles);

  @property({ type: Boolean, reflect: true }) open = false;
  /** Título. Não é `title` para não virar tooltip nativo no host. */
  @property() heading = "";
  @property() description = "";

  /** @ignore */
  @state() private titleSlotted = false;
  /** @ignore */
  @state() private descriptionSlotted = false;
  /** @ignore */
  @state() private footerSlotted = false;

  /** @ignore */
  private closeTimer = 0;
  /** @ignore */
  private scrollLocked = false;
  /** @ignore */
  private pressedInside = false;

  /** `any` fecha no overlay e no Escape. `closerequest` só no Escape. `none` só por `close()`. */
  protected get closedBy(): "any" | "closerequest" | "none" {
    return "any";
  }

  /** `role` do `<dialog>`. O `phsa-alert-dialog` usa `alertdialog`. */
  protected get dialogRole(): string | null {
    return null;
  }

  /** @ignore */
  protected get showClose() {
    return true;
  }

  /** @ignore */
  protected renderFooter(): TemplateResult | typeof nothing {
    return nothing;
  }

  /** Abre a janela. */
  show() {
    window.clearTimeout(this.closeTimer);
    this.closeTimer = 0;
    const dialog = this.dialogEl();
    // Reaberto no meio da animação de saída: desfaz o fechamento.
    if (dialog?.open && dialog.hasAttribute("data-closing")) {
      dialog.removeAttribute("data-closing");
      dialog.returnValue = "";
      dialog.setAttribute("data-shown", "");
    }
    this.open = true;
  }

  /** Fecha a janela. `reason` volta em `detail.reason` do evento `close`. */
  close(reason = "") {
    const dialog = this.dialogEl();
    if (dialog) dialog.returnValue = reason;
    if (!dialog?.open || dialog.hasAttribute("data-closing")) {
      this.open = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this.open = false;
      return;
    }
    dialog.setAttribute("data-closing", "");
    window.clearTimeout(this.closeTimer);
    this.closeTimer = window.setTimeout(() => {
      this.closeTimer = 0;
      this.open = false;
    }, 200);
  }

  protected override update(changed: PropertyValues) {
    // Fecha o <dialog> aberto antes do render, para o evento `close` disparar nele.
    if (changed.has("open") && !this.open) {
      const dialog = this.dialogEl();
      if (dialog?.open) dialog.close();
    }
    super.update(changed);
  }

  protected override updated(changed: PropertyValues) {
    super.updated(changed);
    const dialog = this.dialogEl();
    if (!dialog || !this.open || dialog.open) return;
    dialog.removeAttribute("data-closing");
    dialog.removeAttribute("data-shown");
    dialog.returnValue = "";
    dialog.showModal();
    if (!this.scrollLocked) {
      this.scrollLocked = true;
      lockScroll();
    }
    this.renderRoot.querySelector<HTMLElement>("[data-initial-focus]")?.focus();
    const reveal = () => {
      if (this.open && dialog.isConnected && !dialog.hasAttribute("data-closing")) dialog.setAttribute("data-shown", "");
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) reveal();
    else {
      requestAnimationFrame(() => requestAnimationFrame(reveal));
      window.setTimeout(reveal, 40);
    }
  }

  /** @ignore */
  private dialogEl() {
    return this.renderRoot?.querySelector("dialog") ?? null;
  }

  /** @ignore */
  private onDialogClose() {
    const dialog = this.dialogEl();
    dialog?.removeAttribute("data-closing");
    this.releaseScroll();
    const reason = dialog?.returnValue ?? "";
    if (this.open) this.open = false;
    this.onDismissed(reason);
  }

  /** @ignore */
  private releaseScroll() {
    if (!this.scrollLocked) return;
    this.scrollLocked = false;
    unlockScroll();
  }

  override disconnectedCallback() {
    const closing = this.closeTimer !== 0;
    window.clearTimeout(this.closeTimer);
    this.closeTimer = 0;
    this.releaseScroll();
    // Removido no meio da animação de saída: conclui o fechamento (o `close` sai do <dialog>).
    if (closing) {
      const dialog = this.dialogEl();
      if (dialog?.open) dialog.close();
      this.open = false;
    }
    super.disconnectedCallback();
  }

  /** @ignore */
  private onCancel(event: Event) {
    event.preventDefault();
    const dialog = this.dialogEl();
    // Se o navegador não deixar cancelar, o <dialog> fecha direto e o motivo já fica certo.
    if (dialog && this.closedBy !== "none") dialog.returnValue = "cancel";
    if (this.closedBy === "none") return;
    this.close("cancel");
  }

  /** @ignore */
  private onPointerDown(event: Event) {
    const panel = this.renderRoot.querySelector("[part=panel]");
    this.pressedInside = Boolean(panel && event.composedPath().includes(panel));
  }

  // Só fecha se o clique começou e terminou fora do painel (arrastar uma seleção para fora não fecha).
  /** @ignore */
  private onBackdrop(event: Event) {
    const pressedInside = this.pressedInside;
    this.pressedInside = false;
    if (this.closedBy !== "any" || pressedInside) return;
    const panel = this.renderRoot.querySelector("[part=panel]");
    if (panel && event.composedPath().includes(panel)) return;
    this.close();
  }

  /** @ignore */
  protected onDismissed(reason: string) {
    // Sem bubbles: o `close` de um dialog aninhado não chega no de fora.
    this.dispatchEvent(new CustomEvent("close", { detail: { reason } }));
  }

  /** @ignore */
  private onSlot(event: Event, key: "titleSlotted" | "descriptionSlotted" | "footerSlotted") {
    const slot = event.target as HTMLSlotElement;
    const filled = slot.assignedNodes({ flatten: true }).some((node) => node.nodeType === Node.ELEMENT_NODE || node.textContent?.trim());
    if (this[key] !== filled) this[key] = filled;
  }

  render() {
    const titled = this.titleSlotted || Boolean(this.heading);
    const described = this.descriptionSlotted || Boolean(this.description);
    const footed = this.footerSlotted || this.renderFooter() !== nothing;
    return html`
      <div class="phsa-root ds:contents">
        <!-- O overlay é tratado no clique (com animação); o light dismiss nativo fecharia sem ela. -->
        <dialog
          role=${this.dialogRole ?? nothing}
          closedby=${this.closedBy === "any" ? "closerequest" : this.closedBy}
          aria-labelledby=${titled ? "phsa-title" : nothing}
          aria-describedby=${described ? "phsa-desc" : nothing}
          @close=${this.onDialogClose}
          @cancel=${this.onCancel}
          @pointerdown=${this.onPointerDown}
          @click=${this.onBackdrop}
        >
          <div part="panel" class="ds:relative ds:grid ds:gap-4 ds:rounded-lg ds:border ds:border-border ds:bg-background ds:p-6 ds:text-foreground ds:shadow-lg ${this.hostClass}">
          <div class="ds:flex ds:flex-col ds:gap-1.5 ${titled || described ? "" : "ds:hidden"}">
            <h2 id="phsa-title" class="ds:text-lg ds:leading-none ds:font-semibold ds:tracking-tight ${titled ? "" : "ds:hidden"}">
              <slot name="title" @slotchange=${(event: Event) => this.onSlot(event, "titleSlotted")}>${this.heading}</slot>
            </h2>
            <p id="phsa-desc" class="ds:text-sm ds:text-muted-foreground ${described ? "" : "ds:hidden"}">
              <slot name="description" @slotchange=${(event: Event) => this.onSlot(event, "descriptionSlotted")}>${this.description}</slot>
            </p>
          </div>
          <div class="ds:text-sm"><slot></slot></div>
          <div class="ds:flex ds:flex-col-reverse ds:gap-2 ds:sm:flex-row ds:sm:justify-end ${footed ? "" : "ds:hidden"}">
            <slot name="footer" class="ds:contents" @slotchange=${(event: Event) => this.onSlot(event, "footerSlotted")}>${this.renderFooter()}</slot>
          </div>
          ${this.showClose
            ? html`
                <button
                  type="button"
                  class="ds:absolute ds:top-4 ds:right-4 ds:inline-flex ds:rounded-sm ds:border-0 ds:bg-transparent ds:p-0 ds:text-foreground ds:opacity-70 ds:hover:opacity-100 ds:focus-visible:ring-2 ds:focus-visible:ring-ring ds:focus-visible:outline-none"
                  aria-label="Fechar"
                  @click=${() => this.close()}
                >
                  ${closeIcon}
                </button>
              `
            : nothing}
          </div>
        </dialog>
      </div>
    `;
  }
}
