import { html, unsafeCSS } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { property } from "lit/decorators.js";
import { PhsaFormControl } from "../../../core/form-control";
import styles from "./slider.css?inline";

/**
 * Controle deslizante de valor único.
 *
 * @tag phsa-slider
 * @csspart slider - O `<input type="range">`.
 * @csspart value - O valor visível.
 */
export class PhsaSlider extends PhsaFormControl {
  static styles = unsafeCSS(styles);

  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) step = 1;
  @property({ type: Boolean, attribute: "show-value" }) showValue = false;

  constructor() {
    super();
    this.value = "0";
  }

  /** @ignore */
  protected get control() {
    return this.renderRoot?.querySelector<HTMLInputElement>("input") ?? null;
  }

  /** @ignore */
  private percent() {
    const span = this.max - this.min;
    if (span <= 0) return 0;
    return Math.min(100, Math.max(0, ((Number(this.value) - this.min) / span) * 100));
  }

  protected renderControl() {
    return html`
      <div class="phsa-root ds:flex ds:w-full ds:items-center ds:gap-3 ${this.hostClass}">
        <input
          part="slider"
          type="range"
          min=${this.min}
          max=${this.max}
          step=${this.step}
          aria-label=${ifDefined(this.fieldLabel || undefined)}
          aria-describedby=${ifDefined(this.describedBy)}
          aria-invalid=${ifDefined(this.showInvalid ? "true" : undefined)}
          ?disabled=${this.isDisabled}
          class="slider ds:w-full ds:min-w-0 ds:cursor-pointer ds:disabled:cursor-not-allowed ds:disabled:opacity-50"
          style="--phsa-slider-progress:${this.percent()}%"
          @input=${this.handleInput}
          @change=${this.handleChange}
          @blur=${this.handleBlur}
        />
        ${this.showValue
          ? html`<output part="value" class="ds:min-w-10 ds:rounded-md ds:bg-muted ds:px-2 ds:py-1 ds:text-center ds:text-sm ds:tabular-nums ds:text-foreground">${this.value}</output>`
          : ""}
      </div>
    `;
  }
}
