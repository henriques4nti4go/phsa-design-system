import { html, unsafeCSS } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { property } from "lit/decorators.js";
import { PhsaFormControl } from "../../../core/form-control";
import styles from "./input.css?inline";

const sizes = {
  default: "ds:h-9 ds:px-3",
  sm: "ds:h-8 ds:px-3 ds:text-xs",
  lg: "ds:h-10 ds:px-4",
};

export type InputSize = keyof typeof sizes;
export const INPUT_SIZES = Object.keys(sizes) as InputSize[];

/**
 * @tag phsa-input
 * @csspart input - O `<input>` nativo interno.
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
  @property({ type: Number }) minLength: number | null = null;
  @property({ type: Number }) maxLength: number | null = null;
  @property({ type: Boolean, reflect: true }) readOnly = false;
  @property({ type: Boolean, reflect: true }) multiple = false;

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
  protected renderControl() {
    return html`
      <input
        part="input"
        class="phsa-root ds:block ds:w-full ds:min-w-0 ds:rounded-md ds:border ds:border-input ds:bg-transparent ds:py-1 ds:shadow-sm ds:transition-colors ds:outline-none ds:placeholder:text-muted-foreground ds:selection:bg-primary ds:selection:text-primary-foreground ds:file:border-0 ds:file:bg-transparent ds:file:text-sm ds:file:font-medium ds:file:text-foreground ds:focus-visible:ring-2 ds:focus-visible:ring-ring ds:focus-visible:ring-offset-2 ds:disabled:cursor-not-allowed ds:disabled:opacity-50 ds:aria-invalid:border-destructive ds:aria-invalid:focus-visible:ring-destructive ${sizes[this.size] ?? sizes.default} ${this.hostClass}"
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
    `;
  }
}
