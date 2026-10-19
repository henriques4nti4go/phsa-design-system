import { PhsaStep } from "./step";
import { PhsaStepper } from "./stepper";

export * from "./step";
export * from "./stepper";

if (typeof customElements !== "undefined") {
  if (!customElements.get("phsa-stepper")) customElements.define("phsa-stepper", PhsaStepper);
  if (!customElements.get("phsa-step")) customElements.define("phsa-step", PhsaStep);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-stepper": PhsaStepper;
    "phsa-step": PhsaStep;
  }
}
