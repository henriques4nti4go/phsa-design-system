import { PhsaSwitch } from "./switch";

export * from "./switch";

if (typeof customElements !== "undefined" && !customElements.get("phsa-switch")) {
  customElements.define("phsa-switch", PhsaSwitch);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-switch": PhsaSwitch;
  }
}
