import { PhsaTimePicker } from "./time-picker";

export * from "./time-picker";

if (typeof customElements !== "undefined" && !customElements.get("phsa-time-picker")) {
  customElements.define("phsa-time-picker", PhsaTimePicker);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-time-picker": PhsaTimePicker;
  }
}
