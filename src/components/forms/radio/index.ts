import { PhsaRadio } from "./radio";

export * from "./radio";

if (typeof customElements !== "undefined" && !customElements.get("phsa-radio")) {
  customElements.define("phsa-radio", PhsaRadio);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-radio": PhsaRadio;
  }
}
