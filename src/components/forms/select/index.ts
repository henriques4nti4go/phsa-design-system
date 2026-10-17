import { PhsaSelect } from "./select";

export * from "./select";

if (typeof customElements !== "undefined" && !customElements.get("phsa-select")) {
  customElements.define("phsa-select", PhsaSelect);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-select": PhsaSelect;
  }
}
