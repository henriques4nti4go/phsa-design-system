import { PhsaNumericInput } from "./numeric-input";

export * from "./numeric-input";

if (typeof customElements !== "undefined" && !customElements.get("phsa-numeric-input")) {
  customElements.define("phsa-numeric-input", PhsaNumericInput);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-numeric-input": PhsaNumericInput;
  }
}
