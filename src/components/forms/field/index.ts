import { PhsaField } from "./field";

export * from "./field";

if (typeof customElements !== "undefined" && !customElements.get("phsa-field")) {
  customElements.define("phsa-field", PhsaField);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-field": PhsaField;
  }
}
