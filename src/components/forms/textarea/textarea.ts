import { html, unsafeCSS } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { property } from "lit/decorators.js";
import { PhsaFormControl } from "../../../core/form-control";
import styles from "./textarea.css?inline";

const sizes = {
  sm: "ds:px-3 ds:py-1 ds:text-xs",
  default: "ds:px-3 ds:py-2",
  lg: "ds:px-4 ds:py-3",
};

export type TextareaSize = keyof typeof sizes;
export const TEXTAREA_SIZES = Object.keys(sizes) as TextareaSize[];

/**
 * Campo de texto de várias linhas.
 *
 * @tag phsa-textarea
 * @csspart textarea - O `<textarea>` nativo interno.
 */
export class PhsaTextarea extends PhsaFormControl {
  static styles = unsafeCSS(styles);

  @property() size: TextareaSize = "default";
  @property() placeholder = "";
  @property({ type: Number }) rows = 3;
  @property({ type: Number }) minLength: number | null = null;
  @property({ type: Number }) maxLength: number | null = null;
  @property({ type: Boolean, reflect: true }) readOnly = false;

  /** @ignore */
  protected get control() {
    return this.renderRoot?.querySelector("textarea") ?? null;
  }

  render() {
    return html`
      <textarea
        part="textarea"
        class="phsa-root ds:block ds:min-h-16 ds:w-full ds:min-w-0 ds:resize-y ds:rounded-md ds:border ds:border-input ds:bg-transparent ds:shadow-sm ds:transition-colors ds:outline-none ds:placeholder:text-muted-foreground ds:focus-visible:ring-2 ds:focus-visible:ring-ring ds:focus-visible:ring-offset-2 ds:ring-offset-background ds:disabled:cursor-not-allowed ds:disabled:opacity-50 ds:aria-invalid:border-destructive ds:aria-invalid:focus-visible:ring-destructive ${sizes[this.size] ?? sizes.default} ${this.hostClass}"
        rows=${this.rows}
        placeholder=${ifDefined(this.placeholder || undefined)}
        minlength=${ifDefined(this.minLength ?? undefined)}
        maxlength=${ifDefined(this.maxLength ?? undefined)}
        aria-label=${ifDefined(this.fieldLabel || undefined)}
        aria-describedby=${ifDefined(this.describedBy)}
        aria-invalid=${ifDefined(this.showInvalid ? "true" : undefined)}
        ?disabled=${this.isDisabled}
        ?required=${this.required}
        ?readonly=${this.readOnly}
        @input=${this.handleInput}
        @change=${this.handleChange}
        @blur=${this.handleBlur}
      ></textarea>
      ${this.renderDescription()}
    `;
  }
}
