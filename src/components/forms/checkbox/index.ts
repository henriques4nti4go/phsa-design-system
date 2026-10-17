import { PhsaCheckbox } from "./checkbox";

export * from "./checkbox";

if (typeof customElements !== "undefined" && !customElements.get("phsa-checkbox")) {
  customElements.define("phsa-checkbox", PhsaCheckbox);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-checkbox": PhsaCheckbox;
  }
}
