import { html, unsafeCSS, type PropertyValues } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { property, state } from "lit/decorators.js";
import { PhsaFormControl } from "../../../core/form-control";
import styles from "./rating.css?inline";

/**
 * Avaliação por estrelas.
 *
 * @tag phsa-rating
 * @csspart group - O grupo.
 * @csspart item - Cada estrela.
 */
export class PhsaRating extends PhsaFormControl {
  static styles = unsafeCSS(styles);

  @property({ type: Number }) max = 5;
  @property({ type: Boolean }) clearable = false;
  @property({ type: Boolean, reflect: true }) readOnly = false;
  @state() private preview = 0;

  constructor() {
    super();
    this.value = "0";
  }

  /** @ignore */
  protected get control() {
    return this.renderRoot?.querySelector<HTMLInputElement>("input[data-control]") ?? null;
  }

  /** @ignore */
  protected override validityAnchor() {
    return this.renderRoot?.querySelector<HTMLElement>("[role=radio]") ?? null;
  }

  protected override willUpdate(changed: PropertyValues) {
    super.willUpdate(changed);
    const max = Math.max(1, Math.floor(this.max || 1));
    if (max !== this.max) this.max = max;
    const value = Math.min(max, Math.max(0, Math.round(Number(this.value) || 0)));
    if (String(value) !== this.value) this.value = String(value);
  }

  /** @ignore */
  protected override formValue() {
    return Number(this.value) > 0 ? this.value : null;
  }

  /** @ignore */
  protected override syncControlValue() {
    const input = this.control;
    if (input) input.value = Number(this.value) > 0 ? this.value : "";
  }

  /** @ignore */
  protected override readControlValue() {}

  /** @ignore */
  private choose(value: number) {
    if (this.isDisabled || this.readOnly) return;
    const next = this.clearable && Number(this.value) === value ? 0 : value;
    this.value = String(next);
    this.preview = 0;
    this.syncControlValue();
    this.syncFormState();
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    this.dispatchEvent(new Event("change", { bubbles: true }));
    this.focusItem(next || 1);
  }

  /** @ignore */
  private focusItem(value: number) {
    this.renderRoot.querySelector<HTMLButtonElement>(`button[data-value="${value}"]`)?.focus();
  }

  /** @ignore */
  private onKeydown(event: KeyboardEvent) {
    const current = Number(this.value) || 1;
    let next = current;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") next = Math.min(this.max, current + 1);
    else if (event.key === "ArrowLeft" || event.key === "ArrowDown") next = Math.max(1, current - 1);
    else if (event.key === "Home") next = 1;
    else if (event.key === "End") next = this.max;
    else return;
    event.preventDefault();
    this.choose(next);
  }

  /** @ignore */
  private onFocusOut(event: FocusEvent) {
    const next = event.relatedTarget as Node | null;
    if (next && this.renderRoot.contains(next)) return;
    this.handleBlur();
  }

  protected renderControl() {
    const selected = Number(this.value) || 0;
    const shown = this.preview || selected;
    return html`
      <div
        part="group"
        role="radiogroup"
        aria-label=${ifDefined(this.fieldLabel || "Avaliação")}
        aria-describedby=${ifDefined(this.describedBy)}
        aria-invalid=${ifDefined(this.showInvalid ? "true" : undefined)}
        aria-readonly=${this.readOnly ? "true" : "false"}
        class="phsa-root ds:inline-flex ds:items-center ds:gap-1 ${this.hostClass}"
        @keydown=${this.onKeydown}
        @focusout=${this.onFocusOut}
        @mouseleave=${() => {
          this.preview = 0;
        }}
      >
        ${Array.from({ length: this.max }, (_, index) => {
          const value = index + 1;
          const active = value <= shown;
          const checked = value === selected;
          return html`
            <button
              type="button"
              part="item"
              role="radio"
              data-value=${value}
              aria-label="${value} de ${this.max}"
              aria-checked=${checked ? "true" : "false"}
              tabindex=${checked || (!selected && value === 1) ? 0 : -1}
              ?disabled=${this.isDisabled}
              class="ds:inline-flex ds:size-8 ds:cursor-pointer ds:items-center ds:justify-center ds:rounded-sm ds:border-0 ds:bg-transparent ds:p-1 ds:outline-none ds:focus-visible:ring-2 ds:focus-visible:ring-ring ds:disabled:cursor-not-allowed ds:disabled:opacity-50 ${active ? "ds:text-warning" : "ds:text-muted-foreground"}"
              @mouseenter=${() => {
                if (!this.isDisabled && !this.readOnly) this.preview = value;
              }}
              @click=${() => this.choose(value)}
            >
              <svg class="ds:size-6" viewBox="0 0 24 24" fill=${active ? "currentColor" : "none"} stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="m12 2 3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01z"></path>
              </svg>
            </button>
          `;
        })}
        <input data-control class="ds:sr-only" tabindex="-1" aria-hidden="true" type="number" min="1" max=${this.max} ?required=${this.required} ?disabled=${this.isDisabled} />
      </div>
    `;
  }
}
