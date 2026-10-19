import { html, nothing, unsafeCSS } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { property, state } from "lit/decorators.js";
import { PhsaFormControl } from "../../../core/form-control";
import styles from "./input.css?inline";

const sizes = {
  default: "ds:h-9 ds:text-sm",
  sm: "ds:h-8 ds:text-xs",
  lg: "ds:h-10",
};

export type InputSize = keyof typeof sizes;
export const INPUT_SIZES = Object.keys(sizes) as InputSize[];

/**
 * @tag phsa-input
 * @slot prefix - Conteúdo antes do campo.
 * @slot suffix - Conteúdo depois do campo.
 * @csspart input - O `<input>` nativo interno.
 * @csspart prefix - O prefixo.
 * @csspart suffix - O sufixo.
 * @csspart clear - O botão de limpar.
 */
export class PhsaInput extends PhsaFormControl {
  static styles = unsafeCSS(styles);

  /** Altura do campo, alinhada ao `<phsa-button>`. */
  @property() size: InputSize = "default";
  /** Igual ao `<input>` nativo. */
  @property() type = "text";
  @property() placeholder = "";
  @property() autocomplete = "";
  @property() inputMode = "";
  @property() pattern = "";
  @property() min = "";
  @property() max = "";
  @property() step = "";
  @property() accept = "";
  @property() prefix = "";
  @property() suffix = "";
  @property({ type: Boolean }) clearable = false;
  @property({ type: Number }) minLength: number | null = null;
  @property({ type: Number }) maxLength: number | null = null;
  @property({ type: Boolean, reflect: true }) readOnly = false;
  @property({ type: Boolean, reflect: true }) multiple = false;
  @state() private prefixSlotted = false;
  @state() private suffixSlotted = false;

  /** @ignore */
  protected get control() {
    return this.renderRoot?.querySelector("input") ?? null;
  }

  /** @ignore */
  private get isFile() {
    return this.type === "file";
  }

  /** @ignore */
  protected override formValue() {
    if (!this.isFile) return super.formValue();
    const files = Array.from(this.control?.files ?? []);
    if (files.length <= 1) return files[0] ?? null;
    const data = new FormData();
    for (const file of files) data.append(this.name || "file", file);
    return data;
  }

  // Não atribuir .value em type="file": o browser rejeita qualquer valor que não seja "".
  /** @ignore */
  protected override syncControlValue() {
    if (!this.isFile) super.syncControlValue();
  }

  /** @ignore */
  protected override readControlValue() {
    if (this.isFile) this.syncFormState();
    else super.readControlValue();
  }

  /** @ignore */
  protected override resetControl(defaultValue: string) {
    super.resetControl(this.isFile ? "" : defaultValue);
  }

  /** @ignore */
  private onSlot(event: Event, key: "prefixSlotted" | "suffixSlotted") {
    const slot = event.target as HTMLSlotElement;
    const filled = slot.assignedNodes({ flatten: true }).some((node) => node.nodeType === Node.ELEMENT_NODE || node.textContent?.trim());
    if (this[key] !== filled) this[key] = filled;
  }

  /** @ignore */
  private clear() {
    if (this.isDisabled || this.readOnly || this.isFile || !this.value) return;
    this.value = "";
    this.syncControlValue();
    this.syncFormState();
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    this.dispatchEvent(new Event("change", { bubbles: true }));
    this.control?.focus();
  }

  /** @ignore */
  protected renderControl() {
    const prefixed = this.prefixSlotted || Boolean(this.prefix);
    const suffixed = this.suffixSlotted || Boolean(this.suffix);
    const canClear = this.clearable && Boolean(this.value) && !this.isFile;
    return html`
      <div
        class="phsa-root ds:flex ds:w-full ds:min-w-0 ds:items-center ds:rounded-md ds:border ds:border-input ds:bg-transparent ds:shadow-sm ds:transition-colors ds:focus-within:ring-2 ds:focus-within:ring-ring ds:focus-within:ring-offset-2 ${this.showInvalid ? "ds:border-destructive ds:focus-within:ring-destructive" : ""} ${this.isDisabled ? "ds:cursor-not-allowed ds:opacity-50" : ""} ${sizes[this.size] ?? sizes.default} ${this.hostClass}"
      >
        <span part="prefix" class="${prefixed ? "ds:inline-flex" : "ds:hidden"} ds:shrink-0 ds:items-center ds:pl-3 ds:text-muted-foreground">
          <slot name="prefix" @slotchange=${(event: Event) => this.onSlot(event, "prefixSlotted")}>${this.prefix}</slot>
        </span>
        <input
          part="input"
          class="ds:h-full ds:w-full ds:min-w-0 ds:flex-1 ds:border-0 ds:bg-transparent ds:py-1 ${prefixed ? "ds:pl-2" : "ds:pl-3"} ${suffixed || canClear ? "ds:pr-2" : "ds:pr-3"} ds:text-inherit ds:text-foreground ds:outline-none ds:placeholder:text-muted-foreground ds:selection:bg-primary ds:selection:text-primary-foreground ds:file:border-0 ds:file:bg-transparent ds:file:text-sm ds:file:font-medium ds:file:text-foreground ds:disabled:cursor-not-allowed"
          type=${this.type}
          placeholder=${ifDefined(this.placeholder || undefined)}
          autocomplete=${ifDefined(this.autocomplete || undefined)}
          inputmode=${ifDefined(this.inputMode || undefined)}
          pattern=${ifDefined(this.pattern || undefined)}
          min=${ifDefined(this.min || undefined)}
          max=${ifDefined(this.max || undefined)}
          step=${ifDefined(this.step || undefined)}
          accept=${ifDefined(this.accept || undefined)}
          minlength=${ifDefined(this.minLength ?? undefined)}
          maxlength=${ifDefined(this.maxLength ?? undefined)}
          aria-label=${ifDefined(this.fieldLabel || undefined)}
          aria-describedby=${ifDefined(this.describedBy)}
          aria-invalid=${ifDefined(this.showInvalid ? "true" : undefined)}
          ?disabled=${this.isDisabled}
          ?required=${this.required}
          ?readonly=${this.readOnly}
          ?multiple=${this.multiple}
          @input=${this.handleInput}
          @change=${this.handleChange}
          @blur=${this.handleBlur}
        />
        <span part="suffix" class="${suffixed ? "ds:inline-flex" : "ds:hidden"} ds:shrink-0 ds:items-center ds:pr-3 ds:text-muted-foreground">
          <slot name="suffix" @slotchange=${(event: Event) => this.onSlot(event, "suffixSlotted")}>${this.suffix}</slot>
        </span>
        ${canClear
          ? html`
              <button
                type="button"
                part="clear"
                class="ds:mr-2 ds:inline-flex ds:size-6 ds:shrink-0 ds:cursor-pointer ds:items-center ds:justify-center ds:rounded-sm ds:border-0 ds:bg-transparent ds:p-0 ds:text-muted-foreground ds:hover:text-foreground ds:focus-visible:outline-none ds:focus-visible:ring-2 ds:focus-visible:ring-ring ds:disabled:pointer-events-none"
                aria-label="Limpar"
                ?disabled=${this.isDisabled || this.readOnly}
                @click=${this.clear}
              >×</button>
            `
          : nothing}
      </div>
    `;
  }
}
