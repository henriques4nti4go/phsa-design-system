import { PhsaAlert } from "./alert";

export * from "./alert";

if (typeof customElements !== "undefined" && !customElements.get("phsa-alert")) {
  customElements.define("phsa-alert", PhsaAlert);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-alert": PhsaAlert;
  }
}
