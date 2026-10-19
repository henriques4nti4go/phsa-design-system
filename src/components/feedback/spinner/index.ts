import { PhsaSpinner } from "./spinner";

export * from "./spinner";

if (typeof customElements !== "undefined" && !customElements.get("phsa-spinner")) {
  customElements.define("phsa-spinner", PhsaSpinner);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-spinner": PhsaSpinner;
  }
}
