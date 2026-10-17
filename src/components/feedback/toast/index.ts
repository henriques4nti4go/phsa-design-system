import { PhsaToaster } from "./toast";

export * from "./toast";

if (typeof customElements !== "undefined" && !customElements.get("phsa-toaster")) {
  customElements.define("phsa-toaster", PhsaToaster);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-toaster": PhsaToaster;
  }
}
