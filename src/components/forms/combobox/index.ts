import { PhsaCombobox } from "./combobox";

export * from "./combobox";

if (typeof customElements !== "undefined" && !customElements.get("phsa-combobox")) {
  customElements.define("phsa-combobox", PhsaCombobox);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-combobox": PhsaCombobox;
  }
}
