import { PhsaTooltip } from "./tooltip";

export * from "./tooltip";

if (typeof customElements !== "undefined" && !customElements.get("phsa-tooltip")) {
  customElements.define("phsa-tooltip", PhsaTooltip);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-tooltip": PhsaTooltip;
  }
}
