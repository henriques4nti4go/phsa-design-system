import { PhsaPagination } from "./pagination";

export * from "./pagination";

if (typeof customElements !== "undefined" && !customElements.get("phsa-pagination")) {
  customElements.define("phsa-pagination", PhsaPagination);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-pagination": PhsaPagination;
  }
}
