import { PhsaPatternInput } from "./pattern-input";

export * from "./pattern-input";

if (typeof customElements !== "undefined" && !customElements.get("phsa-pattern-input")) {
  customElements.define("phsa-pattern-input", PhsaPatternInput);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-pattern-input": PhsaPatternInput;
  }
}
