import { PhsaInput } from "./input";

export * from "./input";

if (typeof customElements !== "undefined" && !customElements.get("phsa-input")) {
  customElements.define("phsa-input", PhsaInput);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-input": PhsaInput;
  }
}
