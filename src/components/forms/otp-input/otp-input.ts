import { html, unsafeCSS, type PropertyValues } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { property } from "lit/decorators.js";
import { PhsaFormControl } from "../../../core/form-control";
import styles from "./otp-input.css?inline";

export type OtpInputType = "numeric" | "alphanumeric";
export const OTP_INPUT_TYPES: OtpInputType[] = ["numeric", "alphanumeric"];

/**
 * Código de uso único dividido em células. Aceita digitação, colagem e preenchimento automático.
 *
 * @tag phsa-otp-input
 * @csspart group - O grupo de células.
 * @csspart input - Cada célula.
 */
export class PhsaOtpInput extends PhsaFormControl {
  static styles = unsafeCSS(styles);

  @property({ type: Number }) length = 6;
  @property() type: OtpInputType = "numeric";
  @property({ type: Boolean }) mask = false;
  @property() autocomplete = "one-time-code";

  /** @ignore */
  protected get control() {
    return this.renderRoot?.querySelector<HTMLInputElement>("input[data-control]") ?? null;
  }

  /** @ignore */
  protected override validityAnchor() {
    return this.cells()[0] ?? null;
  }

  protected override willUpdate(changed: PropertyValues) {
    super.willUpdate(changed);
    const length = Math.max(1, Math.floor(this.length || 1));
    if (length !== this.length) this.length = length;
    const value = this.sanitize(this.value).slice(0, length);
    if (value !== this.value) this.value = value;
  }

  /** @ignore */
  protected override syncControlValue() {
    const hidden = this.control;
    if (hidden && hidden.value !== this.value) hidden.value = this.value;
    this.cells().forEach((cell, index) => {
      const char = this.value[index] ?? "";
      if (cell.value !== char) cell.value = char;
    });
  }

  /** @ignore */
  protected override readControlValue() {}

  /** @ignore */
  private cells() {
    return [...(this.renderRoot?.querySelectorAll<HTMLInputElement>("input[data-cell]") ?? [])];
  }

  /** @ignore */
  private sanitize(value: string) {
    const pattern = this.type === "numeric" ? /[^0-9]/g : /[^a-z0-9]/gi;
    const clean = String(value ?? "").replace(pattern, "");
    return this.type === "alphanumeric" ? clean.toLocaleUpperCase() : clean;
  }

  /** @ignore */
  private focusCell(index: number) {
    const cell = this.cells()[Math.min(Math.max(index, 0), this.length - 1)];
    cell?.focus();
    cell?.select();
  }

  /** @ignore */
  private commit(next: string, focus: number) {
    this.value = this.sanitize(next).slice(0, this.length);
    this.syncControlValue();
    this.syncFormState();
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    if (this.value.length === this.length) this.dispatchEvent(new Event("change", { bubbles: true }));
    this.focusCell(focus);
  }

  /** @ignore */
  private write(index: number, text: string) {
    const chars = this.sanitize(text);
    if (!chars) {
      this.syncControlValue();
      return;
    }
    const at = Math.min(index, this.value.length);
    const next = `${this.value.slice(0, at)}${chars}${this.value.slice(at + chars.length)}`;
    this.commit(next, Math.min(at + chars.length, this.length - 1));
  }

  /** @ignore */
  private onKeydown(event: KeyboardEvent, index: number) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const next = event.key === "Home" ? 0 : event.key === "End" ? this.length - 1 : index + (event.key === "ArrowLeft" ? -1 : 1);
      this.focusCell(next);
      return;
    }
    if (event.key !== "Backspace") return;
    event.preventDefault();
    const at = this.value[index] ? index : Math.max(0, index - 1);
    this.commit(this.value.slice(0, at) + this.value.slice(at + 1), at);
  }

  /** @ignore */
  private onFocusOut(event: FocusEvent) {
    const next = event.relatedTarget as Node | null;
    if (next && this.renderRoot.contains(next)) return;
    this.handleBlur();
  }

  protected renderControl() {
    const pattern = this.type === "numeric" ? `[0-9]{${this.length}}` : `[A-Za-z0-9]{${this.length}}`;
    return html`
      <div
        part="group"
        class="phsa-root ds:flex ds:flex-wrap ds:gap-2 ${this.hostClass}"
        @focusout=${this.onFocusOut}
      >
        ${Array.from({ length: this.length }, (_, index) => html`
          <input
            data-cell
            part="input"
            type=${this.mask ? "password" : "text"}
            inputmode=${this.type === "numeric" ? "numeric" : "text"}
            autocomplete=${index === 0 ? this.autocomplete : "off"}
            maxlength="1"
            aria-label="${this.fieldLabel || "Código"}, dígito ${index + 1} de ${this.length}"
            aria-describedby=${ifDefined(this.describedBy)}
            aria-invalid=${ifDefined(this.showInvalid ? "true" : undefined)}
            ?disabled=${this.isDisabled}
            class="ds:size-10 ds:rounded-md ds:border ds:border-input ds:bg-transparent ds:text-center ds:text-lg ds:font-medium ds:text-foreground ds:outline-none ds:focus-visible:ring-2 ds:focus-visible:ring-ring ds:focus-visible:ring-offset-2 ds:disabled:cursor-not-allowed ds:disabled:opacity-50 ds:aria-invalid:border-destructive"
            .value=${this.value[index] ?? ""}
            @input=${(event: Event) => this.write(index, (event.target as HTMLInputElement).value)}
            @keydown=${(event: KeyboardEvent) => this.onKeydown(event, index)}
            @paste=${(event: ClipboardEvent) => {
              event.preventDefault();
              this.write(index, event.clipboardData?.getData("text") ?? "");
            }}
            @focus=${(event: FocusEvent) => (event.currentTarget as HTMLInputElement).select()}
          />
        `)}
        <input
          data-control
          class="ds:sr-only"
          tabindex="-1"
          aria-hidden="true"
          pattern=${pattern}
          minlength=${this.length}
          maxlength=${this.length}
          ?required=${this.required}
          ?disabled=${this.isDisabled}
        />
      </div>
    `;
  }
}
