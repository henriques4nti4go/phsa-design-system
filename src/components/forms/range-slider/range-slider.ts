import { html, unsafeCSS, type PropertyValues } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { property } from "lit/decorators.js";
import { PhsaFormControl } from "../../../core/form-control";
import styles from "./range-slider.css?inline";

/**
 * Intervalo com duas extremidades. `value` usa o formato `mínimo/máximo`.
 *
 * @tag phsa-range-slider
 * @csspart track - O trilho.
 * @csspart range - O trecho selecionado.
 * @csspart lower - O controle inferior.
 * @csspart upper - O controle superior.
 * @csspart values - Os valores visíveis.
 */
export class PhsaRangeSlider extends PhsaFormControl {
  static styles = unsafeCSS(styles);

  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) step = 1;
  @property({ type: Boolean, attribute: "show-values" }) showValues = false;
  @property({ attribute: "lower-label" }) lowerLabel = "Valor mínimo";
  @property({ attribute: "upper-label" }) upperLabel = "Valor máximo";

  constructor() {
    super();
    this.value = "25/75";
  }

  /** @ignore */
  protected get control() {
    return this.renderRoot?.querySelector<HTMLInputElement>("input[data-control]") ?? null;
  }

  /** @ignore */
  protected override validityAnchor() {
    return this.renderRoot?.querySelector<HTMLElement>("input[data-range]") ?? null;
  }

  protected override willUpdate(changed: PropertyValues) {
    super.willUpdate(changed);
    const normalized = this.normalized().join("/");
    if (normalized !== this.value) this.value = normalized;
  }

  /** @ignore */
  protected override syncControlValue() {
    const [lower, upper] = this.normalized();
    const hidden = this.control;
    if (hidden) hidden.value = `${lower}/${upper}`;
    const inputs = this.rangeInputs();
    if (inputs[0] && inputs[0].value !== String(lower)) inputs[0].value = String(lower);
    if (inputs[1] && inputs[1].value !== String(upper)) inputs[1].value = String(upper);
  }

  /** @ignore */
  protected override readControlValue() {}

  /** @ignore */
  private normalized(): [number, number] {
    const [left, right] = String(this.value).split("/").map(Number);
    const fallbackLower = this.min + (this.max - this.min) * 0.25;
    const fallbackUpper = this.min + (this.max - this.min) * 0.75;
    const first = Number.isFinite(left) ? left : fallbackLower;
    const second = Number.isFinite(right) ? right : fallbackUpper;
    const lower = Math.min(this.max, Math.max(this.min, Math.min(first, second)));
    const upper = Math.min(this.max, Math.max(this.min, Math.max(first, second)));
    return [lower, upper];
  }

  /** @ignore */
  private rangeInputs() {
    return [...(this.renderRoot?.querySelectorAll<HTMLInputElement>("input[data-range]") ?? [])];
  }

  /** @ignore */
  private percent(value: number) {
    return this.max > this.min ? ((value - this.min) / (this.max - this.min)) * 100 : 0;
  }

  /** @ignore */
  private setValue(endpoint: "lower" | "upper", raw: string) {
    const [lower, upper] = this.normalized();
    const number = Number(raw);
    const nextLower = endpoint === "lower" ? Math.min(number, upper) : lower;
    const nextUpper = endpoint === "upper" ? Math.max(number, lower) : upper;
    this.value = `${nextLower}/${nextUpper}`;
    this.syncControlValue();
    this.syncFormState();
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
  }

  /** @ignore */
  private commitChange() {
    this.syncFormState();
    this.dispatchEvent(new Event("change", { bubbles: true }));
  }

  /** @ignore */
  private onFocusOut(event: FocusEvent) {
    const next = event.relatedTarget as Node | null;
    if (next && this.renderRoot.contains(next)) return;
    this.handleBlur();
  }

  protected renderControl() {
    const [lower, upper] = this.normalized();
    return html`
      <div class="phsa-root ds:flex ds:w-full ds:flex-col ds:gap-2 ${this.hostClass}" @focusout=${this.onFocusOut}>
        <div
          part="track"
          class="range-wrap"
          style="--phsa-range-lower:${this.percent(lower)}%;--phsa-range-upper:${this.percent(upper)}%"
        >
          <span class="track"></span>
          <span part="range" class="selected"></span>
          <input
            data-range="lower"
            part="lower"
            type="range"
            min=${this.min}
            max=${this.max}
            step=${this.step}
            .value=${String(lower)}
            aria-label=${this.fieldLabel ? `${this.fieldLabel}: ${this.lowerLabel}` : this.lowerLabel}
            aria-describedby=${ifDefined(this.describedBy)}
            aria-invalid=${ifDefined(this.showInvalid ? "true" : undefined)}
            ?disabled=${this.isDisabled}
            @input=${(event: Event) => this.setValue("lower", (event.target as HTMLInputElement).value)}
            @change=${this.commitChange}
          />
          <input
            data-range="upper"
            part="upper"
            type="range"
            min=${this.min}
            max=${this.max}
            step=${this.step}
            .value=${String(upper)}
            aria-label=${this.fieldLabel ? `${this.fieldLabel}: ${this.upperLabel}` : this.upperLabel}
            aria-describedby=${ifDefined(this.describedBy)}
            aria-invalid=${ifDefined(this.showInvalid ? "true" : undefined)}
            ?disabled=${this.isDisabled}
            @input=${(event: Event) => this.setValue("upper", (event.target as HTMLInputElement).value)}
            @change=${this.commitChange}
          />
        </div>
        ${this.showValues
          ? html`
              <div part="values" class="ds:flex ds:justify-between ds:text-sm ds:tabular-nums ds:text-muted-foreground">
                <output>${lower}</output><output>${upper}</output>
              </div>
            `
          : ""}
        <input data-control class="ds:sr-only" tabindex="-1" aria-hidden="true" ?disabled=${this.isDisabled} />
      </div>
    `;
  }
}
