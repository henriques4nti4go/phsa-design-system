import { PhsaDatePicker } from "./date-picker";

export * from "./date-picker";

if (typeof customElements !== "undefined" && !customElements.get("phsa-date-picker")) {
  customElements.define("phsa-date-picker", PhsaDatePicker);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-date-picker": PhsaDatePicker;
  }
}
