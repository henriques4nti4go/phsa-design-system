import { PhsaEmptyState } from "./empty-state";

export * from "./empty-state";

if (typeof customElements !== "undefined" && !customElements.get("phsa-empty-state")) {
  customElements.define("phsa-empty-state", PhsaEmptyState);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-empty-state": PhsaEmptyState;
  }
}
