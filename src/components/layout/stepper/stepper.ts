import { html, unsafeCSS, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import type { PhsaStep } from "./step";
import styles from "./stepper.css?inline";

export type StepperOrientation = "horizontal" | "vertical";
export const STEPPER_ORIENTATIONS: StepperOrientation[] = ["horizontal", "vertical"];

/**
 * Sequência de etapas. Sem `value`, escolhe a primeira habilitada.
 *
 * @tag phsa-stepper
 * @slot - Itens `phsa-step`.
 * @csspart list - A faixa de etapas.
 * @fires phsa-change - Ao mudar a etapa. `detail.value` é o valor dela. Não dispara na escolha automática inicial.
 */
export class PhsaStepper extends PhsaElement {
  static styles = unsafeCSS(styles);

  @property() value = "";
  @property() orientation: StepperOrientation = "horizontal";
  /** @ignore */
  private readonly observer = new MutationObserver(() => this.onSlotChange());

  constructor() {
    super();
    this.addEventListener("phsa-step-select", ((event: CustomEvent<{ value: string }>) => {
      const step = event.target as Element;
      if (step.localName !== "phsa-step" || step.closest("phsa-stepper") !== this) return;
      event.stopPropagation();
      if (event.detail?.value && event.detail.value !== this.value) this.value = event.detail.value;
    }) as EventListener);
  }

  override connectedCallback() {
    super.connectedCallback();
    this.observer.observe(this, { subtree: true, attributes: true, attributeFilter: ["value", "disabled", "heading"] });
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.observer.disconnect();
  }

  protected override willUpdate(changed: PropertyValues) {
    super.willUpdate(changed);
    this.pickFirst();
  }

  protected override updated(changed: PropertyValues) {
    super.updated(changed);
    const previous = changed.get("value");
    if (typeof previous === "string" && previous !== "") {
      this.dispatchEvent(new CustomEvent("phsa-change", { bubbles: true, composed: true, detail: { value: this.value } }));
    }
    this.sync();
  }

  /** @ignore */
  private steps() {
    return [...this.querySelectorAll<PhsaStep>("phsa-step")].filter((step) => step.closest("phsa-stepper") === this);
  }

  /** @ignore */
  private pickFirst() {
    if (this.value) return;
    const first = this.steps().find((step) => !step.disabled);
    if (first) this.value = first.value;
  }

  /** @ignore */
  private onSlotChange() {
    this.pickFirst();
    this.sync();
  }

  /** @ignore */
  private sync() {
    const steps = this.steps();
    const current = steps.findIndex((step) => step.value === this.value);
    steps.forEach((step, index) => {
      step.index = index + 1;
      step.orientation = this.orientation;
      step.current = current >= 0 && index === current;
      step.completed = current >= 0 && index < current;
    });
  }

  /** @ignore */
  private onKey(event: KeyboardEvent) {
    const steps = this.steps().filter((step) => !step.disabled);
    if (!steps.length) return;
    const found = steps.findIndex((step) => event.composedPath().includes(step));
    if (found < 0) return;
    const vertical = this.orientation === "vertical";
    const forward = vertical ? "ArrowDown" : "ArrowRight";
    const back = vertical ? "ArrowUp" : "ArrowLeft";
    const go = (to: number) => {
      event.preventDefault();
      const step = steps[(to + steps.length) % steps.length];
      this.value = step.value;
      step.focus();
    };
    if (event.key === forward) go(found + 1);
    else if (event.key === back) go(found - 1);
    else if (event.key === "Home") go(0);
    else if (event.key === "End") go(steps.length - 1);
  }

  render() {
    const vertical = this.orientation === "vertical";
    return html`
      <div
        part="list"
        class="phsa-root ${vertical ? "ds:flex ds:flex-col" : "ds:flex ds:items-start"} ${this.hostClass}"
        @keydown=${this.onKey}
      >
        <slot @slotchange=${this.onSlotChange}></slot>
      </div>
    `;
  }
}
