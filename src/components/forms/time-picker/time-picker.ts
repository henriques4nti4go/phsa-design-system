import { html, unsafeCSS } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { property } from "lit/decorators.js";
import { PhsaFormControl } from "../../../core/form-control";
import styles from "./time-picker.css?inline";

const sizes = {
  sm: "ds:h-8 ds:px-3 ds:text-xs",
  default: "ds:h-9 ds:px-3",
  lg: "ds:h-10 ds:px-4",
};

export type TimePickerSize = keyof typeof sizes;
export const TIME_PICKER_SIZES = Object.keys(sizes) as TimePickerSize[];

/**
 * Campo nativo de horário. O valor usa `HH:mm` ou `HH:mm:ss`, conforme `step`.
 *
 * @tag phsa-time-picker
 * @csspart input - O `<input type="time">`.
 */
export class PhsaTimePicker extends PhsaFormControl {
  static styles = unsafeCSS(styles);

  @property() size: TimePickerSize = "default";
  @property() min = "";
  @property() max = "";
  @property({ type: Number }) step = 60;
  @property({ type: Boolean, reflect: true }) readOnly = false;

  /** @ignore */
  protected get control() {
    return this.renderRoot?.querySelector<HTMLInputElement>("input") ?? null;
  }

  protected renderControl() {
    return html`
      <input
        part="input"
        type="time"
        min=${ifDefined(this.min || undefined)}
        max=${ifDefined(this.max || undefined)}
        step=${this.step}
        aria-label=${ifDefined(this.fieldLabel || undefined)}
        aria-describedby=${ifDefined(this.describedBy)}
        aria-invalid=${ifDefined(this.showInvalid ? "true" : undefined)}
        ?disabled=${this.isDisabled}
        ?required=${this.required}
        ?readonly=${this.readOnly}
        class="phsa-root ds:block ds:w-full ds:min-w-0 ds:rounded-md ds:border ds:border-input ds:bg-transparent ds:py-1 ds:text-foreground ds:shadow-sm ds:outline-none ds:focus-visible:ring-2 ds:focus-visible:ring-ring ds:focus-visible:ring-offset-2 ds:disabled:cursor-not-allowed ds:disabled:opacity-50 ds:aria-invalid:border-destructive ds:aria-invalid:focus-visible:ring-destructive ${sizes[this.size] ?? sizes.default} ${this.hostClass}"
        @input=${this.handleInput}
        @change=${this.handleChange}
        @blur=${this.handleBlur}
      />
    `;
  }
}
