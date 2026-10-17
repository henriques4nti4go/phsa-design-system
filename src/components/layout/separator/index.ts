import { PhsaSeparator } from "./separator";

export * from "./separator";

if (typeof customElements !== "undefined" && !customElements.get("phsa-separator")) {
  customElements.define("phsa-separator", PhsaSeparator);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-separator": PhsaSeparator;
  }
}
