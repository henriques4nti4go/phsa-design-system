import { PhsaSkeleton } from "./skeleton";

export * from "./skeleton";

if (typeof customElements !== "undefined" && !customElements.get("phsa-skeleton")) {
  customElements.define("phsa-skeleton", PhsaSkeleton);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-skeleton": PhsaSkeleton;
  }
}
