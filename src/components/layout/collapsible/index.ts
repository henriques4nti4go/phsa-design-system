import { PhsaCollapsible } from "./collapsible";

export * from "./collapsible";

if (typeof customElements !== "undefined" && !customElements.get("phsa-collapsible")) {
  customElements.define("phsa-collapsible", PhsaCollapsible);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-collapsible": PhsaCollapsible;
  }
}
