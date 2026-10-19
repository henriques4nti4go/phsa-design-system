import { PhsaScrollArea } from "./scroll-area";

export * from "./scroll-area";

if (typeof customElements !== "undefined" && !customElements.get("phsa-scroll-area")) {
  customElements.define("phsa-scroll-area", PhsaScrollArea);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-scroll-area": PhsaScrollArea;
  }
}
