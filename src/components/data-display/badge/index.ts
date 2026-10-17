import { PhsaBadge } from "./badge";

export * from "./badge";

if (typeof customElements !== "undefined" && !customElements.get("phsa-badge")) {
  customElements.define("phsa-badge", PhsaBadge);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-badge": PhsaBadge;
  }
}
